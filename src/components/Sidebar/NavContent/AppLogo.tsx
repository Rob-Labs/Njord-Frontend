import { SVGProps } from 'react';

export default function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={100} height={100} viewBox="0 0 102 102" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle fillRule="evenodd" clipRule="evenodd" cx="51" cy="51" r="51" fill="#FEFEFE" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 48c2,-18 17,-33 36,-33 19,0 35,15 36,34l7 19c2,-5 3,-11 3,-17 0,-25 -20,-46 -46,-46 -25,0 -46,21 -46,46 0,6 1,11 3,17l7 -20z"
        fill="#FFB91D"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M51 87c-11,0 -20,-5 -27,-12l10 -27 8 21c1,4 5,6 9,6 4,0 8,-2 10,-6l7 -21 10 27c-6,7 -16,12 -27,12zm27 -51c-2,-4 -6,-6 -10,-6l0 0c-4,0 -8,2 -9,6l-8 21 -2 6 1 -9 -7 -18c-1,-4 -5,-6 -9,-6l0 0c-4,0 -8,2 -9,6l-14 37c0,1 0,2 1,2 8,13 22,22 39,22 17,0 31,-9 40,-22 0,0 0,-1 1,-2l-14 -37z"
        fill="#0A0E23"
      />
    </svg>
  );
}
