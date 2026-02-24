import React from 'react';
import p1 from '../assets/p1.jpeg';

const Partner = () => {
    return (
        <section className="py-6 md:py-24 md:h-screen bg-[#f3f4f6] flex flex-col justify-center items-center px-4 w-full">
            {/* Title */}
            <div className="text-center mb-4 md:mb-16">
                <h2 className="text-4xl md:text-6xl font-bold text-zinc-800 font-['Neue Montreal'] tracking-tight mb-4 ">
                    Trusted<span className="text-green-600"> Partners</span>
                </h2>
                <p className="text-zinc-500 font-medium text-lg md:text-xl">
                    Trusted by startups, studios, and growing brands around the world.
                </p>
            </div>

            {/* Grid Container */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-8 md:gap-y-12 w-full max-w-6xl place-items-center">

                {/* Partner Item */}
                <div className="flex flex-col items-center justify-center p-6 bg-white border border-green-400 rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[200px] h-[200px]">
                    <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-3">
                        <img
                            src={p1}
                            alt="TECH VISTAR"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <h2 className='text-sm md:text-base font-bold text-zinc-800 text-center leading-tight'>
                        TECH VISTAR
                    </h2>
                </div>

                {/* Placeholders to mimic the grid look if user adds more later */}
                {/* 
                   You can map through an array here. 
                   For now, just the one requested item is displayed centered or in grid.
                  */}
            </div>
        </section>
    );
};

export default Partner;
