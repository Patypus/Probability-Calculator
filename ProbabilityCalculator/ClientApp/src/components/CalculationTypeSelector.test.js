import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CalculationTypeSelector } from './CalculationTypeSelector';
import { GetCalculationTypes } from '../services/ProbabilityCalculationService';

jest.mock('../services/ProbabilityCalculationService', () => {
    const mock = jest.fn();
    return { GetCalculationTypes: mock };
});

describe('CalculationTypeSelector', () => {
    it('loads types on component load', async () => {
        const mockCalculationType = 'Either';
        GetCalculationTypes.mockReturnValue([mockCalculationType]);
        const selectedValue = '';
        const setSelectedType = jest.fn();

        render(<CalculationTypeSelector
            selectedType={selectedValue}
            setSelectedType={setSelectedType}
        />);
        
        // wait for load to complete
        await waitFor(() => {
            const spinner = screen.queryByRole('status');
            expect(spinner).not.toBeInTheDocument();
        });

        expect(GetCalculationTypes).toHaveBeenCalledTimes(1);
        const renderedOption = screen.queryByText(mockCalculationType);
        expect(renderedOption).toBeInTheDocument();
    });

    it('loads types on component load', async () => {
        const mockCalculationType = 'Either';
        GetCalculationTypes.mockReturnValue([mockCalculationType]);
        const selectedValue = '';
        const setSelectedType = jest.fn();

        render(<CalculationTypeSelector
            selectedType={selectedValue}
            setSelectedType={setSelectedType}
        />);

        // wait for load to complete
        await waitFor(() => {
            const spinner = screen.queryByRole('status');
            expect(spinner).not.toBeInTheDocument();
        });

        const dropdown = screen.getByLabelText("Calculation Type");
        fireEvent.change(dropdown, { target: { value: mockCalculationType } });
        expect(setSelectedType).toHaveBeenCalledWith(mockCalculationType);
    });
});