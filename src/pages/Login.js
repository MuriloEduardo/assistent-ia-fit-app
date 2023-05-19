import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthGoogleContext } from '../contexts/authGoogle';
import LoadingEllipsis from '../components/LoadingEllipsis';

function Login() {
    const { signInGoogle, user, loadingLogin } = useContext(AuthGoogleContext);

    return !loadingLogin ? (
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
    ) : <div className="h-screen flex justify-center items-center">
        <LoadingEllipsis text="Carregando suas informações" />
    </div>;
}

export default Login;
