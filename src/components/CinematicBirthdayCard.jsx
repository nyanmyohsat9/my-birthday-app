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

  const confettiColors = ['rgba(255,255,255,0.9)', 'rgba(220,220,220,0.8)', 'rgba(240,240,240,0.7)']

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
    { icon: <Star size={20} />, delay: 0 },
    { icon: <Gift size={20} />, delay: 0.4 },
    { icon: <Sparkles size={16} />, delay: 0.6 }
  ]), [])

  // Perfectly centered container
  const containerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#374151',
    padding: 0,
    margin: 0,
    overflow: 'hidden',
  }

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '1px solid #D1D5DB',
    padding: '24px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
    boxSizing: 'border-box',
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
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
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

      <motion.div
        style={{
          rotateX,
          borderRadius: borderRadius.get() + 'px',
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
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button style={buttonStyle} onClick={openCard}>
              <Sparkles size={20} />
              Open Card
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {step === 2 && (
          <motion.div
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              padding: '24px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              color: '#374151',
              zIndex: 1,
              marginTop: '24px',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>
              Happy 20th Birthday!
            </h1>
            <p style={{ color: '#6B7280', marginTop: '8px' }}>To someone truly extraordinary</p>

            <div style={{ marginTop: '20px', fontSize: '16px', lineHeight: '1.6' }}>
              {[
                "As you turn 20 today, I'm in awe of the incredible woman you've become.",
                "Your smile brightens my darkest days, your laughter is my favorite melody, and your kindness reminds me what truly matters.",
                "This year will bring new adventures, challenges, and triumphs. I'll be there cheering you on every step of the way.",
                "May your 20th year be filled with joy, love, and dreams that take flight like birthday balloons."
              ].map((text, i) => (
                <p key={i} style={{ marginBottom: '12px' }}>{text}</p>
              ))}
              <p style={{ fontWeight: 'bold', fontStyle: 'italic', marginTop: '16px' }}>
                "You make my world more beautiful just by being in it."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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