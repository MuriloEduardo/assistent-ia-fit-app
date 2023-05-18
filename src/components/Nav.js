import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

function Nav() {
    const { user } = useContext(AuthGoogleContext);

    const [timeOfDay, setTimeOfDay] = useState('');

    const firstName = user?.displayName.split(' ')[0];

    useEffect(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let time;

        if (currentHour < 12) {
            time = 'Bom dia';
        } else if (currentHour < 18) {
            time = 'Boa tarde';
        } else {
            time = 'Boa noite';
        }

        setTimeOfDay(time);
    }, []);

    return user &&
        <nav className="flex justify-between z-10 items-center px-4 py-2 bg-slate-800 text-gray-300 shadow shadow-slate-400">
            <NavLink to="/">
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Nossa logo" width="35" height="35" />
                    <h1>Assistent IA Fit</h1>
                </div>
            </NavLink>
            <div className="flex space-x-2 items-center">
                <NavLink to="/auth/user">
                    <div className="flex space-x-2 items-center">
                        <span className="text-right">{timeOfDay} {firstName}</span>
                        <img className="rounded-full" referrerPolicy="no-referrer" src={user?.photoURL} alt={user?.displayName} width={35} height={35} />
                    </div>
                </NavLink>
            </div>
        </nav>;
}

export default Nav;