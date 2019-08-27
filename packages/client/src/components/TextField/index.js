import React, { memo, useReducer } from 'react';
import PropTypes from 'prop-types';
// styles
import {
    TextFieldWrap,
    TextFieldLabel,
    TextFieldInput,
    TextFieldFloating,
    TextFieldError,
} from './styles';
// constants
const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';

function reducer(state, { type, value }) {
    switch (type) {
        case UPDATE_INPUT_VALUE:
            return { ...state, inputValue: value };
        default:
            return state;
    }
}

const TextField = memo(
    ({
        title,
        name,
        type,
        placeholder,
        disabled,
        autoComplete,
        onChange,
        onBlur,
        required,
        error,
    }) => {
        const [state, dispatch] = useReducer(reducer, {
            inputValue: '',
        });

        const handleChange = e => {
            e.persist();
            const { value } = e.target;
            dispatch({ type: UPDATE_INPUT_VALUE, value });
            e.preventDefault();
            onChange(e);
        };

        const handleBlur = e => {
            onBlur(e);
        };

        return (
            <TextFieldWrap>
                <TextFieldLabel>
                    <TextFieldFloating isActive={!!state.inputValue}>
                        {title || name}
                    </TextFieldFloating>
                    <TextFieldInput
                        id={name}
                        name={name}
                        type={type}
                        placeholder={placeholder}
                        disabled={disabled}
                        required={required}
                        autoComplete={autoComplete}
                        value={state.inputValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isLabelActive={!!state.inputValue}
                    />
                </TextFieldLabel>
                <TextFieldError>{error}</TextFieldError>
            </TextFieldWrap>
        );
    },
    (prevProps, newProps) => {
        return (
            prevProps.error === newProps.error &&
            prevProps.disabled === newProps.disabled &&
            prevProps.value === newProps.value
        );
    },
);

export default TextField;

TextField.prototype = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    required: PropTypes.bool,
    autoComplete: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

TextField.defaultProps = {
    title: '',
    type: 'text',
    placeholder: '',
    error: '',
    disabled: false,
    required: false,
    autoComplete: 'on',
    value: '',
    onChange: () => {},
    onBlur: () => {},
};
