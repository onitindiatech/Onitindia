import React from "react";
import {
  FiShoppingCart,
  FiShield,
  FiHeadphones,
} from "react-icons/fi";
import t1 from "../assets/t1.png";
import t2 from "../assets/t2.png";
import t3 from "../assets/t3.png";

const GradientCard = ({ children, className = "", innerClassName = "bg-white p-3 md:p-5", hoverEffect = true }) => (
  <div className={`relative p-[1.5px] rounded-[12px] bg-gradient-to-br from-zinc-300 via-green-200 to-zinc-300 ${className} ${hoverEffect ? 'hover:shadow-lg transition-all duration-300' : ''}`}>
    <div className={`h-full w-full rounded-[10.5px] ${innerClassName}`}>
      {children}
    </div>
  </div>
);

export default function WhyChooseOnIt() {
  return (
    <section className="min-h-screen py-10 md:py-20 flex flex-col justify-center items-center px-4 sm:px-10 lg:px-20 bg-zinc-100">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-zinc-800 mb-6 md:mb-12">
        Why Choose{" "}
        <span className="text-black">
          On<span className="text-green-500">IT</span>
        </span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 w-full max-w-6xl">
        {/* Card 1: Zero Commission */}
        <GradientCard className="flex flex-col order-1 col-span-1">
          <div className="flex flex-col justify-between h-full text-left">
            <div className="mb-2 md:mb-4">
              <FiShoppingCart className="text-2xl md:text-3xl lg:text-4xl text-green-500 ml-2 md:ml-5 -mb-6 md:-mb-8" />
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-bold text-black mb-1 -mt-3 md:mb-2 ml-2 md:ml-5">
                Zero Commission
              </h3>
              <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed ml-2 md:ml-5">
                Help is available anytime and anywhere
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Card 2: Logo */}
        <GradientCard innerClassName="bg-white p-3 md:p-5 flex flex-col items-center justify-center min-h-[120px] md:min-h-[180px]" className="order-3 md:order-2 col-span-2 md:col-span-1">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-black mb-1">
            On<span className="text-green-500">IT</span>
          </h2>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-medium">
            Hyperlocal Platform
          </p>
        </GradientCard>

        {/* Card 3: Verified Community */}
        <GradientCard className="flex flex-col order-2 md:order-3 col-span-1">
          <div className="flex flex-col justify-between h-full text-left">
            <div className="mb-2 md:mb-4">
              <FiShield className="text-2xl md:text-3xl lg:text-4xl text-green-500 ml-3 md:ml-7" />
            </div>
            <div>
              <h3 className="text-sm md:text-xl font-bold text-black mb-1 md:mb-2 ml-4 md:ml-8">
                Verified Community
              </h3>
              <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed ml-4 md:ml-8">
                Help is available anytime and anywhere
              </p>
            </div>
          </div>
        </GradientCard>

        {/* Card 4: Post your task (Spans 2 columns) */}
        <GradientCard className="order-4 col-span-2 row-span-auto md:row-span-2 group" innerClassName="bg-white p-4 md:p-5 flex flex-col md:flex-row items-center justify-between relative overflow-hidden">
          <div className="z-10 w-full md:w-1/2 pr-0 md:pr-4 mb-3 md:mb-0">
            <h3 className="text-xl md:text-3xl font-bold text-black mb-2 md:mb-3 leading-tight">
              Post your task <br /> in minutes
            </h3>
            <p className="text-zinc-500 text-base leading-relaxed ml-1">
              Find trusted local help quickly and get your work done stress-free.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-end relative h-32 sm:h-48 md:h-full">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"
              alt="Working"
              className="object-cover rounded-xl w-full h-full shadow-md transform"
            />
          </div>
        </GradientCard>

        {/* Bottom Right Column */}
        <div className="flex flex-row md:flex-col gap-4 md:gap-6 h-full order-5 col-span-2 md:col-span-1 md:row-span-2">
          {/* Card 5: 24/7 Support */}
          <GradientCard className="w-1/2 md:w-full flex-1">
            <div className="flex flex-col justify-center h-full">
              <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                <FiHeadphones className="text-2xl md:text-3xl lg:text-4xl text-green-500 ml-3 -mt-16 md:ml-8" />
                <h3 className="text-sm h-24 md:text-xl font-bold text-black ml-1 md:ml-2">
                  24/7 Support
                </h3>
              </div>
              <p className="text-zinc-500 text-[10px] md:text-sm leading-relaxed ml-3 md:ml-8  -mt-16">
                Help is available anytime and anywhere
              </p>
            </div>
          </GradientCard>

          {/* Card 6: Trusted Users */}
          <GradientCard innerClassName="bg-white p-3 md:p-4 flex items-center gap-3 md:gap-4" className="w-1/2 md:w-full flex-1">
            <div className="flex -space-x-2 md:-space-x-3 h-16">
              <img src={t1} alt="User 1" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white object-cover" />
              <img src={t2} alt="User 2" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white object-cover" />
              <img src={t3} alt="User 3" className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-2 border-white object-cover" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-black">50K+</h3>
              <p className="text-[10px] md:text-xs text-gray-500 font-medium">Trusted Users</p>
            </div>
          </GradientCard>
        </div>

      </div>
    </section>
  );
}
