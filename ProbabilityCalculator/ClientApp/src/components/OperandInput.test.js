import React from 'react';
import {render, screen} from '@testing-library/react';
import { OperandInput } from './OperandInput';

describe('OperandInput', () => {
    it('renders label', ()=> {
        const value = 0.42;
        const label = "test";
        const setValue = jest.fn();

        render(<OperandInput 
            label={label}
            value={value}
            setValue={setValue}
        />);

        const renderedLabel = screen.queryByText(label);
        expect(renderedLabel).toBeInTheDocument();
    });
});
