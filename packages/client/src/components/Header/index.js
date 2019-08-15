import React from 'react';
// component
import Nav from 'components/Nav';
import LogInOutButton from './LogInOutButton';
// styles
import { AppBar, AppBarContent, AppBarUtils, AppBarTitle } from './styles';

const Header = () => {
    return (
        <AppBar>
            <Nav />
            <AppBarContent>
                <AppBarTitle>Header</AppBarTitle>
            </AppBarContent>
            <AppBarUtils>
                <LogInOutButton />
            </AppBarUtils>
        </AppBar>
    );
};

export default Header;
