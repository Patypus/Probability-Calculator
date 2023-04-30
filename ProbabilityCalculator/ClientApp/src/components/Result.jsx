import React from 'react';

export function Result ({ value }) {
    return (
        <div className="mb-3">
            <label>Result:</label>
            <span>{value}</span>
        </div>
    )
}