import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Result } from './Result';

describe('Result', () => {
    it('Renders value when not loading', () => {
        const value = '0.5';

        render(<Result value={value} loading={false} />)

        const renderedValue = screen.queryByText(value);
        expect(renderedValue).toBeInTheDocument();
        const spinner = screen.queryByRole('status');
        expect(spinner).not.toBeInTheDocument();
    });

    it('Renders spinner when loading is true', () => {
        const value = '0.5';

        render(<Result value={value} loading={true} />)

        const renderedValue = screen.queryByText(value);
        expect(renderedValue).not.toBeInTheDocument();
        const spinner = screen.queryByRole('status');
        expect(spinner).toBeInTheDocument();
    });
});