import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthGoogleContext } from '../contexts/authGoogle';

function Nav() {
    const { user } = useContext(AuthGoogleContext);

    const firstName = user?.displayName.split(' ')[0];

    return user &&
        <nav className="flex justify-between z-10 items-center px-4 py-2 bg-slate-800 text-gray-300 shadow shadow-slate-400">
            <NavLink to="/">
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" className="w-10" alt="Logo" />
                    <h1 className="text-xl">Assistent IA Fit</h1>
                </div>
            </NavLink>
            <div className="flex space-x-2 items-center">
                <NavLink to="/auth/user">
                    <div className="flex space-x-2 items-center">
                        <span className="text-right typing-animation">Bom dia {firstName}!</span>
                        <img className="rounded-full" referrerPolicy="no-referrer" src={user?.photoURL} alt={user?.displayName} width={35} height={35} />
                    </div>
                </NavLink>
            </div>
        </nav>;
}

export default Nav;