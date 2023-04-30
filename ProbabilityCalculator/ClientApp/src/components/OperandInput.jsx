import React from 'react';

export function OperandInput({label, value, setValue}) {
    const updateField = (e, i, uop) => {
        setValue(e.target.value);
    }
    
    return (
        <div className="mb-1">
            <label className="form-label">{label}</label>
            <input className="form-control" type="number" value={value} onChange={updateField}/>
        </div>
    )
};