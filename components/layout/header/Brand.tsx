import React from 'react';
import Image from 'next/image';

import Logo from '../../../public/logo.jpg';
import brandStyles from './Brand.module.scss';

const ratio = Logo.width / Logo.height;
const borderRadiusRatio = 0.1;

type BrandProps = { height: number } | { width: number };

const Brand: React.FC<BrandProps> = (props) => {
  const calculatedWidth = 'width' in props ? props.width : props.height / ratio;
  const calculatedHeight = 'height' in props ? props.height : props.width / ratio;
  const borderRadius = Math.ceil(calculatedWidth * borderRadiusRatio);

  return (
    <div className={brandStyles.brand} style={{ height: calculatedHeight, width: calculatedWidth, borderRadius: `${borderRadius}px` }}>
      <Image
        src={Logo}
        alt="Muzass logo"
        layout="intrinsic"
        width={calculatedWidth}
        height={calculatedHeight}
        className="border-green-600 rounded-md"
      />
    </div>
  );
};

export { Brand };