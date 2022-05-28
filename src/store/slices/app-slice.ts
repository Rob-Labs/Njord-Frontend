import { JsonRpcProvider } from '@ethersproject/providers';
import { formatUnits } from '@ethersproject/units';
import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { ModoTokenContract } from '../../abi';
import { getAddresses, INITIAL_TOKEN_SUPPLY } from '../../constants';
import { getMarketPrice, getBnbPrice, getTokenPrice, setAll } from '../../helpers';

const initialState = {
  loading: true,
  marketPrice: 0,
  FJORDPrice: 0,
  marketCap: 0,
  circSupply: 0,
  totalSupply: 0,
  stakingRatio: 0,
  currentIndex: '',
  currentBlock: 0,
  currentBlockTime: 0,
  fiveDayRate: 0,
  stakingAPY: 0,
  stakingTVL: 0,
  stakingRebase: 0,
  networkID: 0,
  nextRebase: 0,
  currentEpoch: 0,
  liquidityValue: 0,
  riskFreeFundValue: 0,
  treasuryValue: 0,
  SupplyControlValue: 0,
  SupplyControl: 0,
  lastTimeRebase: 0,
};

export interface IApp {
  loading: boolean;
  marketPrice: number;
  FJORDPrice: number;
  FJORDTVL: number;
  marketCap: number;
  circSupply: number;
  totalSupply: number;
  stakingRatio: number;
  currentIndex: string;
  currentBlock: number;
  currentBlockTime: number;
  fiveDayRate: number;
  stakingAPY: number;
  stakingTVL: number;
  stakingRebase: number;
  networkID: number;
  nextRebase: number;
  currentEpoch: number;
  liquidityValue: number;
  riskFreeFundValue: number;
  treasuryValue: number;
  SupplyControlValue: number;
  SupplyControl: number;
  lastTimeRebase: number;
}

interface ILoadAppDetails {
  networkID: number;
  provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
  'app/loadAppDetails',
  //@ts-ignore
  async ({ networkID, provider }: ILoadAppDetails) => {
    const addresses = getAddresses(networkID);

    const modoContract = new ethers.Contract(addresses.NJORD_ADDRESS, ModoTokenContract, provider);
    const currentBlock = await provider.getBlockNumber();
    const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;

    const [
      liquidityBalance,
      treasuryBalance,
      treasuryBNBBalance,
      rfvBalance,
      rfvBNBBalance,
      wModoBalance,
      circSupply,
      totalSupply,
      epoch,
      initRebaseStartTime,
      isOwnerRebaseEnabled,
      ownerRebaseRate,
      currentIndex,
      rawMarketPrice,
      bnbPrice,
    ] = await Promise.all([
      (await modoContract.balanceOf(addresses.RESERVES.BNB_NJORD)) / 1e5,
      (await modoContract.balanceOf(addresses.NJORD_TREASURY_FUND)) / 1e5,
      await provider.getBalance(addresses.NJORD_TREASURY_FUND),
      (await modoContract.balanceOf(addresses.NJORD_RISK_FREE_FUND)) / 1e5,
      await provider.getBalance(addresses.NJORD_RISK_FREE_FUND),
      (await modoContract.balanceOf(addresses.FJORD_ADDRESS)) / 1e5,
      (await modoContract.getCirculatingSupply()) / 1e5,
      (await modoContract.totalSupply()) / 1e5,
      modoContract._lastRebasedTime(),
      modoContract._initRebaseStartTime(),
      modoContract.isOwnerRebaseEnabled(),
      modoContract.ownerRebaseRate(),
      formatUnits(await modoContract.index(), 5),
      getMarketPrice(networkID, provider),
      getBnbPrice(networkID, provider),
    ]);
    const stakingReward = (totalSupply - INITIAL_TOKEN_SUPPLY) / 1e5;
    const deltaTimeFromInit = currentBlockTime - initRebaseStartTime;
    let rebaseRates = 0;

    console.log(`BNB Price : ${bnbPrice}`);
    console.log(`NJORD Price : ${rawMarketPrice}`);
    console.log(`deltaTimeFromInit : ${deltaTimeFromInit}`);

    if (deltaTimeFromInit >= 8 * 365 * 86400) {
      rebaseRates = 8;
    } else if (deltaTimeFromInit >= 5 * 365 * 86400) {
      rebaseRates = 33;
    } else if (deltaTimeFromInit >= 3 * 365 * 86400) {
      rebaseRates = 62;
    } else if (deltaTimeFromInit >= 2 * 365 * 86400) {
      rebaseRates = 125;
    } else if (deltaTimeFromInit >= 365 * 86400) {
      rebaseRates = 224;
    } else {
      rebaseRates = 2000;
    }

    if (isOwnerRebaseEnabled) {
      rebaseRates = ownerRebaseRate;
    }

    const stakingRebase = rebaseRates / 1e7;
    const fiveDayRate = Math.pow(1 + stakingRebase, 5 * 96) - 1;
    const stakingAPY = Math.pow(1 + stakingRebase, 365 * 96) - 1;
    const lastTimeRebase = epoch.toNumber();
    let rebaseRate = 900;
    let timeDiff = currentBlockTime - epoch;
    if (timeDiff > rebaseRate) {
      rebaseRate = timeDiff + rebaseRate - (timeDiff % rebaseRate);
    }

    const nextRebase = epoch.toNumber() + rebaseRate;

    const marketPrice = Number(((rawMarketPrice.toNumber() / 1e13) * bnbPrice.toNumber()).toFixed(2));
    console.log(`marketPrice : ${marketPrice}`);
    const stakingTVL = circSupply * marketPrice;
    const marketCap = circSupply * marketPrice;
    const stakingRatio = circSupply / circSupply;
    const FJORDPrice = (marketPrice * Number(currentIndex)).toFixed(2);
    const liquidityValue = (marketPrice * liquidityBalance * 2).toFixed(2);

    const treasuryBNBValue = Number(bnbPrice) * Number(ethers.utils.formatEther(treasuryBNBBalance));
    const riskFreeFundBNBValue = Number(bnbPrice) * Number(ethers.utils.formatEther(rfvBNBBalance));
    const treasuryValue = (marketPrice * treasuryBalance + treasuryBNBValue).toFixed(2);
    const riskFreeFundValue = (marketPrice * rfvBalance + riskFreeFundBNBValue).toFixed(2);

    const SupplyControl = totalSupply - circSupply;
    const SupplyControlValue = (marketPrice * SupplyControl).toFixed(2);
    const FJORDTVL = (marketPrice * wModoBalance).toFixed(2);

    return {
      currentIndex,
      circSupply,
      totalSupply,
      currentBlock,
      fiveDayRate,
      stakingAPY,
      stakingRebase,
      stakingRatio,
      marketPrice,
      FJORDPrice,
      marketCap,
      currentBlockTime,
      nextRebase,
      stakingTVL,
      liquidityValue,
      treasuryValue,
      riskFreeFundValue,
      SupplyControl,
      SupplyControlValue,
      FJORDTVL,
      currentEpoch: epoch.toNumber(),
      lastTimeRebase,
    };
  },
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

const baseInfo = (state: { app: IApp }) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
