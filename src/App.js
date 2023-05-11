import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoutes } from './routes/public';
import { AuthGoogleContext } from './contexts/authGoogle';

function App() {
  const { user } = useContext(AuthGoogleContext);

  const firstName = user?.displayName.split(' ')[0];

  return (
    <>
      {user &&
        <nav className="flex justify-between items-center px-4 py-2 bg-slate-800 text-gray-300 shadow shadow-slate-400">
          <NavLink to="/">
            <img src="https://assistentia.fit/wp-content/uploads/2023/05/logo.png" className="w-10" alt="Logo" />
          </NavLink>
          <div className="flex space-x-2 items-center">
            <NavLink to="/auth/user">
              <div className="flex space-x-2 items-center">
                <span className="text-right typing-animation">Bom dia {firstName}!</span>
                <img className="rounded-full" src={user?.photoURL} alt={user?.displayName} width={35} height={35} />
              </div>
            </NavLink>
          </div>
        </nav>
      }
      <AppRoutes />
    </>
  );
}

export default App;
