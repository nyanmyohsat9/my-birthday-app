import { Heart, Sparkles } from 'lucide-react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'

export default function CinematicBirthdayCard() {
  const [step, setStep] = useState(0)
  const [showHearts, setShowHearts] = useState(false)
  const [audioState, setAudioState] = useState({ playing: false, error: false })

  const progress = useMotionValue(0)
  const rotateX = useTransform(progress, [0, 100], [0, 180])
  const borderRadius = useTransform(progress, [0, 30, 100], [16, 8, 16])

  // Play background music on load
  useEffect(() => {
    const audio = new Audio('/audio/first-date-fred.mp3')
    audio.loop = true
    audio.volume = 0.5 // Increased volume for better audibility
    
    // Try autoplay first
    const playPromise = audio.play()
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setAudioState({ playing: true, error: false })
        })
        .catch((error) => {
          console.log('Autoplay blocked:', error)
          setAudioState({ playing: false, error: true })
          
          // Add click handler for manual play
          const playAudio = () => {
            audio.play()
              .then(() => {
                setAudioState({ playing: true, error: false })
                document.removeEventListener('click', playAudio)
              })
              .catch((err) => {
                console.error('Manual play failed:', err)
                setAudioState({ playing: false, error: true })
              })
          }
          
          document.addEventListener('click', playAudio)
        })
    }

    return () => {
      audio.pause()
      setAudioState({ playing: false, error: false })
    }
  }, [])

  const confettiColors = ['rgba(255,255,255,0.9)', 'rgba(220,220,220,0.8)', 'rgba(240,240,240,0.7)']

  const openCard = () => {
    if (step > 0) return
    setStep(1)
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
    { icon: <Heart size={20} />, delay: 0 },
    { icon: <Sparkles size={20} />, delay: 0.4 },
  ], [])

  // ✅ Centered container style
  const containerStyle = {
    position: 'relative',
    width: '100vw',
    height: '100vh',
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

  // Audio control button style
  const audioButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#FFD700',
    border: 'none',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
    zIndex: 1001
  }

  return (
    <div style={containerStyle}>
      {/* Visual audio feedback */}
      {audioState.error && (
        <button 
          style={audioButtonStyle}
          onClick={() => {
            const audio = new Audio('/audio/first-date-fred.mp3')
            audio.loop = true
            audio.volume = 0.5
            audio.play()
              .then(() => setAudioState({ playing: true, error: false }))
              .catch(() => setAudioState({ playing: false, error: true }))
          }}
          aria-label="Play music"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 20v-16l9 8-9 8zm0 2l12-10-12-10v20z"/>
          </svg>
        </button>
      )}

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