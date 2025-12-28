import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";

export default function CountdownTimer() {
  const { eventDetails } = useStore();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(eventDetails.date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        días: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    // @ts-ignore
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return null;
    }

    return (
      <div key={interval} className="flex flex-col items-center mx-2 md:mx-4">
        <div className="bg-rose-100 w-16 h-16 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-inner border border-rose-200 transform rotate-3">
          {/* @ts-ignore */}
          <span className="text-2xl md:text-4xl font-serif text-rose-800 font-bold">{timeLeft[interval]}</span>
        </div>
        <span className="text-xs md:text-sm mt-2 uppercase tracking-widest text-gray-500 font-sans">{interval}</span>
      </div>
    );
  });

  return (
    <div className="py-12 bg-white/50 backdrop-blur-sm rounded-xl mx-4 shadow-lg border border-white">
      <h3 className="text-center font-script text-4xl text-rose-400 mb-8">Faltan...</h3>
      <div className="flex justify-center flex-wrap">
        {timerComponents.length ? timerComponents : <span className="text-3xl font-serif text-rose-800">¡Es hoy!</span>}
      </div>
    </div>
  );
}
