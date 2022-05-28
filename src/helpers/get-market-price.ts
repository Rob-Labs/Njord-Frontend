import { BigNumber, ethers } from 'ethers';
import { getAddresses } from '../constants';
import { ModoLPToken } from '../abi';

export async function getMarketPrice(
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider,
): Promise<BigNumber> {
  const address = getAddresses(networkID);
  const pairContract = new ethers.Contract(address.RESERVES.BNB_NJORD, ModoLPToken, provider);
  const reserves = await pairContract.getReserves();
  // const [clam, mai] = BigNumber.from(address.BNB_ADDRESS).gt(address.NJORD_ADDRESS)
  //   ? [reserves[0], reserves[1]]
  //   : [reserves[1], reserves[0]];

  const [njord, bnb] = [reserves[0], reserves[1]];
  const marketPrice = bnb.div(njord);
  // console.log(`njord : ${njord}` );
  // console.log(`bnb : ${bnb}` );
  // console.log(`njord marketPrice : ${marketPrice}`);
  return marketPrice;
}
