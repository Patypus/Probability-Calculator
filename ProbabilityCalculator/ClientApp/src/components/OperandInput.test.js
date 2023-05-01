import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OperandInput } from './OperandInput';

describe('OperandInput', () => {
    it('renders label', ()=> {
        const value = 0.42;
        const label = 'test';
        const setValue = jest.fn();

        render(<OperandInput 
            label={label}
            value={value}
            setValue={setValue}
            valueValid={true}
        />);

        const renderedLabel = screen.queryByText(label);
        expect(renderedLabel).toBeInTheDocument();
    });

    it('setValue called with updated value', ()=> {
        const value = 0.42;
        const label = 'test';
        const setValue = jest.fn();

        render(<OperandInput 
            label={label}
            value={value}
            setValue={setValue}
            valueValid={true}
        />);

        const updatedValue = '0.5'
        const input = screen.getByLabelText(label);
        fireEvent.change(input, {target: {value: updatedValue}});

        expect(setValue).toHaveBeenCalledWith(updatedValue)
    });

    it('informs user of invalid value', ()=> {
        const value = 42;
        const label = 'test';
        const setValue = jest.fn();

        render(<OperandInput 
            label={label}
            value={value}
            setValue={setValue}
            valueValid={false}
        />);

        const input = screen.getByLabelText(label);
        const validationMessage = screen.queryByText('Please enter a value between 0 and 1.');

        expect(input).toHaveClass('is-invalid');
        expect(validationMessage).toBeInTheDocument()
    });
});
