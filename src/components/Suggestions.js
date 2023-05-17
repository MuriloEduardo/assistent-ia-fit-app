import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

const Suggestions = ({ handleClickSuggestions }) => {
    const { user } = useContext(AuthGoogleContext);

    const [loading, setLoading] = useState(true);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/suggestions?email=${user.email}`);
                const data = await response.json();

                if (data) {
                    setSuggestions(JSON.parse(data));
                }
            } finally {
                setLoading(false);
            }
        };

        if (user) fetchData();
    }, [user]);

    const selectSuggestion = suggestion => handleClickSuggestions(suggestion);

    return !loading && !!suggestions.length && (
        <div className="flex space-x-4 justify-between">
            {suggestions?.map(({ suggestion, emoji }, index) => (
                <div onClick={() => selectSuggestion(suggestion)} key={index} className="cursor-pointer border rounded p-2 text-center text-xs">
                    <span>{emoji}</span>
                    <h4>{suggestion}</h4>
                </div>
            ))}
        </div>
    );
};

export default Suggestions;