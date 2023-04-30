import React from 'react';
import { Loading } from './Loading'

export function Result ({ value, loading }) {
    return (
        <div className="mt-3">
            <h3>Result:</h3>
            <div>
            {loading 
                ? <Loading />
                : <span>{value}</span>}
            </div>
        </div>
    )
}