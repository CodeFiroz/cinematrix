import React from 'react'
import { useState } from 'react'
const PasswordField = ({ id, label, name, placeholder, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);


    return (
        <>
            <div>
                <label htmlFor={id} className="block mb-1 text-sm text-gray-300">{label}</label>
                <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    className="w-full px-4 py-2 mb-1 rounded bg-[#0C0A09] border border-gray-700 focus:outline-none focus:border-[#FFB900]"
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                />
                <p className="text-xs text-red-500">
                    {error}
                </p>

                <div className="flex item-center text-sm gap-1 mt-2">
                <input type="checkbox" name="showpass" id="showpass" style={{ accentColor: '#FFB900' }} onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showpass">{showPassword ? 'Hide' : 'Show'} Password</label>
              </div>

            </div>
        </>
    )
}

export default PasswordField