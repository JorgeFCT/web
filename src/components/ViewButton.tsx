interface ViewButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

const ViewButton: React.FC<ViewButtonProps> = ({ text, onClick, className }) => {

    const buttonStyles = {
        color: '#804517',
        backgroundColor: 'transparent',
        border: '2px solid #804517',
        padding: '0.5rem 1rem',
        transition: 'background-color 0.3s, color 0.3s, border-color 0.3s',
        cursor: 'pointer',
    };

    const buttonHoverStyles = {
        backgroundColor: '#E4E4E4',
        color: '#804517',
        borderColor: '#804517',
    };

    return (
        <button
            onClick={onClick}
            className={className}
            style={buttonStyles}
            onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = buttonHoverStyles.backgroundColor;
                e.currentTarget.style.color = buttonHoverStyles.color;
                e.currentTarget.style.borderColor = buttonHoverStyles.borderColor;
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = buttonStyles.backgroundColor;
                e.currentTarget.style.color = buttonStyles.color;
                e.currentTarget.style.borderColor = buttonStyles.border;
            }}
        >
            {text}
        </button>
    );
};

export default ViewButton;
