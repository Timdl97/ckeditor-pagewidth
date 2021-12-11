import React, { useRef } from 'react';
import classNames from 'classnames';

import { Brand } from './Brand';
import headerStyles from './Header.module.scss';
import { useSticky } from '../../../hooks/useSticky';
import { NavList } from './NavList';

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
    <header ref={ref} className={headerClassName}>
      <div className={headerStyles.headerContainer}>
        <div className={headerStyles.brandSection}>
            <Brand width={180} />
        </div>
        <div className={headerStyles.navSection}>
          <NavList items={[
            {
              key: 'overons',
              content: 'Over ons',
              url: '#overons',
              subItems: [
                {
                  key: 'overons-missie',
                  content: 'Onze missie',
                  url: '#missie'
                },
                {
                  key: 'overons-visie',
                  content: 'Onze visie',
                  url: '#visie'
                },
                {
                  key: 'overons-teams',
                  content: 'Onze teams',
                  url: '#teams'
                }
              ]
            },
            {
              key: 'activiteiten',
              content: 'Activititen',
              url: '#overons',
              subItems: [
                {
                  key: 'activiteiten-schip',
                  content: 'JMA Schiplaken',
                  url: '#jma-schiplaken'
                },
                {
                  key: 'activiteiten-kont',
                  content: 'Kontich',
                  url: '#kontich',
                  subItems: [
                    {
                      key: 'activiteiten-kont-ina',
                      content: 'Inclusief muziekatelier',
                      url: '#imakontich'
                    },
                    {
                      key: 'activiteiten-kont-vak',
                      content: 'Vakantiewerking',
                      url: '#vakkont'
                    },
                  ]
                },
                
              ]
            },
            {
              key: 'contact',
              content: 'Contacteer ons',
              url: '#contact'
            },
            
          ]}></NavList>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
Header.defaultProps = {
  sticky: true,
};

export { Header };
