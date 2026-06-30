import React from 'react';
import Image from "next/image";

const Maintenance = () => {
    return (
        <main className="h-svh lg:h-screen flex flex-col items-center">
            <header className="container py-4 lg:py-8">
                <Image className="w-full h-auto object-center" src="/header-edil.png" alt="" width={1200} height={320}/>
            </header>
            <div className="grow bg-[#EEF7FF] w-full grid items-center">
                <div className="container grid lg:grid-cols-2 place-items-center gap-[5.2vw]">
                    <div className="">
                        <h1 className="text-h1 font-bold ">Notre site est en reconstruction et sera prêt début Février.</h1>
                        <p className="text-base font-bold">Merci pour votre patience.</p>
                    </div>
                    <Image className="w-full h-full object-cover object-center" src="/maintenance.png" alt="" width={640} height={480}/>
                </div>
            </div>
            <footer className="container py-4 lg:py-8 text-center">
                © 2025 - Édilogic Tous droits réservés.
            </footer>
        </main>
    );
};

export default Maintenance;
