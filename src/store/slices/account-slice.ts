import { JsonRpcProvider } from '@ethersproject/providers';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { BigNumber, ethers } from 'ethers';
import _ from 'lodash';
import { ModoTokenContract, BNBContract, wModoTokenContract, StakedClamContract } from 'src/abi';
import { BondKey, getAddresses, getBond } from 'src/constants';
import { contractForBond, contractForReserve, setAll } from 'src/helpers';

interface IState {
  [key: string]: any;
}

const initialState: IState = {
  loading: true,
};

interface IAccountProps {
  address: string;
  networkID: number;
  provider: JsonRpcProvider;
}

interface IUserBondDetails {
  bond?: string;
  allowance?: number;
  balance?: number;
  rawBalance?: string;
  interestDue?: number;
  bondMaturationTime?: number;
  pendingPayout?: number;
}

export interface IAccount {
  balances: {
    bnb: string;
    sClam: string;
    njord: string;
    fjord: string;
  };
  staking: {
    njordStake: number;
    sClamUnstake: number;
    warmup: string;
    canClaimWarmup: boolean;
  };
  wrapping: {
    njordWrap: number;
  };
}

export const getBalances = createAsyncThunk(
  'account/getBalances',
  async ({ address, networkID, provider }: IAccountProps) => {
    const addresses = getAddresses(networkID);
    const sClamContract = new ethers.Contract(addresses.sNJORD_ADDRESS, StakedClamContract, provider);
    const sClamBalance = await sClamContract.balanceOf(address);
    const njordContract = new ethers.Contract(addresses.NJORD_ADDRESS, ModoTokenContract, provider);
    const njordBalance = await njordContract.balanceOf(address);
    const fjordContract = new ethers.Contract(addresses.FJORD_ADDRESS, wModoTokenContract, provider);
    const fjordBalance = await fjordContract.balanceOf(address);
    return {
      balances: {
        sClam: ethers.utils.formatUnits(sClamBalance, 5),
        njord: ethers.utils.formatUnits(njordBalance, 5),
        fjord: ethers.utils.formatEther(fjordBalance),
      },
    };
  },
);

export const loadAccountDetails = createAsyncThunk(
  'account/loadAccountDetails',
  async ({ networkID, provider, address }: IAccountProps): Promise<IAccount> => {
    const addresses = getAddresses(networkID);

    const bnbContract = new ethers.Contract(addresses.BNB_ADDRESS, BNBContract, provider);
    const njordContract = new ethers.Contract(addresses.NJORD_ADDRESS, ModoTokenContract, provider);
    const sClamContract = new ethers.Contract(addresses.sNJORD_ADDRESS, StakedClamContract, provider);
    const fjordContract = new ethers.Contract(addresses.FJORD_ADDRESS, wModoTokenContract, provider);

    const [bnbBalance, njordBalance, sClamBalance, fjordBalance, stakeAllowance, unstakeAllowance, wrapAllowance] =
      await Promise.all([
        bnbContract.balanceOf(address),
        njordContract.balanceOf(address),
        sClamContract.balanceOf(address),
        fjordContract.balanceOf(address),
        njordContract.allowance(address, addresses.STAKING_HELPER_ADDRESS),
        sClamContract.allowance(address, addresses.STAKING_ADDRESS),
        njordContract.allowance(address, addresses.FJORD_ADDRESS),
      ]);

    return {
      balances: {
        sClam: ethers.utils.formatUnits(sClamBalance, 5),
        njord: ethers.utils.formatUnits(njordBalance, 5),
        bnb: ethers.utils.formatEther(bnbBalance),
        fjord: ethers.utils.formatEther(fjordBalance),
      },
      staking: {
        njordStake: +stakeAllowance,
        sClamUnstake: +unstakeAllowance,
        warmup: '0',
        canClaimWarmup: false,
      },
      wrapping: {
        njordWrap: +wrapAllowance,
      },
    };
  },
);

interface CalculateUserBondDetailsActionPayload {
  address: string;
  bondKey: BondKey;
  networkID: number;
  provider: JsonRpcProvider;
}

export const calculateUserBondDetails = createAsyncThunk(
  'bonding/calculateUserBondDetails',
  async ({
    address,
    bondKey,
    networkID,
    provider,
  }: CalculateUserBondDetailsActionPayload): Promise<IUserBondDetails> => {
    if (!address) return {};

    const addresses = getAddresses(networkID);
    const bond = getBond(bondKey, networkID);
    const bondContract = contractForBond(bondKey, networkID, provider);
    const reserveContract = contractForReserve(bondKey, networkID, provider);
    const sNJORD = new ethers.Contract(addresses.sNJORD_ADDRESS, StakedClamContract, provider);

    let interestDue, pendingPayout, bondMaturationTime;

    const bondDetails = await bondContract.bondInfo(address);
    interestDue = (bond.autostake ? await sNJORD.balanceForGons(bondDetails.gonsPayout) : bondDetails.payout) / 1e5;
    bondMaturationTime = +bondDetails.vesting + +bondDetails.lastTimestamp;
    pendingPayout = await bondContract.pendingPayoutFor(address);

    const allowance = await reserveContract.allowance(address, bond.address);
    const rawBalance = (await reserveContract.balanceOf(address)).toString();
    const balance = ethers.utils.formatEther(rawBalance);

    return {
      bond: bondKey,
      allowance: Number(allowance),
      balance: Number(balance),
      rawBalance,
      interestDue,
      bondMaturationTime,
      pendingPayout: Number(ethers.utils.formatUnits(pendingPayout, 5)),
    };
  },
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    fetchAccountSuccess(state, action) {
      _.merge(state, action.payload);
    },
    wrap(state, action) {
      const { fjord, sClam } = state.balances;
      const newPearlBalance = ethers.utils.formatEther(ethers.utils.parseEther(fjord).add(action.payload.fjord));
      const newsClamBalance = ethers.utils.formatUnits(ethers.utils.parseUnits(sClam, 5).sub(action.payload.sClam), 5);
      _.merge(state, {
        balances: { fjord: newPearlBalance, sClam: newsClamBalance },
      });
    },
    unwrap(state, action) {
      const { fjord, sClam } = state.balances;
      const newPearlBalance = ethers.utils.formatEther(ethers.utils.parseEther(fjord).sub(action.payload.fjord));
      const newsClamBalance = ethers.utils.formatUnits(ethers.utils.parseUnits(sClam, 5).add(action.payload.sClam), 5);
      _.merge(state, {
        balances: { fjord: newPearlBalance, sClam: newsClamBalance },
      });
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAccountDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(loadAccountDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(loadAccountDetails.rejected, (state, { error }) => {
        state.status = 'idle';
        console.log(error);
      })
      .addCase(getBalances.pending, state => {
        state.status = 'loading';
      })
      .addCase(getBalances.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.status = 'idle';
      })
      .addCase(getBalances.rejected, (state, { error }) => {
        state.status = 'idle';
        console.log(error);
      })
      .addCase(calculateUserBondDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(calculateUserBondDetails.fulfilled, (state, action) => {
        //@ts-ignore
        const bond = action.payload.bond!;
        state[bond] = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserBondDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

export default accountSlice.reducer;

export const { fetchAccountSuccess, wrap, unwrap } = accountSlice.actions;

const baseInfo = (state: { account: IAccount }) => state.account;

export const getAccountState = createSelector(baseInfo, account => account);
