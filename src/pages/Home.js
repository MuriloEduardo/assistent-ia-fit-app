import ReactMarkdown from 'react-markdown';
import FormChat from '../components/FormChat';
import Suggestions from '../components/Suggestions';
import { useContext, useEffect, useState } from 'react';
import { AuthGoogleContext } from '../contexts/authGoogle';

function Home() {
    const [messages, setMessages] = useState([]);

    const { socket } = useContext(AuthGoogleContext);

    const sendMessage = (message) => {
        socket.send(JSON.stringify(message));

        setMessages(messages => [...messages, message]);
    };

    const handleClickSuggestions = (suggestion) => {
        sendMessage(suggestion);
    };

    useEffect(() => {
        if (socket) {
            socket.onmessage = ({ data }) => {
                try {
                    const { choices } = JSON.parse(data);
                    const [{ delta: { content, role } }] = choices;

                    if (role) {
                        setMessages(messages => [...messages, '']);
                    }

                    if (content) {
                        setMessages(messages => {
                            const last = messages[messages.length - 1];
                            const minusTheLast = messages.filter((_, index) => index < messages.length - 1);

                            return [...minusTheLast, last + content];
                        });
                    }
                } catch (error) {
                    console.log(error, data);
                }
            };
        }
    }, [socket]);

    return (
        <>
            <div className="flex flex-col p-4 pb-28">
                {messages.map((message, index) => (
                    <ReactMarkdown key={index} children={message} className="markdown" />
                ))}
            </div>
            <Suggestions handleClickSuggestions={handleClickSuggestions} />
            <FormChat socket={socket} sendMessage={sendMessage} />
        </>
    );
}

export default Home;
