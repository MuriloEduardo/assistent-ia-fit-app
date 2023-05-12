import { useContext } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';
import { Navigate } from 'react-router-dom';

function Login() {
    const { signInGoogle, user } = useContext(AuthGoogleContext);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="border-b mb-6 pb-6">
                <h1 className="text-xl">Seja-bem vindo(a)!!</h1>
            </div>

            {!user ? (
                <button
                    className="px-4 py-2 rounded-md bg-blue-900 text-gray-300"
                    onClick={signInGoogle}
                >Entrar com <strong>Google</strong></button>
            ) : <Navigate to="/" />}
        </div>
    );
}

export default Login;
