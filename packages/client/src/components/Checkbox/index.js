import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';
// styles
import { CheckboxWrapper, Input, Label, Span, Error } from './styles';

const CheckBox = memo(({ name, label, checked, error, onChange, onBlur }) => {
    // const [isChecked, setIsChecked] = useState(checked);
    const changeValue = e => {
        // setIsChecked(e.target.checked);
        onChange(e);
    };
    const handleBlur = e => {
        onBlur(e);
    };

    return (
        <CheckboxWrapper>
            <Label>
                <Input
                    type="checkbox"
                    name={name}
                    onChange={changeValue}
                    onBlur={handleBlur}
                />
                <Span />
                {label}
            </Label>
            {error && <Error>{error}</Error>}
        </CheckboxWrapper>
    );
});

export default CheckBox;

CheckBox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    error: PropTypes.string,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
};

CheckBox.defaultProps = {
    label: '',
    name: '',
    error: '',
    checked: false,
    onChange: () => {},
    onBlur: () => {},
};
