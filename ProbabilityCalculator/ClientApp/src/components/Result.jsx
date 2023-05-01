import React, { useState, useEffect } from 'react';
import { Loading } from './Loading'
import { displayModeDecimal, displayModePercentage } from '../lib/constants';

export function Result({ value, loading, staleResult }) {
    const [displayMode, setDisplayMode] = useState(displayModeDecimal);
    const [formattedResult, setFormattedResult] = useState('-');

    const handleChange = (event) => {
        setDisplayMode(event.target.value);
    }

    useEffect(() => {
        if (value === '') {
            setFormattedResult('-');
        }
        else if (displayMode === displayModeDecimal) {
            setFormattedResult(value);
        }
        else if (displayMode === displayModePercentage) {
            setFormattedResult(`${value * 100}%`);
        }

    }, [displayMode, value]);

    return (
        <div className="mt-3">
            <h3>Result:</h3>

            <div className="btn-group mb-3" role="group" >
                <input type="radio" className="btn-check" name="display-option" id="btn-decimal" value={displayModeDecimal} checked={displayMode === displayModeDecimal} onChange={handleChange} />
                <label className="btn btn-sm btn-outline-primary" htmlFor="btn-decimal">Decimal</label>

                <input type="radio" className="btn-check" name="display-option" id="btn-percentage" value={displayModePercentage} checked={displayMode === displayModePercentage} onChange={handleChange}/>
                <label className="btn btn-sm btn-outline-primary" htmlFor="btn-percentage">Percentage</label>
            </div>
            <div>
                {loading
                    ? <Loading/>
                    : <p className={`lead fw-bold ${staleResult ? 'text-black-50' : ''}`}>{formattedResult}</p>}
            </div>
        </div>
    )
}