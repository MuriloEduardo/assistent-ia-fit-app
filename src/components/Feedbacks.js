import { useState } from 'react';

export default function Feedbacks() {
    const [created, setCreated] = useState(false);
    const [error, setError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        type: 'general',
        message: '',
    });

    const createNewFeedback = () => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/feedbacks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(() => {
                setError(false);
                setCreated(true);
            })
            .catch(error => {
                console.error(error);

                setError(true);
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        createNewFeedback();

        setFormData({
            type: '',
            message: '',
        });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    return <div className="fixed top-0 bottom-0 right-0 z-auto flex flex-col items-end justify-center">
        {isOpen && <form onSubmit={handleSubmit} className="flex flex-col items-end py-4 rounded-lg shadow-lg space-y-4">
            <div className="flex space-x-4 px-3">
                <label className={`p-1 rounded text-xs ${formData.type === 'general' ? 'bg-slate-800 text-white' : ''}`}>
                    <input
                        name="type"
                        type="radio"
                        className="hidden"
                        value="general"
                        checked={!formData.type || formData.type === 'general'}
                        onChange={handleChange}
                    />
                    Geral
                </label>

                <label className={`p-1 rounded text-xs ${formData.type === 'bug' ? 'bg-slate-800 text-white' : ''}`}>
                    <input
                        name="type"
                        type="radio"
                        className="hidden"
                        value="bug"
                        checked={formData.type === 'bug'}
                        onChange={handleChange}
                    />
                    Bug
                </label>

                <label className={`p-1 rounded text-xs ${formData.type === 'idea' ? 'bg-slate-800 text-white' : ''}`}>
                    <input
                        name="type"
                        type="radio"
                        className="hidden"
                        value="idea"
                        checked={formData.type === 'idea'}
                        onChange={handleChange}
                    />
                    Idéia
                </label>
            </div>

            <fieldset className="flex flex-col px-4">
                <label htmlFor="feedback-message" className="text-xs">Mensagem de feedback</label>
                <textarea
                    name="message"
                    id="feedback-message"
                    onChange={handleChange}
                    value={formData.message}
                    placeholder="Seu feedback é muito importante para nós!"
                    className="p-2"
                />
            </fieldset>

            <div className="px-4 text-xs flex flex-col items-end space-y-2">
                {created && <p className="text-green-500">Feedback enviado com sucesso!</p>}

                {error && <p className="text-red-500">Ocorreu um erro ao enviar o feedback.</p>}

                <button type="submit" className="px-4 py-1 bg-slate-800 text-white rounded">Enviar feedback</button>
            </div>
        </form>}
        <button onClick={() => setIsOpen(state => !state)} className="bg-slate-900 text-white text-xs px-4 py-2 rounded-s-lg shadow-lg">
            {!isOpen ? 'Dar feedback' : 'Fechar'}
        </button>
    </div>;
};