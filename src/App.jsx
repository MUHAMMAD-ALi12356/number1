import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// --- Updated Local Video Controller (Replaced YouTube) ---
const LocalMusicVideo = ({ playTrigger }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (playTrigger && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented by browser, waiting for interaction.");
      });
    }
  }, [playTrigger]);

  return (
    <video 
      ref={videoRef}
      loop 
      playsInline
      className="hidden" // Chupa hua rahay ga sirf audio sunai degi
    >
      <source src="/song.mp4" type="video/mp4" /> 
      {/* Note: Apni video file ko 'public' folder mein rakhein 
          aur upar src="/your-video-file.mp4" ko file name se change kar dein 
      */}
    </video>
  );
};

// --- Updated Rose bouquet with New Clean PNG ---
const UserBouquet = () => (
  <motion.div 
    className="relative w-80 h-80 md:w-[500px] md:h-[500px] flex items-center justify-center"
    initial={{ scale: 0.5, opacity: 0, y: 50 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 100, damping: 15 }}
  >
    <div className="relative flex items-center justify-center w-full h-full">
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 4, 
          ease: "easeInOut" 
        }}
        className="absolute w-64 h-64 md:w-96 md:h-96 bg-red-600/30 rounded-full blur-[80px] -z-10"
      />

      <motion.img 
        src="https://static.vecteezy.com/system/resources/thumbnails/036/568/544/small/ai-generated-a-bouquet-of-red-roses-is-shown-on-a-transparent-background-free-png.png" 
        alt="Red Roses Bouquet" 
        animate={{ 
          scale: [1, 1.05, 1], 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 3, 
          ease: "easeInOut" 
        }}
        className="w-full h-full object-contain drop-shadow-[0_0_40px_rgba(220,38,38,0.7)]"
      />
    </div>
  </motion.div>
);

