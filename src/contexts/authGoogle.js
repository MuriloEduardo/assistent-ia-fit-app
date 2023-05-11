import { app } from '../config/firebase';
import { Navigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';

const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState();

    useEffect(() => {
        const user = sessionStorage.getItem('@AuthFirebase:user');
        const token = sessionStorage.getItem('@AuthFirebase:token');

        if (token && user) {
            setUser(JSON.parse(user));
        }
    }, []);

    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);

                const token = credential.accessToken;
                const user = result.user;

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