import FormChat from '../components/FormChat';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

function Home() {
    const [messages, setMessages] = useState([]);
    const { socket } = useContext(AuthGoogleContext);

    const sendMessage = (message) => {
        setMessages(messages => [...messages, message]);
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                setMessages(messages => [...messages, event.data]);
            };
        }
    }, [socket]);

    return (
        <>
            <div className="flex flex-col p-4">
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <FormChat socket={socket} sendMessage={sendMessage} />
        </>
    );
}

export default Home;
