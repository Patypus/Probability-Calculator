import React, { useState, useEffect } from 'react';
import { OperandInput } from './OperandInput'
import { Form } from './Form';

export function Calculation () {
    const [result, setResult] = useState('-');
    

    const onCalculationComplete = (data) => {
        setResult(data.probability);
    }

    return (<div>
            <h2>Hi World</h2>
            <label>Result:</label>
            <span>{result}</span>
            <Form onCalculationComplete={onCalculationComplete}/>
        </div>);
}