import React, { useState, useEffect } from 'react';
import { OperandInput } from './OperandInput'
import { Form } from './Form';
import { Result } from './Result';

export function Calculation () {
    const [result, setResult] = useState('-');
    

    const onCalculationComplete = (data) => {
        setResult(data.probability);
    }

    return (<div>
            <h2>Hi World</h2>
            <label>Result:</label>
            <span>{result}</span>
            <Result value={result} loading={true}/>
            <Form onCalculationComplete={onCalculationComplete}/>
        </div>);
}