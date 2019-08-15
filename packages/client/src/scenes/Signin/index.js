import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
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
};

const Signin = ({ history }) => {
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER);
    const [isDone, setIsDone] = useState(false);

    const submitForm = async () => {
        await loginUser({
            variables: {
                email: formState['email'].value,
                password: formState['password'].value,
            },
        })
            .then(resp => {
                G.log('resp', resp);
                localStorage.setItem('authToken', resp.data.user.token);
                setIsDone(true);
            })
            .catch(error => {
                G.log('Error: ', error.message);
            });
    };

    const {
        formState,
        isSubmitting,
        handleChange,
        handleSubmit,
    } = useValidation(configs, submitForm);

    useEffect(() => {
        if (isDone) history.replace('/contracts');
    }, [history, isDone]);

    return (
        <div className="wrap">
            <form onSubmit={handleSubmit} noValidate>
                <TextField
                    title="User Email"
                    placeholder="Email address"
                    onChange={handleChange}
                    {...formState['email']}
                />
                <br />
                <TextField
                    type="password"
                    title="Password"
                    placeholder="Password"
                    onChange={handleChange}
                    {...formState['password']}
                />
                <br />
                <ButtonWrap>
                    <Button
                        type="submit"
                        content={`로그인`}
                        primary
                        block
                        loading={loading}
                        disabled={isSubmitting && !error}
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

export default withRouter(Signin);
