import React from "react";

interface TextInputProps {
    placeholder: string,
    className?: string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, className, value, onChange }) => {

    const inputStyles = {
        borderWidth: '0px',
        fontSize: '1rem',
        fontWeight: '400',
        transition: 'border-color 0.3s',
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={className}
            style={inputStyles}
        />

    )
}

export default TextInput;