import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';

function Logged() {
    const { logout, user } = useContext(AuthGoogleContext);

    const [formData, setFormData] = useState({
        age: '',
        sex: '',
        weight: '',
        height: '',
        current_physical_activity_level: '',
        physical_activities_already_practice: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).catch(error => console.error(error));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.email}`)
            .then(response => response.json())
            .then(({ information }) => {
                setFormData(information);
            })
            .catch(error => console.error(error));
    }, [user]);

    return (
        <div className="p-4 flex flex-col">
            <h4 className="text-2xl mb-6">Conte mais sobre você 🤔</h4>
            <form onSubmit={handleSubmit} className="space-y-6 flex flex-col mb-12">
                <fieldset className="flex flex-col">
                    <label htmlFor="weight">Peso</label>
                    <input type="number" className="px-4 py-2 rounded" name="weight" id="weight" autoFocus value={formData.weight} onChange={handleChange} />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="sex">Sexo</label>
                    <select name="sex" id="sex" className="px-4 py-2 rounded" value={formData.sex} onChange={handleChange}>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                    </select>
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="age">Idade</label>
                    <input type="number" className="px-4 py-2 rounded" name="age" id="age" value={formData.age} onChange={handleChange} />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="height">Altura</label>
                    <input type="number" className="px-4 py-2 rounded" name="height" id="height" value={formData.height} onChange={handleChange} />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="current_physical_activity_level">Nível de atividade física atual</label>
                    <textarea className="px-4 py-2 rounded" name="current_physical_activity_level" id="current_physical_activity_level" value={formData.current_physical_activity_level} onChange={handleChange} />
                </fieldset>

                <fieldset className="flex flex-col">
                    <label htmlFor="physical_activities_already_practice">Quais atividades físicas já pratica</label>
                    <textarea className="px-4 py-2 rounded" name="physical_activities_already_practice" id="physical_activities_already_practice" onChange={handleChange} value={formData.physical_activities_already_practice} />
                </fieldset>

                <button type="submit" className="rounded border py-2 mt-6 bg-green-600 border-green-800 text-white">Salvar</button>
            </form>
            <div>
                <button className="rounded border border-gray-300 text-gray-300 px-1" onClick={() => logout()}>Sair</button>
            </div>
        </div>
    );
}

export default Logged;
