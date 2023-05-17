import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

const Suggestions = ({ handleClickSuggestions }) => {
    const { user } = useContext(AuthGoogleContext);

    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/suggestions?email=${user?.email}`);
                const data = await response.json();

                if (data) {
                    setSuggestions(JSON.parse(data));
                }
            } finally {
                setLoading(false);
            }
        };

        if (user && user.created_api) {
            fetchData();
        }
    }, [user]);

    const selectSuggestion = suggestion => handleClickSuggestions(suggestion);

    return <div>
        {loading ? (
            <div className="flex flex-col space-y-2 p-4">
                <small>Carregando sugestões para você {user?.displayName}...</small>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        ) : (
            <div className="flex space-x-4 justify-between p-4">
                {suggestions?.map(({ suggestion, emoji }, index) => (
                    <div onClick={() => selectSuggestion(suggestion)} key={index} className="cursor-pointer border rounded p-4 text-center">
                        <span>{emoji}</span>
                        <h4>{suggestion}</h4>
                    </div>
                ))}
            </div>
        )}
    </div>;
};

export default Suggestions;