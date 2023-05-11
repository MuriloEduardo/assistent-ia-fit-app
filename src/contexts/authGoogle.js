import { app } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [sessionStorageUser, setSessionStorageUser] = useState();

    const [user, setUser] = useState();

    useEffect(() => {
        const user = sessionStorage.getItem('@AuthFirebase:user');
        const token = sessionStorage.getItem('@AuthFirebase:token');

        if (token && user) {
            const parseUser = JSON.parse(user);

            setUser(parseUser);
            setSessionStorageUser(parseUser);
        }
    }, []);

    useEffect(() => {
        if (user && !sessionStorageUser) {
            fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            }).catch(error => console.error(error));
        }
    }, [user, sessionStorageUser]);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const user = result.user;
                const token = credential.accessToken;

                setUser(user);

                sessionStorage.setItem('@AuthFirebase:token', token);
                sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user));
            }).catch(error => {
                const { code, message, customData: { email } } = error;

                const credential = GoogleAuthProvider.credentialFromError(error);

                console.log(code, message, email, credential);
            });
    };

    const signOut = () => {
        sessionStorage.clear();

        setUser();

        return <Navigate to="/" />;
    };

    return (
        <AuthGoogleContext.Provider value={{ signInGoogle, user, signOut }}>
            {children}
        </AuthGoogleContext.Provider>
    );
};