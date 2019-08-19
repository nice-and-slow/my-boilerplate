import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// apollo
import { useMutation } from '@apollo/react-hooks';
// components
import TextField from 'components/TextField';
import Button from 'components/Button';
import Modal from 'components/Modal';
// queries
import { LOGIN_USER } from 'queries';
// hooks
import useValidation, {
    isRequired,
    isEmail,
    lengthBetween,
} from 'hooks/useValidation';
// styles
import { ButtonWrap } from './styles';

const configs = {
    fields: {
        email: {
            rules: [
                [isRequired, 'email을 입력하세요.'],
                [isEmail, '올바른 email 주소가 아닙니다.'],
            ],
        },
        password: {
            rules: [
                [isRequired, '비밀번호를 입력하세요.'],
                [lengthBetween(8, 35), '8-35 자를 입력하세요.'],
            ],
        },
    },
    showErrors: 'blur',
};

const Signin = ({ history }) => {
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);

    const submitForm = context => {
        loginUser({
            variables: {
                email: context.values['email'],
                password: context.values['password'],
            },
        })
            .then(async resp => {
                G.log('resp', resp);
                await localStorage.setItem('authToken', resp.data.user.token);

                history.replace('/contracts');
            })
            .catch(error => {
                G.log('Error: ', error.message);
            });
    };

    const { isSubmitted, getFieldProps, handleSubmit } = useValidation(
        configs,
        submitForm,
    );

    return (
        <div className="wrap">
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    title="User Email"
                    placeholder="Email address"
                    {...getFieldProps('email')}
                />
                <br />
                <TextField
                    type="password"
                    title="Password"
                    placeholder="Password"
                    {...getFieldProps('password')}
                />
                <br />
                <ButtonWrap>
                    <Button
                        type="submit"
                        content={`로그인`}
                        primary
                        block
                        loading={loading}
                        disabled={isSubmitted && !error}
                    />
                    <div>
                        <Link to="/signup">
                            <Button content={'회원가입'} primary block />
                        </Link>
                    </div>
                </ButtonWrap>
            </form>

            {error && (
                <Modal isVisible={!!error}>
                    <div className="text-center">{error && error.message}</div>
                </Modal>
            )}
        </div>
    );
};

export default Signin;
