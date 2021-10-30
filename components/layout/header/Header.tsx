import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Brand } from './Brand';
import headerStyles from './Header.module.scss';
import { useSticky } from '../../../hooks/useSticky';

type HeaderProps = {
  sticky: boolean;
};

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const ref = useRef(null);
  const [isStuck] = useSticky(ref);

  const headerClassName = classNames(
    headerStyles.header, 
    { [headerStyles.stuck]: !props.sticky || isStuck } 
  );

  return (
    <nav ref={ref} className={headerClassName}>
      <div className={headerStyles.headerContainer}>
        <div className={headerStyles.brandSection}>
            <Brand width={180} />
        </div>
        <div className={headerStyles.navSection}>
          <ul className={headerStyles.navList}>
            <li className={headerStyles.navItem}>Info</li>
            <li className={headerStyles.navItem}>Afdelingen</li>
            <li className={headerStyles.navItem}>Inschrijven</li>
            <li className={headerStyles.navItem}>Activiteiten</li>
            <li className={headerStyles.navItem}>Contact</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

Header.displayName = 'Header';
Header.defaultProps = {
  sticky: true,
};

export { Header };
