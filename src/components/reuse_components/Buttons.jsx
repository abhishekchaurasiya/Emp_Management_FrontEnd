
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Buttons = ({ children, endPoint }) => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center mt-4">
            <button
                onClick={() => navigate(endPoint)}
                className="font-medium text-lg capitalize bg-[#2b06a9] px-6 py-0.5 text-white rounded "
            >
                {children}
            </button>
        </div>
    )
}

export default Buttons
