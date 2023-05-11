import { useState } from 'react';

function FormChat({ socket, sendMessage }) {
    const [formData, setFormData] = useState({
        message: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        socket.send(JSON.stringify(formData.message));

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
        <form onSubmit={handleSubmit} className="flex fixed bottom-4 left-4 right-4 justify-between bg-slate-800 rounded-xl shadow-md shadow-slate-400">
            <textarea name="message" id="message" className="grow outline-0 bg-transparent text-white p-2" autoFocus value={formData.message} onChange={handleChange}></textarea>
            <button type="submit" className="text-white px-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 stroke-white" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L2 8.66667L11.5833 12.4167M22 2L15.3333 22L11.5833 12.4167M22 2L11.5833 12.4167" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </form>
    );
}

export default FormChat;
