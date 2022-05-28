import { ethers } from 'ethers';
import { BondKey, getBond } from 'src/constants';
import { ModoLPToken } from '../abi';

export const contractForReserve = (
  bondKey: BondKey,
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider,
) => {
  const { type, reserve } = getBond(bondKey, networkID);
  return new ethers.Contract(reserve, ModoLPToken, provider);
};
