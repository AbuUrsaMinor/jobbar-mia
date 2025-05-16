import type { FC } from 'react';

const Header: FC = () => {
    return (
        <header className="bg-pink-500 p-4">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className="text-2xl font-medium text-white text-center w-full">
                    Jobbar Mia?
                </h1>
                <p className="text-white text-sm mt-1 opacity-80 text-center">
                    Håll koll på Mias arbetsschema
                </p>
            </div>
        </header>
    );
};

export default Header;
