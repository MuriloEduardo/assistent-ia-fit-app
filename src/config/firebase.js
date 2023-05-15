import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

console.log('REACT_APP_GOOGLE_API_KEY', process.env.REACT_APP_GOOGLE_API_KEY);

const firebaseConfig = {
    projectId: 'assistente-fitness',
    appId: process.env.REACT_APP_GOOGLE_APP_ID,
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    authDomain: 'assistente-fitness.firebaseapp.com',
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);