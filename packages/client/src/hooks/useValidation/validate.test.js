import validate from './validate';

import {
    isRequired,
    isEmail,
    lengthBetween,
    hasCheckedValue,
} from './constraints';

describe('VALIDATE', () => {
    let validator;
    let validateForm;

    beforeAll(() => {
        validator = {
            email: [
                [isRequired, 'email을 입력하세요.'],
                [isEmail, '올바른 email 주소가 아닙니다.'],
            ],
        };
        validateForm = validate(validator);
    });

    it('should initialize validator(curried function) with validation rules', () => {
        expect(validateForm).toBeInstanceOf(Function);
    });

    it('should return [ok: boolean, message: string] for running validation', () => {
        const [ok, message] = validateForm('email', 'abc@abc.com');

        expect(typeof ok).toBe('boolean');
        expect(typeof message).toBe('string');
    });

    describe('email validation', () => {
        it('abc@abc.com', () => {
            const [ok, message] = validateForm('email', 'abc@abc.com');

            expect(ok).toBe(true);
            expect(message).toBe('');
        });

        it('a bs.sdk', () => {
            const [ok, message] = validateForm('email', 'a bs.sdk');
            const errorMsgs = validator.email.map(rule => rule[1]);

            expect(ok).toBe(false);
            expect(message).toBe(errorMsgs[1]);
        });

        it('empty value', () => {
            const [ok, message] = validateForm('email', '');
            const errorMsgs = validator.email.map(rule => rule[1]);

            expect(ok).toBe(false);
            expect(message).toBe(errorMsgs[0]);
        });
    });
});
