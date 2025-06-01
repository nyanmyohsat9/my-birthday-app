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
    'rgba(255,255,255,0.9)', 'rgba(220,220,220,0.8)', 'rgba(240,240,240,0.7)'
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
    { icon: <Star size={20} />, delay: 0 },
    { icon: <Gift size={20} />, delay: 0.4 },
    { icon: <Sparkles size={16} />, delay: 0.6 }
  ]), [])

  const containerStyle = {
    position: 'relative',
    minHeight: '100vh',
    backgroundColor: '#fff',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#374151',
  }

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    border: '1px solid #D1D5DB',
    overflow: 'hidden',
    padding: 32,
    maxWidth: 480,
    width: '100%',
    textAlign: 'center',
  }

  const buttonStyle = {
    backgroundColor: '#F3F4F6',
    border: '1px solid #D1D5DB',
    color: '#374151',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '16px 32px',
    borderRadius: 24,
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: 18,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
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
        style={{ rotateX, borderRadius: borderRadius.get() + 'px', transformStyle: 'preserve-3d', marginBottom: 24, zIndex: 1 }}
        animate={step === 1 ? { scale: 1.02 } : { scale: 1 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <motion.div style={cardStyle} animate={{ opacity: step === 2 ? 0 : 1 }}>
          <div style={{ marginBottom: 24 }}>
            <Heart size={48} color="#4B5563" />
          </div>
          <motion.h2
            style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16, color: '#1F2937' }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            For Your 20th Birthday
          </motion.h2>
          <motion.p
            style={{ color: '#6B7280', marginBottom: 32, maxWidth: 320, margin: '0 auto' }}
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
              borderRadius: 16,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              border: '1px solid #E5E7EB',
              padding: 32,
              maxWidth: 480,
              width: '100%',
              textAlign: 'center',
              color: '#374151',
              zIndex: 1,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 style={{ fontSize: 28, fontWeight: 'bold', color: '#1F2937' }}>
              Happy 20th Birthday!
            </h1>
            <p style={{ color: '#6B7280', marginTop: 8 }}>To someone truly extraordinary</p>

            <div style={{ marginTop: 24, fontSize: 18, lineHeight: 1.6 }}>
              <p style={{ marginBottom: 24, fontWeight: '600', fontStyle: 'italic' }}>
                My dearest love,
              </p>
              {[
                "As you turn 20 today, I'm in awe of the incredible woman you've become. Your journey through life has been nothing short of inspiring, and I'm so grateful to be part of it.",
                "Your smile brightens my darkest days, your laughter is my favorite melody, and your kindness reminds me what truly matters in this world.",
                "This year will bring new adventures, challenges, and triumphs. Whatever comes your way, know that I'll be there cheering you on every step of the way.",
                "May your 20th year be filled with joy that sparkles like champagne bubbles, love that wraps around you like a warm embrace, and dreams that take flight like birthday balloons.",
              ].map((text, i) => (
                <p key={i} style={{ marginBottom: 16 }}>{text}</p>
              ))}
              <p style={{ fontWeight: '700', fontStyle: 'italic', marginTop: 32 }}>
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

      {step === 2 && (
        <motion.div
          style={{ marginTop: 24, textAlign: 'center', color: '#4B5563' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <div style={{ display: 'inline-block', borderTop: '1px solid #E5E7EB', paddingTop: 16 }}>
            <p style={{ fontStyle: 'italic' }}>Forever yours,</p>
            <p style={{ marginTop: 8, fontWeight: '600' }}>[Your Name]</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}