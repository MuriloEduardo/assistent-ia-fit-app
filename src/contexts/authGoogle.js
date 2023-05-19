import { app } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import Feedbacks from '../components/Feedbacks';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithRedirect, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);

    const [user, setUser] = useState();
    const [socket, setSocket] = useState(null);
    const [createdUser, setCreatedUser] = useState(false);
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [sessionStorageUser, setSessionStorageUser] = useState();

    useEffect(() => {
        const user = sessionStorage.getItem('@AuthFirebase:user');
        const init = sessionStorage.getItem('@AuthFirebase:init');

        if (user) {
            const parseUser = JSON.parse(user);

            setUser(parseUser);
            setSessionStorageUser(parseUser);
        }

        if (init) {
            setLoadingLogin(true);
        }
    }, []);

    useEffect(() => {
        const createNewUser = () => {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
                .then(response => setCreatedUser(response.ok))
                .catch(error => console.error(error));
        };

        if (user && !sessionStorageUser) {
            createNewUser();
        }
    }, [user, sessionStorageUser]);

    useEffect(() => {
        if (!user) return;

        const socket = new WebSocket(`wss:${process.env.REACT_APP_SERVER_BASE_URL}/messages?email=${user?.email}`);

        socket.onopen = () => setSocket(socket);

        return () => {
            if (socket.readyState) socket.close();
        };
    }, [user]);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));

                setUser(user);
            } else {
                sessionStorage.clear();

                setUser();
            }

            setLoadingLogin(false);
        });
    }, [auth]);

    const signInGoogle = () => {
        sessionStorage.setItem('@AuthFirebase:init', true);

        signInWithRedirect(auth, provider);
    };

    const logout = () => {
        signOut(auth);

        return <Navigate to="/" />;
    };

    return (
        <AuthGoogleContext.Provider value={{ signInGoogle, user, logout, socket, loadingLogin, createdUser }}>
            {children}
            <Feedbacks email={user?.email} />
        </AuthGoogleContext.Provider>
    );
};