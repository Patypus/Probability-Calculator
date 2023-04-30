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
        />);

        const updatedValue = '0.5'
        const input = screen.getByLabelText(label);
        fireEvent.change(input, {target: {value: updatedValue}});

        expect(setValue).toHaveBeenCalledWith(updatedValue)
    });
});
