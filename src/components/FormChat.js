import { useState } from 'react';
import Suggestions from './Suggestions';

function FormChat({ sendMessage, handleClickSuggestions }) {
    const [formData, setFormData] = useState({
        message: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        sendMessage(formData.message);

        setFormData({ message: '' });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    return (
        <div className="px-4 py-2 space-y-2">
            <h4 className="text-gray-400">O que você pretende fazer para sua saúde hoje?</h4>
            <Suggestions handleClickSuggestions={handleClickSuggestions} />
            <form onSubmit={handleSubmit} className="flex justify-between relative z-10 bg-blue-800 rounded-xl shadow-md shadow-slate-400">
                <textarea
                    autoFocus
                    name="message"
                    onChange={handleChange}
                    value={formData.message}
                    placeholder="Peça o que quiser..."
                    className="grow outline-0 bg-transparent text-white p-2 resize-none"
                />
                <button type="submit" className="text-white px-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 stroke-white" viewBox="0 0 24 24" fill="none">
                        <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </form>
        </div>
    );
}

export default FormChat;
