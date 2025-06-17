
import React from "react";

const WelcomeHero = () => (
  <div className="w-full flex flex-col items-center gap-2 mb-5 mt-0 px-2">
    <div className="w-full rounded-2xl bg-white shadow-lg px-6 py-7 flex flex-col items-center relative overflow-hidden border border-border">
      <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-2 tracking-tight drop-shadow-sm">
        Welcome to <span className="text-primary">SquadN!</span>
      </h1>
      <div className="text-black/90 text-[15px] sm:text-base max-w-xl text-center mb-2 font-medium leading-relaxed">
        Your place to connect, organize games, and meet the local sports community.<br />
        <span className="text-black/80">Post your games, share highlights, find teammates, and more.</span>
      </div>
      {/* Example CTA */}
      <button className="mt-2 px-6 py-2 rounded-full bg-primary hover:bg-primary/90 text-white font-bold shadow uppercase text-sm tracking-wide transition duration-150 ease-in-out">
        Create a Post
      </button>
      {/* Decorative elements removed for clean ESPN look */}
    </div>
  </div>
);

export default WelcomeHero;
