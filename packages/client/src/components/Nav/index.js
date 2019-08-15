import React, { useState } from 'react';
import { withRouter } from 'react-router';

// styles
import {
    Nav,
    Wrap,
    HamburgerButtonWrap,
    HamburgerSpan,
    Menu,
    MenuItem,
    MenuLink,
    MenuButton,
} from './styles';

const NavComponent = props => {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = path => {
        return () => {
            setIsChecked(false);
            props.history.push(path);
        };
    };

    const changeValue = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Nav role="navigation">
            <Wrap>
                <HamburgerButtonWrap onClick={changeValue}>
                    <HamburgerSpan isOpen={isChecked} />
                    <HamburgerSpan isOpen={isChecked} />
                    <HamburgerSpan isOpen={isChecked} />
                </HamburgerButtonWrap>

                <Menu isOpen={isChecked}>
                    <MenuItem>
                        <MenuLink>
                            <MenuButton onClick={handleClick('/contracts')}>
                                Contracts
                            </MenuButton>
                        </MenuLink>
                    </MenuItem>
                    <MenuItem>
                        <MenuLink>
                            <MenuButton onClick={handleClick('/new')}>
                                New
                            </MenuButton>
                        </MenuLink>
                    </MenuItem>
                </Menu>
            </Wrap>
        </Nav>
    );
};

export default withRouter(NavComponent);
