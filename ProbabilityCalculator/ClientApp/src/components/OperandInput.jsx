import React from 'react';

export function OperandInput({label, value, setValue}) {

    const idValue = label.replace(' ', '-')
    const updateField = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="mb-1">
            <label htmlFor={`${label}-input`} className="form-label">{label}</label>
            <input id={`${label}-input`} className="form-control" type="number" value={value} onChange={updateField}/>
        </div>
    )
};