import { motion } from "framer-motion";
import elegantPortrait from "@assets/generated_images/elegant_quinceañera_portrait.png";

export default function Hero({ guestName }: { guestName: string }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-rose-50 z-10" />
        <img 
          src={elegantPortrait} 
          alt="María José" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white p-4 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-serif italic text-xl md:text-2xl tracking-widest uppercase mb-4">Mis XV Años</p>
          <h1 className="font-script text-7xl md:text-9xl mb-6 text-rose-100 drop-shadow-lg">
            María José
          </h1>
          <div className="w-24 h-1 bg-rose-200 mx-auto rounded-full mb-8" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg inline-block"
        >
          <p className="font-sans text-lg tracking-wide uppercase mb-2">Invitación para</p>
          <p className="font-serif text-3xl text-rose-100">{guestName}</p>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-white rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
