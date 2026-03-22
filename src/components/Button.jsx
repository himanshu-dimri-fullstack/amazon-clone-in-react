export default function Button({ text, onClick, type, className }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-full bg-[#131921] text-white py-2 px-2 sm:py-3 sm:px-3 rounded hover:bg-[#131921] transition font-semibold ${className}`}
        >
            {text}
        </button>
    );
}
