import ReactMarkdown from 'react-markdown';
import FormChat from '../components/FormChat';
import { AuthGoogleContext } from '../contexts/authGoogle';
import { useContext, useEffect, useRef, useState } from 'react';

function Home() {
    const scrollRef = useRef(null);

    const [messages, setMessages] = useState([]);

    const { socket } = useContext(AuthGoogleContext);

    const sendMessage = (message) => {
        socket.send(JSON.stringify(message));

        setMessages(messages => [...messages, message]);
    };

    const handleClickSuggestions = (suggestion) => sendMessage(suggestion);

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

    useEffect(() => {
        const divElement = scrollRef.current;
        divElement.scrollTop = divElement.scrollHeight;
    }, [scrollRef, messages]);

    return (
        <>
            <div ref={scrollRef} className="flex flex-col px-4 overflow-y-auto max-h-full pt-14">
                {messages.map((message, index) => (
                    <ReactMarkdown key={index} children={message} className="markdown" />
                ))}
            </div>
            <FormChat socket={socket} sendMessage={sendMessage} handleClickSuggestions={handleClickSuggestions} />
        </>
    );
}

export default Home;
