import { Heart, Sparkles, Star, Gift } from 'lucide-react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import confetti from 'canvas-confetti'

export default function CinematicBirthdayCard() {
  const [step, setStep] = useState(0)
  const [showHearts, setShowHearts] = useState(false)

  const progress = useMotionValue(0)
  const rotateX = useTransform(progress, [0, 100], [0, 180])
  const borderRadius = useTransform(progress, [0, 30, 100], [16, 8, 16])

  // Background music with tab visibility control
  useEffect(() => {
    const audio = new Audio('/audio/first-date-frad.mp3')
    audio.loop = true
    audio.volume = 0.3

    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause()
      } else {
        audio.play()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    audio.play().catch(() => {})

    return () => {
      audio.pause()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const confettiColors = ['rgba(255,255,255,0.9)', 'rgba(220,220,220,0.8)', 'rgba(240,240,240,0.7)']

  const openCard = () => {
    if (step > 0) return
    setStep(1)
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F87171', '#FBBF24', '#60A5FA'],
    })
    setTimeout(() => setStep(2), 1000)
    setTimeout(() => setShowHearts(true), 1500)
  }

  const ambientParticles = useMemo(() => (
    [...Array(30)].map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: Math.random() * 10 + 2,
      height: Math.random() * 10 + 2,
      opacity: Math.random() * 0.1 + 0.05,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }))
  ), [])

  const floatingElements = useMemo(() => [
    { icon: <Star size={20} />, delay: 0 },
    { icon: <Gift size={20} />, delay: 0.4 },
    { icon: <Sparkles size={16} />, delay: 0.6 }
  ], [])

  // Centered container style
  const containerStyle = {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#374151',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  }

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '1px solid #D1D5DB',
    padding: '24px',
    maxWidth: '90vw',
    width: '400px',
    textAlign: 'center',
    boxSizing: 'border-box',
    zIndex: 2,
  }

  const buttonStyle = {
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB',
    color: '#374151',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '12px 24px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    marginTop: '16px',
    width: '100%',
    maxWidth: '250px',
  }

  const heartsContainerStyle = {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 1000,
  }

  return (
    <div style={containerStyle}>
      {/* Ambient background particles */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {ambientParticles.map((p, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              borderRadius: '50%',
              backgroundColor: 'rgba(156, 163, 175, 0.4)',
              width: p.width,
              height: p.height,
              top: p.y,
              left: p.x,
              opacity: 0,
            }}
            animate={{ opacity: [0, p.opacity, 0] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* Card Flip Animation */}
      <motion.div
        style={{
          rotateX,
          borderRadius: `${borderRadius.get()}px`,
          transformStyle: 'preserve-3d',
          zIndex: 1,
          width: '100%',
          maxWidth: '400px',
        }}
        animate={step === 1 ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <motion.div style={cardStyle} animate={{ opacity: step === 2 ? 0 : 1 }}>
          <div style={{ marginBottom: '20px' }}>
            <Heart size={48} color="#4B5563" />
          </div>
          <motion.h2
            style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#1F2937' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            For Your 20th Birthday
          </motion.h2>
          <motion.p
            style={{ color: '#6B7280', marginBottom: '24px' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            A special message awaits inside...
          </motion.p>
          <motion.button
            style={buttonStyle}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            onClick={openCard}
          >
            <Sparkles size={20} />
            Open Card
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Message Panel Slide-In */}
      <AnimatePresence>
        {step === 2 && (
          <motion.div
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              padding: '24px',
              maxWidth: '90vw',
              width: '400px',
              textAlign: 'center',
              color: '#374151',
              zIndex: 2,
              position: 'relative',
              marginTop: '24px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h1
              style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 1 }}
            >
              Happy 20th Birthday!
            </motion.h1>
            <p style={{ color: '#6B7280', marginTop: '8px' }}>To someone truly extraordinary</p>

            <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
              {[
                "As you turn 20 today, I'm in awe of the incredible woman you've become.",
                "Your smile brightens my darkest days, your laughter is my favorite melody, and your kindness reminds me what truly matters.",
                "This year will bring new adventures, challenges, and triumphs. I'll be there cheering you on every step of the way.",
                "May your 20th year be filled with joy, love, and dreams that take flight like birthday balloons."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  style={{ marginBottom: '12px' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.3 }}
                >
                  {text}
                </motion.p>
              ))}
              <motion.p
                style={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '16px' }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3 }}
              >
                "You make my world more beautiful just by being in it."
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Hearts / Icons */}
      {showHearts && (
        <div style={heartsContainerStyle}>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                color: confettiColors[i % confettiColors.length],
                top: window.innerHeight + 100,
                left: Math.random() * window.innerWidth,
                rotate: Math.random() * 360,
                scale: 0,
                opacity: 0,
              }}
              initial={{
                y: window.innerHeight + 100,
                rotate: Math.random() * 360,
                scale: 0,
                opacity: 0,
              }}
              animate={{
                y: -100,
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                rotate: Math.random() * 360,
                scale: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                repeatDelay: Math.random() * 5,
                ease: 'linear',
              }}
            >
              {floatingElements[i % floatingElements.length].icon}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}