import LoadingEllipsis from './LoadingEllipsis';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

const Suggestions = ({ handleClickSuggestions }) => {
    const { user, userFromApi } = useContext(AuthGoogleContext);

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

        if (userFromApi) fetchData();
    }, [user, userFromApi]);

    const selectSuggestion = suggestion => handleClickSuggestions(suggestion);

    return !loading && !!suggestions.length ? (
        <div className="flex space-x-4 justify-between relative z-10">
            {suggestions?.map(({ suggestion, emoji }, index) => (
                <div onClick={() => selectSuggestion(suggestion)} key={index} className="cursor-pointer border rounded p-2 text-center text-xs">
                    <span>{emoji}</span>
                    <h4>{suggestion}</h4>
                </div>
            ))}
        </div>
    ) : <LoadingEllipsis text="Carregando sugestões para você" />;
};

export default Suggestions;