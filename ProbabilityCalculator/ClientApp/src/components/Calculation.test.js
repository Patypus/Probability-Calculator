import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Calculation } from './Calculation';
import { GetCalculationTypes, Calculate } from '../services/ProbabilityCalculationService';

jest.mock('../services/ProbabilityCalculationService', () => {
    return { 
        GetCalculationTypes: jest.fn(), 
        Calculate: jest.fn()
    };
});

describe('Calculation', () => {
    beforeEach(() => {
        GetCalculationTypes.mockReturnValue(['CombinedWith', 'Either']);
    });

    const renderComponent = async () => {
        render(<Calculation />);

        // wait for load to complete
        await waitFor(() => {
            const spinner = screen.queryByRole('status');
            expect(spinner).not.toBeInTheDocument();
        });
    }

    it('renders inputs', async () => {
        await renderComponent();

        const dropdown = screen.getByLabelText('Calculation Type');
        const operandA = screen.getByLabelText('Operand A');
        const operandB = screen.getByLabelText('Operand B');
        const calculateButton = screen.queryByText('Calculate');

        expect(dropdown).toBeInTheDocument();
        expect(operandA).toBeInTheDocument();
        expect(operandB).toBeInTheDocument();
        expect(calculateButton).toBeInTheDocument();
    });

    it('passes selected values for calculation', async () => {
        Calculate.mockReturnValue({ probability: 0.3 })
        await renderComponent();

        const dropdown = screen.getByLabelText('Calculation Type');
        const operandA = screen.getByLabelText('Operand A');
        const operandB = screen.getByLabelText('Operand B');
        const calculateButton = screen.queryByText('Calculate');

        const dropdownValue = 'Either';
        const operandAValue = '0.6';
        const operandBValue = '0.2';

        fireEvent.change(dropdown, {target: {value: dropdownValue}});
        fireEvent.change(operandA, {target: {value: operandAValue}});
        fireEvent.change(operandB, {target: {value: operandBValue}});
        fireEvent.click(calculateButton);
        
        // wait for load to complete
        await waitFor(() => {
            const spinner = screen.queryByRole('status');
            expect(spinner).not.toBeInTheDocument();
        });

        expect(Calculate).toHaveBeenCalledWith(dropdownValue, operandAValue, operandBValue);
    });

    it('returns result from calculate function', async () => {
        const calculatedProbability = 0.7
        Calculate.mockReturnValue({ probability: calculatedProbability })
        await renderComponent();
        const calculateButton = screen.queryByText('Calculate');

        fireEvent.click(calculateButton);
        
        // wait for load to complete
        await waitFor(() => {
            const spinner = screen.queryByRole('status');
            expect(spinner).not.toBeInTheDocument();
        });

        const renderedResult = screen.queryByText(calculatedProbability);
        expect(renderedResult).toBeInTheDocument();
    });
});