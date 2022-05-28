import { SvgIcon } from '@material-ui/core';
import { ReactComponent as NJORD } from '../assets/tokens/NJORD.svg';
import { ReactComponent as StakedClam } from '../assets/tokens/sNJORD.svg';
import { ReactComponent as FRAX } from '../assets/tokens/FRAX.svg';
import { ReactComponent as BNB } from '../assets/tokens/BNB.svg';
import { ReactComponent as WMATIC } from '../assets/tokens/WMATIC.svg';
import { ReactComponent as FJORD } from '../assets/tokens/FJORD.svg';

export function getBNBTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={BNB} viewBox="0 0 32 32" style={style} />;
}

export function getNJORDTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={NJORD} viewBox="0 0 32 32" style={style} />;
}

export function getStakedNJORDTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={StakedClam} viewBox="0 0 32 32" style={style} />;
}

export function getFJORDTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={FJORD} viewBox="0 0 100 100" style={style} />;
}

export function getFRAXTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={FRAX} viewBox="0 0 32 32" style={style} />;
}

export function getWMATICTokenImage(size: number = 32) {
  const style = { height: size, width: size };
  return <SvgIcon component={WMATIC} viewBox="0 0 32 32" style={style} />;
}

export type Token = 'clam' | 'mai' | 'sclam' | 'clam2' | 'sclam2' | 'pearl' | 'frax' | 'wmatic';

export function getTokenImage(name: Token, size: number = 32): JSX.Element {
  if (name === 'mai') return getBNBTokenImage(size);
  if (name === 'clam' || name === 'clam2') return getNJORDTokenImage(size);
  if (name === 'sclam' || name === 'sclam2') return getStakedNJORDTokenImage(size);
  if (name === 'pearl') return getFJORDTokenImage(size);
  if (name === 'frax') return getFRAXTokenImage(size);
  if (name === 'wmatic') return getWMATICTokenImage(size);

  throw Error(`Token image doesn't support: ${name}`);
}

function toUrl(base: string): string {
  const url = window.location.origin;
  return url + '/' + base;
}

export function getTokenUrl(name: Token) {
  if (name === 'clam' || name === 'clam2') {
    const path = require('../assets/tokens/NJORD.svg').default;
    return toUrl(path);
  }

  if (name === 'sclam' || name === 'sclam2') {
    const path = require('../assets/tokens/sNJORD.svg').default;
    return toUrl(path);
  }

  if (name === 'pearl') {
    const path = require('../assets/tokens/FJORD.svg').default;
    return toUrl(path);
  }

  throw Error(`Token url doesn't support: ${name}`);
}
