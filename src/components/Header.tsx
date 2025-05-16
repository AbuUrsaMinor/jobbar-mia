import type { FC } from 'react';

const Header: FC = () => {
    return (<header className="bg-pink-500 p-4">
        <div className="container mx-auto">
            <h1 className="text-2xl font-medium text-white flex items-center">
                Jobbar Mia
                <span className="ml-2 text-white text-sm">♥</span>
            </h1>
            <p className="text-white text-sm mt-1 opacity-80">
                Håll koll på Mias arbetsschema
            </p>
        </div>
    </header>
    );
};

export default Header;
