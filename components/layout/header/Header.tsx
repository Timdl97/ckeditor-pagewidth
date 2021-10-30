import React from 'react'
import headerStyles from './Header.module.scss'

type HeaderProps = {
    sticky: boolean
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {

    return <nav className={headerStyles.header}>

    </nav>;
}

Header.displayName = 'Header';
Header.defaultProps = {
    sticky: true
}

export { Header };