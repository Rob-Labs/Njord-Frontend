import { JsonRpcProvider } from '@ethersproject/providers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { BigNumber, ethers } from 'ethers';
import { wModoTokenContract } from 'src/abi';
import { getAddresses } from 'src/constants';
import { fetchAccountSuccess, wrap, unwrap } from './account-slice';
import { clearPendingTxn, fetchPendingTxns, getWrappingTypeText } from './pending-txns-slice';

interface ApproveWrappingProps {
  provider: JsonRpcProvider;
  address: string;
  networkID: number;
}

export const approveWrapping = createAsyncThunk(
  'wrap/approve',
  async ({ provider, address, networkID }: ApproveWrappingProps, { dispatch }) => {
    if (!provider) {
      alert('Please connect your wallet!');
      return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const NJORDContract = new ethers.Contract(addresses.NJORD_ADDRESS, wModoTokenContract, signer);

    let approveTx;
    let approvedPromise: Promise<BigNumber> = Promise.resolve(BigNumber.from(0));
    let allowance: number;

    try {
      approvedPromise = new Promise(resolve => {
        const event = NJORDContract.filters.Approval(address, addresses.FJORD_ADDRESS);
        const action = (owner: string, allowance: BigNumber) => {
          NJORDContract.off(event, action);
          resolve(allowance);
        };
        NJORDContract.on(event, action);
      });
      approveTx = await NJORDContract.approve(addresses.FJORD_ADDRESS, ethers.constants.MaxUint256);

      const text = 'Approve Wrapping';
      const pendingTxnType = 'approve_wrapping';

      dispatch(fetchPendingTxns({ txnHash: approveTx.hash, text, type: pendingTxnType }));
      allowance = +(await approvedPromise);
    } catch (error: any) {
      alert(error.message);
      return;
    } finally {
      if (approveTx) {
        dispatch(clearPendingTxn(approveTx.hash));
      }
    }

    return dispatch(
      fetchAccountSuccess({
        wrapping: {
          sClamWrap: allowance,
        },
      }),
    );
  },
);

interface ChangeWrapProps {
  action: string;
  value: string;
  provider: JsonRpcProvider;
  address: string;
  networkID: number;
}

export const changeWrap = createAsyncThunk(
  'wrap/changeWrap',
  async ({ action, value, provider, address, networkID }: ChangeWrapProps, { dispatch }) => {
    if (!provider) {
      alert('Please connect your wallet!');
      return;
    }
    const addresses = getAddresses(networkID);
    const signer = provider.getSigner();
    const fjordContract = new ethers.Contract(addresses.FJORD_ADDRESS, wModoTokenContract, signer);
    const njordContract = new ethers.Contract(addresses.NJORD_ADDRESS, wModoTokenContract, signer);

    let wrapTx;
    let transferPromise;
    let resolvedAmount, inputValue;

    try {
      if (action === 'wrap') {
        transferPromise = new Promise(resolve => {
          const event = fjordContract.filters.Transfer(addresses.FJORD_ADDRESS, address);
          const action = (from: string, to: string, amount: BigNumber) => {
            fjordContract.off(event, action);
            resolve(amount);
          };
          fjordContract.on(event, action);
        });
        inputValue = ethers.utils.parseUnits(value, 'mwei').div(10);
        console.log(`inputValue : ${inputValue}`)
        wrapTx = await fjordContract.wrap(inputValue);
      } else {
        transferPromise = new Promise(resolve => {
          const event = njordContract.filters.Transfer(addresses.FJORD_ADDRESS, address);
          const action = (from: string, to: string, amount: BigNumber) => {
            njordContract.off(event, action);
            resolve(amount);
          };
          njordContract.on(event, action);
        });
        inputValue = ethers.utils.parseEther(value);
        wrapTx = await fjordContract.unwrap(inputValue);
      }
      const pendingTxnType = action === 'wrap' ? 'wrapping' : 'unwrapping';
      dispatch(fetchPendingTxns({ txnHash: wrapTx.hash, text: getWrappingTypeText(action), type: pendingTxnType }));
      await wrapTx.wait();
      resolvedAmount = await transferPromise;
    } catch (error: any) {
      if (error.code === -32603 && error.message.indexOf('ds-math-sub-underflow') >= 0) {
        alert('You may be trying to wrap more than your balance! Error code: 32603. Message: ds-math-sub-underflow');
      } else {
        alert(error.message);
      }
      return;
    } finally {
      if (wrapTx) {
        dispatch(clearPendingTxn(wrapTx.hash));
      }
    }
    if (action === 'wrap') {
      dispatch(wrap({ fjord: resolvedAmount, njord: inputValue }));
    } else {
      dispatch(unwrap({ fjord: inputValue, njord: resolvedAmount }));
    }
    if (wrapTx) {
      return true;
    }
  },
);
