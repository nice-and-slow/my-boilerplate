/* @flow */
type InputStateType = {
    name: string,
    value: any,
    error: string,
};

type InputConfigType = {
    defalut?: ?any,
    rules?: ?Array<func, string>,
};

type ConfigsType = {
    [name: string]: InputConfigType,
};

type FormStateType = {
    [name: string]: InputStateType,
};

type RulesType = {
    [name: string]: Array<func, string>,
};

type ErrorResultType = {
    [name: string]: string,
};

export const trimValue = v => (typeof v === 'string' ? v.trim() : v);

export const createInputState = (
    name: string,
    value: string | number | boolean,
    error: string,
): InputStateType => ({
    name,
    value,
    error,
});

export const initializeFormState = (
    configsObj: ConfigsType,
): Array<FormStateType, RulesType> => {
    return Object.keys(configsObj).reduce(
        ([formState, validator], key) => {
            const rules = configsObj[key].rules;

            formState[key] = createInputState(
                key,
                configsObj[key].default != null ? configsObj[key].default : '',
                '',
            );

            if (rules && rules.length) {
                validator[key] = configsObj[key].rules;
            }

            return [formState, validator];
        },
        [{}, {}],
    );
};

export const trimFormValues = (values: FormStateType): void | FormStateType => {
    const [emptyCount, trimmed] = Object.keys(values).reduce(
        ([emptyCount, formState], key) => {
            formState[key] = trimValue(values[key].value);
            emptyCount += !formState[key] ? 1 : 0;
            return [emptyCount, formState];
        },
        [0, {}],
    );

    const isPristine = Object.keys(values).length === emptyCount;

    return isPristine ? null : trimmed;
};

export const detectFormErrors = (
    validator: RulesType,
    formState: FormStateType,
    validateFunc: any,
): ErrorResultType => {
    return Object.keys(validator).reduce((acc, key) => {
        const [ok, message] = validateFunc(
            key,
            formState[key].value,
            formState,
        );
        if (!ok) acc[key] = message;
        return acc;
    }, {});
};

export const createErrorState = (
    errorResult: ErrorResultType = {},
    values: FormStateType,
): Array<boolean, FormStateType> => {
    return Object.keys(errorResult).reduce(
        ([hasError, result], key) => {
            hasError = true;
            result[key] = createInputState(key, values[key], errorResult[key]);

            return [hasError, result];
        },
        [false, {}],
    );
};
