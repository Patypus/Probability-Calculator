import React, { useState } from 'react';

export function Calculation () {

    const [result, setResult] = useState('-');

    const loadCalculation = async () => {
        var response = await fetch('probabilitycalculation')
        const data = await response.json();
        setResult(data.probability);
    }

    return (<div>
            <h2>Hi World</h2>
            <label>Result:</label>
            <span>{result}</span>
            <button class="btn" onClick={loadCalculation}>Calculate</button>
        </div>);
}