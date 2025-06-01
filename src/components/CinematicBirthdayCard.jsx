import { Heart, Sparkles, Star, Gift } from 'lucide-react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

export default function CinematicBirthdayCard() {
  const [step, setStep] = useState(0)
  const [showHearts, setShowHearts] = useState(false)
  const progress = useMotionValue(0)
  const rotateX = useTransform(progress, [0, 100], [0, 180])
  const borderRadius = useTransform(progress, [0, 30, 100], [16, 8, 16])

  useEffect(() => {
    const audio = new Audio('/audio/first-date-frad.mp3')
    audio.loop = true
    audio.volume = 0.3
    audio.play()

    return () => audio.pause()
  }, [])

  const confettiColors = [
    'text-white/90', 'text-gray-200/80', 'text-slate-100/70'
  ]

  const openCard = () => {
    if (step > 0) return
    setStep(1)
    setTimeout(() => setStep(2), 1000)
    setTimeout(() => setShowHearts(true), 1500)
  }

  const ambientParticles = useMemo(() => (
    [...Array(30)].map(() => {
      const width = Math.random() * 10 + 2
      const height = Math.random() * 10 + 2
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        width,
        height,
        opacity: Math.random() * 0.1 + 0.05,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      }
    })
  ), [])

  const floatingElements = useMemo(() => ([
    { icon: <Star className="w-5 h-5" />, size: 'w-5 h-5', delay: 0 },
    { icon: <Gift className="w-5 h-5" />, size: 'w-5 h-5', delay: 0.4 },
    { icon: <Sparkles className="w-4 h-4" />, size: 'w-4 h-4', delay: 0.6 }
  ]), [])

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ambientParticles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gray-200"
            initial={{ x: p.x, y: p.y, width: p.width, height: p.height, opacity: 0 }}
            animate={{ opacity: [0, p.opacity, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: p.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          className="relative perspective-1000"
          style={{ rotateX, borderRadius }}
          animate={step === 1 ? { scale: 1.02 } : { scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <motion.div
            className="relative bg-white rounded-xl shadow-2xl border border-gray-300 overflow-hidden"
            animate={{ opacity: step === 2 ? 0 : 1 }}
            style={{ zIndex: step === 2 ? 0 : 1 }}
          >
            <div className="p-8 flex flex-col items-center justify-center h-full">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="mb-6"
              >
                <Heart className="w-12 h-12 text-gray-700" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-4 text-center"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                For Your 20th Birthday
              </motion.h2>
              <motion.p
                className="text-gray-600 text-center mb-8 max-w-md"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                A special message awaits inside...
              </motion.p>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <button
                  className="bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 shadow px-8 py-6 rounded-xl group"
                  onClick={openCard}
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform" />
                    Open Card
                  </span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {step === 2 && (
            <motion.div
              className="mt-8 bg-white rounded-xl shadow-2xl border border-gray-200 p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Happy 20th Birthday!
                </h1>
                <p className="text-gray-500 mt-2">To someone truly extraordinary</p>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 mt-6">
                <p className="text-xl text-gray-800 font-medium mb-6">My dearest love,</p>
                {["As you turn 20 today, I'm in awe of the incredible woman you've become. Your journey through life has been nothing short of inspiring, and I'm so grateful to be part of it.",
                  "Your smile brightens my darkest days, your laughter is my favorite melody, and your kindness reminds me what truly matters in this world.",
                  "This year will bring new adventures, challenges, and triumphs. Whatever comes your way, know that I'll be there cheering you on every step of the way.",
                  "May your 20th year be filled with joy that sparkles like champagne bubbles, love that wraps around you like a warm embrace, and dreams that take flight like birthday balloons."]
                  .map((paragraph, i) => (
                    <p key={i} className="mb-4 leading-relaxed">{paragraph}</p>
                  ))}
                <p className="text-xl font-semibold italic text-gray-700 mt-8 text-center">
                  "You make my world more beautiful just by being in it."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showHearts && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute ${confettiColors[i % confettiColors.length]}`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  rotate: Math.random() * 360,
                  scale: 0
                }}
                animate={{
                  y: -100,
                  x: Math.random() * window.innerWidth - window.innerWidth / 2,
                  rotate: Math.random() * 360,
                  scale: [0, 1, 1, 0],
                  opacity: [0, 1, 1, 0]
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: Math.random() * 5,
                  ease: "linear"
                }}
              >
                {floatingElements[i % floatingElements.length].icon}
              </motion.div>
            ))}
          </div>
        )}

        {step === 2 && (
          <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
            <div className="inline-block border-t border-gray-200 pt-4">
              <p className="text-gray-500 font-serif italic">Forever yours,</p>
              <p className="text-lg font-medium text-gray-700 mt-1">[Your Name]</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
