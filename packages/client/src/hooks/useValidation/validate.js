import { curry } from 'ramda';
import { trimValue } from './utils';

const validate = (rules, value, values) =>
    rules.reduce(
        ([isSuccess, message], [isValid, errorMessage]) => {
            if (!isSuccess) return [false, message];
            if (
                Object.is(value, undefined) ||
                !isValid(trimValue(value), values)
            )
                return [false, errorMessage];
            return [true, ''];
        },
        [true, ''],
    );

export default curry((validator, name, value, values) => {
    if (!validator[name]) return [true, ''];
    return validate(validator[name], value, values);
});
