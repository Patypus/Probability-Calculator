import { operandValid } from './utils'

describe('operandValid', () => {
    it.each([
        [''],
        [-0.1],
        [1.001],
        [123],
        [-22]
    ])('operandValid rejects invalid value: %s', (value) => {
        const result = operandValid(value);
        expect(result).toBeFalsy();
    });

    it.each([
        [0],
        [0.1],
        [0.99],
        [1],
        [0.5]
    ])('operandValid accepts valid value: %s', (value) => {
        const result = operandValid(value);
        expect(result).toBeTruthy();
    });
});
