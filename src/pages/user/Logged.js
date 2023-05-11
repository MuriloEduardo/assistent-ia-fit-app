import { useContext } from 'react';
import { AuthGoogleContext } from '../../contexts/authGoogle';

function Logged() {
    const { signOut } = useContext(AuthGoogleContext);

    return (
        <div className="flex flex-col p-4 justify-between grow">
            <ul>
                <li>Peso</li>
                <li>Sexo</li>
                <li>Idade</li>
                <li>Altura</li>
                <li>Nível de atividade física atual</li>
                <li>Quais atividades físicas já pratica</li>
            </ul>
            <button className="rounded border border-gray-300 text-gray-300" onClick={() => signOut()}>Sair</button>
        </div>
    );
}

export default Logged;
