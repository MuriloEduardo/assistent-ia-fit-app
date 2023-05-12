import ReactMarkdown from 'react-markdown';
import FormChat from '../components/FormChat';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

function Home() {
    const [messages, setMessages] = useState([]);
    const [responseChat, setResponseChat] = useState('');

    const { socket } = useContext(AuthGoogleContext);

    const sendMessage = (message) => {
        setMessages(messages => [...messages, message]);
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = ({ data }) => {
                try {
                    const { choices } = JSON.parse(data);
                    const [{ delta: { content } }] = choices;

                    if (content) {
                        setResponseChat(state => state + content);
                    }
                } catch (error) {
                    console.log(error, data);
                }
            };
        }
    }, [socket]);

    return (
        <>
            <div className="flex flex-col p-4 pb-32 space-y-4">
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
                <ReactMarkdown children={responseChat} className="markdown" />
            </div>
            <FormChat socket={socket} sendMessage={sendMessage} />
        </>
    );
}

export default Home;
