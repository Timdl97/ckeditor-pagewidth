/* eslint-disable react/display-name */
import React, { useRef } from "react";
import Link from "next/link";
import classnames from "classnames";
import navListStyles from "./NavList.module.scss";

import {
  useMenuState,
  useMenuBarState,
  MenuBar,
  Menu,
  MenuItem,
  MenuButton,
  MenuSeparator,
  MenuBarStateReturn,
  MenuStateReturn,
} from "reakit/Menu";

type NavItem = {
  content: React.ReactNode;
  url: string;
  subItems?: NavItem[];
}

type NavListProps = {
  items: NavItem[];
}

const NavList: React.FC<NavListProps> = ({items}) => {
  const menu = useMenuBarState({
    loop: true
  });

  return (
    <MenuBar
      as="ul"
      aria-label="menu"
      {...menu}
      className={navListStyles.navList}
    >
      <MenuItem {...menu} title="wow" as={NavListMenu} />
      <MenuItem {...menu} title="wow1" as={NavListMenu} />
      <Link href="#test" passHref>
        <MenuItem as="a" {...menu} className={navListStyles.navItem}>
          Inline
        </MenuItem>
      </Link>
      <MenuItem {...menu} title="wow2" as={NavListMenu} />
    </MenuBar>
  );
};

export { NavList };

type NavListMenuProps = (MenuBarStateReturn | MenuStateReturn)  & {
  title: string
}

const NavListMenu = React.forwardRef<any, NavListMenuProps>(({ title, ...props}, ref) => {
  const menu = useMenuState({
    loop: true
  });

  return (
    <>
      <MenuButton ref={ref} {...menu} {...props} className={navListStyles.navItem}>
        {title}
      </MenuButton>
      <Menu {...menu} aria-label="Preferences" orientation="vertical" className={navListStyles.navSubList}>
        <MenuItem {...menu} className={navListStyles.navItem}>Settings</MenuItem>
        <MenuItem {...menu} className={navListStyles.navItem}>Extensions</MenuItem>
        <MenuSeparator {...menu} />
        <MenuItem {...menu} className={navListStyles.navItem}>Keyboard shortcuts</MenuItem>
        <MenuItem {...menu} className={navListStyles.navItem}>Keyboard configuration</MenuItem>
      </Menu>
    </>
  );
});