import React from "react"; 

interface TextInputProps {
    placeholder: string,
    className?: string
}

const TextInput: React.FC<TextInputProps> = ({placeholder, className}) => {

    const inputStyles = {
        backgroundColor: '#fff',
        borderColor: '#000000',
        borderWidth: '1px',
        padding: '8px 12px',
        width: '100%',
        height: '40px',
        fontSize: '1rem',
        fontWeight: '400',
        transition: 'border-color 0.3s',
    }

    return (
        <input
            type="text"
            placeholder={placeholder}
            className={`${className} w-full p-2 border rounded`}
            style={inputStyles}
        />
    )
}

export default TextInput;