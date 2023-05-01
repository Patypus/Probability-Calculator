import React from 'react';

export function OperandInput({ label, value, setValue, valueValid }) {

    const idValue = label.replace(' ', '-')
    const updateField = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="mb-1">
            <label htmlFor={`${idValue}-input`} className="form-label">{label}</label>
            <input id={`${idValue}-input`} className={`form-control ${valueValid ? '' : 'is-invalid'}`} type="number" value={value} onChange={updateField} />
            {!valueValid && <div className="invalid-feedback">
                Please enter a value between 0 and 1.
            </div>}
        </div>
    )
};