const CoupleAnimation = ({ type, className }) => {
  if (type === 'holding-hands') {
    return (
      <svg viewBox="0 0 200 200" className={className}>
        <circle cx="70" cy="50" r="15" fill="white" />
        <circle cx="130" cy="50" r="15" fill="white" />
        <path d="M70 65 L70 120 M130 65 L130 120 M70 90 Q100 110 130 90" stroke="white" strokeWidth="4" fill="none" />
        <path d="M100 80 Q100 60 120 40 Q100 20 80 40 Q100 60 100 80" fill="#ff0000" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" className={className}>
      <path d="M100 160 Q100 130 130 100 Q160 70 130 40 Q100 10 70 40 Q40 70 70 100 Q100 130 100 160" fill="#ff0000" />
      <path d="M85 70 Q100 85 115 70" stroke="white" strokeWidth="3" fill="none" />
    </svg>
  );
};

export default function App() {
  const [step, setStep] = useState('intro');
  const [yesScale, setYesScale] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);

  const memoriesData = [
    { title: "First Meeting", desc: "The day the world changed for me." },
    { title: "Late Night Calls", desc: "Talking until the sun came up." },
    { title: "Inside Jokes", desc: "The laughter only we understand." },
    { title: "First Date", desc: "Butterflies that never went away." },
    { title: "Soul Mates", desc: "Each other's greatest strength." },
    { title: "Our Future", desc: "Building dreams together forever." }
  ];

  const triggerHeartPopper = (isHeavy = false) => {
    const scalar = isHeavy ? 3 : 2;
    const heart = confetti.shapeFromPath({ path: 'M167 10 L167 10 A45 45 0 0 1 212 55 A45 45 0 0 1 167 100 A45 45 0 0 1 122 55 A45 45 0 0 1 167 10' });
    confetti({
      shapes: [heart],
      particleCount: isHeavy ? 150 : 100,
      spread: isHeavy ? 160 : 90,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#8b0000', '#ff69b4'],
      scalar
    });
  };

  useEffect(() => {
    if (step === 'roses') {
      const timer = setTimeout(() => triggerHeartPopper(false), 400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleNo = () => {
    setYesScale(prev => prev + 0.5);
    setNoPos({
      x: (Math.random() - 0.5) * 400,
      y: (Math.random() - 0.5) * 400
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-cursive overflow-x-hidden relative">
      
      {/* Local Video Music Integration */}
      <LocalMusicVideo playTrigger={isPlaying} />

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-red-900/20 blur-[120px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-red-600 mb-8 flex gap-4 text-6xl"
            >
              <span>🌹</span>
              <svg className="w-32 h-32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>✨</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-bold text-center mb-6 text-white leading-tight">
              Be my <span className="text-red-600">Valentine</span>
            </h1>
            <p className="text-gray-400 text-2xl mb-10 tracking-wide font-sans">
              💌 A special message awaits you 💌
            </p>
            <button 
              onClick={() => {
                setStep('trap');
                setIsPlaying(true); 
              }}
              className="px-12 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.5)] flex items-center gap-2 font-sans text-xl"
            >
              Open Your Heart 🎁
            </button>
          </motion.div>
        )}

        {step === 'trap' && (
          <motion.div 
            key="trap"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-center mb-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              Will you be my <span className="text-red-600">Valentine</span> forever? 💍
            </h2>
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <motion.button
                style={{ scale: yesScale }}
                onClick={() => {
                  setStep('roses');
                  triggerHeartPopper(true);
                }}
                className="bg-red-600 text-white px-20 py-8 rounded-2xl font-bold text-5xl shadow-[0_0_40px_rgba(220,38,38,0.6)] hover:bg-red-500 transition-colors"
              >
                Yes! ❤️
              </motion.button>
              <motion.button
                animate={{ x: noPos.x, y: noPos.y }}
                onMouseEnter={handleNo}
                onClick={handleNo}
                className="bg-zinc-900 text-gray-500 px-10 py-4 rounded-xl font-bold border border-zinc-800 font-sans"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'roses' && (
          <motion.div 
            key="roses"
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 relative z-10 text-center"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-white mb-8">
              Only for <span className="text-red-600">You!</span> 🌹
            </h2>
            
            <UserBouquet />

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => setStep('letter')}
              className="mt-12 px-12 py-5 bg-white text-black font-bold rounded-full text-2xl shadow-2xl font-sans uppercase"
            >
              Read My Letter →
            </motion.button>
          </motion.div>
        )}

        {step === 'letter' && (
          <motion.div 
            key="letter"
            initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center py-20 px-6 max-w-3xl mx-auto z-10 relative"
          >
            <div className="w-full bg-zinc-900/80 backdrop-blur-xl p-10 md:p-20 rounded-[4rem] border border-red-900/30 shadow-[0_0_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                  ❤️
                </div>
              </div>
              
              <div className="space-y-8 text-center md:text-left">
                <p className="text-red-500 text-2xl font-sans uppercase tracking-[0.3em] font-bold">My Personal Vow</p>
                <h3 className="text-6xl font-bold text-white">To My Everything,</h3>
                <div className="text-2xl md:text-3xl text-gray-300 leading-relaxed italic space-y-6">
                  <p>Life without you feels completely incomplete. When you are with me, everything in this world looks beautiful and bright.</p>
                  <p>This deep red color is a symbol of my love—intense, passionate, and enduring. I built this space just to tell you how incredibly special you are to me.</p>
                  <p className="text-red-600 font-bold text-4xl not-italic">"You are mine, and you will always be mine."</p>
                </div>
                <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div>
                    <p className="text-red-500 font-bold text-xl font-sans">Always Yours,</p>
                    <p className="text-5xl font-bold text-white mt-2">Abdullah Abbasi</p>
                  </div>
                  <button 
                    onClick={() => setStep('memories')}
                    className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all text-lg font-sans uppercase"
                  >
                    View Our Memories →
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'memories' && (
          <motion.div 
            key="memories"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="min-h-screen w-full flex flex-col items-center justify-center p-6 bg-black overflow-hidden relative"
          >
            <h2 className="text-6xl md:text-8xl font-bold text-red-600 mb-20 z-20 text-center leading-tight">
              Our Digital <br/> <span className="text-white">Universe</span>
            </h2>

            <div className="w-full relative h-[500px] z-10">
              {memoriesData.map((memory, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '120vw', y: 50 + (i * 60) }}
                  animate={{ 
                    x: '-30vw', 
                    y: [50 + (i * 60), (50 + (i * 60)) - 30, 50 + (i * 60)] 
                  }}
                  transition={{ 
                    x: { repeat: Infinity, duration: 12 + i * 2, ease: "linear" },
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                    delay: i * 2 
                  }}
                  className="absolute"
                >
                  <div className="group relative">
                    <div className="absolute inset-0 bg-red-600 blur-[30px] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-zinc-900 border-2 border-red-600 p-4 rounded-3xl w-56 h-72 md:w-72 md:h-96 flex flex-col items-center justify-center shadow-2xl">
                       <CoupleAnimation type={i % 2 === 0 ? 'holding-hands' : 'heart'} className="w-24 h-24 mb-4" />
                       <p className="text-red-500 font-bold text-center text-xl">{memory.title}</p>
                       <p className="text-white text-sm text-center opacity-70 mt-4 px-4 font-sans">{memory.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              onClick={() => setStep('intro')}
              className="mt-20 px-10 py-4 border-2 border-red-600 text-red-600 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all z-20 text-xl font-sans"
            >
              Restart Journey 🔄
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Great+Vibes&family=Inter:wght@400;700&display=swap');
        
        .font-cursive { font-family: 'Dancing Script', cursive; }
        .font-sans { font-family: 'Inter', sans-serif; }
        h1, h2, h3, .text-5xl, .text-6xl { font-family: 'Great Vibes', cursive; }
        body { background: #0a0a0a; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #ff0000; border-radius: 10px; }
      `}</style>
    </div>
  );
}
