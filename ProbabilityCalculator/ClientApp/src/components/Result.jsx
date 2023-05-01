import React from 'react';
import { Loading } from './Loading'

export function Result ({ value, loading, staleResult }) {
    return (
        <div className="mt-3">
            <h3>Result:</h3>
            <div>
            {loading 
                ? <Loading />
                : <p className={`lead fw-bold ${staleResult ? 'text-black-50' : ''}`}>{value}</p>}
            </div>
        </div>
    )
}