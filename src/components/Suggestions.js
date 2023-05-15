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

        fetchData();
    }, [user]);

    const selectSuggestion = suggestion => handleClickSuggestions(suggestion);

    return <div>
        {loading ? (
            <div className="flex flex-col items-center space-y-12">
                <small>Carregando sugestões para você {user?.displayName}...</small>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
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