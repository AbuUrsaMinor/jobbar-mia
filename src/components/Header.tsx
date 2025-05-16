import type { FC } from 'react';
import { useEffect, useState } from 'react';

const messages = [
    "Håll koll på Mia's arbetsschema",
    'Du är vackrast',
    'Pussel',
    'Älskar dig',
    'Te amo',
    'Du är snygg',
    'Du har snygga öronfransar',
    'Du är min maskros',
    'Ma petite chou-fleur',
    'Ma petite poulette',
];

const Header: FC = () => {
    const [message, setMessage] = useState(messages[0]);

    useEffect(() => {
        // Use localStorage to persist the message index for the session
        const key = 'jobbar-mia-message-idx';
        let idx = Number(localStorage.getItem(key));
        if (isNaN(idx) || idx < 0 || idx >= messages.length) idx = 0;
        idx = (idx + 1) % messages.length;
        setMessage(messages[idx]);
        localStorage.setItem(key, String(idx));
    }, []);

    return (
        <header className="bg-pink-500 p-4">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className="text-xl font-medium text-white text-center w-full">
                    Jobbar Mia?
                </h1>
                <p className="text-white text-sm mt-1 opacity-80 text-center">
                    {message}
                </p>
            </div>
        </header>
    );
};

export default Header;
