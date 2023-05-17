import { app } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);

    const [user, setUser] = useState();
    const [socket, setSocket] = useState(null);
    const [sessionStorageUser, setSessionStorageUser] = useState();

    useEffect(() => {
        const user = sessionStorage.getItem('@AuthFirebase:user');

        if (user) {
            const parseUser = JSON.parse(user);

            setUser(parseUser);
            setSessionStorageUser(parseUser);
        }
    }, []);

    useEffect(() => {
        const createNewUser = () => {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            })
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
        getRedirectResult(auth)
            .then(result => {
                if (result && result.user) {
                    sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(result.user));

                    setUser(result.user);
                }
            });
    }, [auth]);

    const signInGoogle = () => signInWithRedirect(auth, provider);

    const signOut = () => {
        sessionStorage.clear();

        setUser();

        return <Navigate to="/" />;
    };

    return (
        <AuthGoogleContext.Provider value={{ signInGoogle, user, signOut, socket }}>
            {children}
        </AuthGoogleContext.Provider>
    );
};