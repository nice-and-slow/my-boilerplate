import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'styled-icons/fa-solid';
// apollo
import { useQuery } from '@apollo/react-hooks';
// components
import Button from 'components/Button';
import { PageSpinner } from 'components/Spinner';
// utils
import { isLoggedIn } from 'utils';
import { GET_CONTRACTS_QUERY } from 'queries';
// styles
import {
    Header,
    Title,
    ButtonWrap,
    List,
    ListItem,
    ItemWrap,
    Item,
    SpinnerWrap,
} from './styles';

const Contracts = props => {
    const { loading, error, data } = useQuery(GET_CONTRACTS_QUERY);

    if (loading)
        return (
            <SpinnerWrap>
                <PageSpinner />
            </SpinnerWrap>
        );
    if (error) return <p>Error</p>;

    return (
        <div className="wrap">
            <Header>
                <Title>Contract List</Title>
                {isLoggedIn() ? (
                    <ButtonWrap>
                        <Link to="/new">
                            <Button
                                content={<Plus size="12" />}
                                primary
                                small
                            />
                        </Link>
                    </ButtonWrap>
                ) : null}
            </Header>

            <List>
                {data.contracts.map(({ id, title, description }) => {
                    return (
                        <ListItem key={id}>
                            <ItemWrap>
                                <Item>{title}</Item>
                                <Item>{description}</Item>
                            </ItemWrap>
                        </ListItem>
                    );
                })}
            </List>
        </div>
    );
};

export default Contracts;
