export const TOKEN_DECIMALS = 5;

export enum Networks {
  // BSC = 56,
  TBSC = 97,
}

export const RPCURL = {
  [Networks.TBSC]: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  // [Networks.BSC]: 'https://bsc-dataseed1.defibit.io',
};

export const DEFAULT_NETWORK = Networks.TBSC;
// export const DEFAULT_NETWORK = Networks.BSC;
// export const DEFAULT_NETWORK = Networks.POLYGON_MUMBAI;
// export const DEFAULT_NETWORK = Networks.HARDHAT;
