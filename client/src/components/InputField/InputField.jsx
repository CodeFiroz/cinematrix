import React from 'react'

const InputField = ({ id, label, name, type = "text", placeholder, value, onChange, error }) => {
    return (
        <>
            <div>
                <label htmlFor={id} className="block mb-1 text-sm text-gray-300">{label}</label>
                <input
                    id={id}
                    type={type}
                    className="w-full px-4 py-2 mb-1 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <p className="text-xs text-red-500">
                    {error}
                </p>
            </div>
        </>
    )
}

export default InputField