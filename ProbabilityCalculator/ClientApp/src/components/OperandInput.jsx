import React from 'react';

export function OperandInput({label, value, setValue}) {
    const updateField = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="mb-1">
            <label className="form-label">{label}</label>
            <input className="form-control" type="number" value={value} onChange={updateField}/>
        </div>
    )
};