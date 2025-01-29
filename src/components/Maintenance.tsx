import React from 'react';

const Maintenance = () => {
    return (
        <main className="h-svh lg:h-screen flex flex-col items-center">
            <header className="container py-4 lg:py-8">
                <img className="w-full object-center" src="/header-edil.png" alt=""/>
            </header>
            <div className="grow bg-[#EEF7FF] w-full grid items-center">
                <div className="container grid lg:grid-cols-2 place-items-center gap-[5.2vw]">
                    <div className="">
                        <h1 className="text-h1 font-bold ">Notre site est en reconstruction et sera prêt début Février.</h1>
                        <p className="text-base font-bold">Merci pour votre patience.</p>
                    </div>
                    <img className="w-full h-full object-cover object-center" src="/maintenance.png" alt=""/>
                </div>
            </div>
            <footer className="container py-4 lg:py-8 text-center">
                © 2025 - Édilogic Tous droits réservés.
            </footer>
        </main>
    );
};

export default Maintenance;