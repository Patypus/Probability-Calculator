import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Result } from './Result';

describe('Result', () => {
    it('Renders value when not loading', () => {
        const value = '0.5';

        render(<Result value={value} loading={false} staleResult={false} />)

        const renderedValue = screen.queryByText(value);
        expect(renderedValue).toBeInTheDocument();
        const spinner = screen.queryByRole('status');
        expect(spinner).not.toBeInTheDocument();
    });

    it('Renders spinner when loading is true', () => {
        const value = '0.5';

        render(<Result value={value} loading={true} staleResult={false} />)

        const renderedValue = screen.queryByText(value);
        expect(renderedValue).not.toBeInTheDocument();
        const spinner = screen.queryByRole('status');
        expect(spinner).toBeInTheDocument();
    });

    it('highlights stale value', () => {
        const value = '0.5';

        render(<Result value={value} loading={false} staleResult={true} />)

        const renderedValue = screen.queryByText(value);
        expect(renderedValue).toHaveClass('text-black-50');
    });

    it('changing display mode updates displayed value', () => {
        const value = '0.5';

        render(<Result value={value} loading={false} staleResult={true} />)

        const percentageMode = screen.queryByText('Percentage');
        fireEvent.click(percentageMode);
        const percentageValue = screen.queryByText('50%');
        expect(percentageValue).toBeInTheDocument()
        const decimalMode = screen.queryByText('Decimal');
        fireEvent.click(decimalMode);
        const decimalValue = screen.queryByText(value);
        expect(decimalValue).toBeInTheDocument()
    });
});