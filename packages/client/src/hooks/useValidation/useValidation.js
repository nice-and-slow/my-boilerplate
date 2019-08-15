/* @flow */
import { useEffect, useReducer, useCallback, useRef } from 'react';
import validate from './validate';
import {
    initializeFormState,
    trimFormValues,
    detectFormErrors,
    createErrorState,
    createInputState,
} from './utils';

function reducer(state, { type, payload }) {
    switch (type) {
        case 'SUBMIT_READY':
            return { ...state, isSubmitting: payload };
        case 'SET_FORM_STATE':
            return {
                ...state,
                formState: {
                    ...state.formState,
                    ...payload,
                },
            };
        case 'SET_FORM_VALUES':
            return { ...state, formValues: payload };
        default:
            return state;
    }
}

const useForm = (configs: ConfigsType = {}, submitCallback: func): any => {
    const [initialFormState, validator] = initializeFormState(configs);
    const [state, dispatch] = useReducer(reducer, {
        isSubmitting: false,
        formState: initialFormState,
        formValues: null,
    });
    const { isSubmitting, formState, formValues } = state;
    const validateForm = validate(validator);
    const submitCallbackRef = useRef(submitCallback);

    useEffect(() => {
        submitCallbackRef.current = submitCallback;
    }, [submitCallback]);

    useEffect(() => {
        if (isSubmitting) {
            submitCallbackRef.current(formValues);
        }
    }, [formValues, isSubmitting]);

    function validateAll(validator, values, formState) {
        const errorResult = detectFormErrors(
            validator,
            formState,
            validateForm,
        );
        const [hasError, errorFormState] = createErrorState(
            errorResult,
            values,
        );

        dispatch({ type: 'SET_FORM_STATE', payload: errorFormState });

        if (!hasError) dispatch({ type: 'SUBMIT_READY', payload: true });
    }

    function onSubmit(event) {
        if (event) event.preventDefault();

        const trimmedValues = trimFormValues(formState);

        if (!trimmedValues) return false;

        dispatch({ type: 'SET_FORM_VALUES', payload: trimmedValues });

        validateAll(validator, trimmedValues, formState);
    }

    function onChange(name, value) {
        if (!name) return;
        const [ok, message] = validateForm(name, value, formState);
        G.log('ok', ok);
        dispatch({
            type: 'SET_FORM_STATE',
            payload: {
                [name]: createInputState(name, value, message),
            },
        });
        dispatch({ type: 'SUBMIT_READY', payload: false });
    }

    const handleSubmit = useCallback(onSubmit, [formState]);
    const handleChange = useCallback(onChange, [formState]);

    return {
        formState,
        isSubmitting,
        handleChange,
        handleSubmit,
    };
};

export default useForm;
