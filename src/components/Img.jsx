import { useState } from 'react'

const gradients = [
  'linear-gradient(135deg, #1e3a5f 0%, #0d9488 100%)',
  'linear-gradient(135deg, #4c1d95 0%, #2563eb 100%)',
  'linear-gradient(135deg, #065f46 0%, #14b8a6 100%)',
  'linear-gradient(135deg, #7c2d12 0%, #ea580c 100%)',
  'linear-gradient(135deg, #1e40af 0%, #06b6d4 100%)',
]

export default function Img({ src, alt, className = '', style = {}, loading = 'lazy' }) {
  const [failed, setFailed] = useState(false)
  const grad = gradients[Math.abs((alt || '').length) % gradients.length]

  if (failed) {
    return (
      <div
        className={className}
        style={{ ...style, background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', padding: '1rem' }}>
          {alt || 'Image'}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      loading={loading}
      onError={() => setFailed(true)}
    />
  )
}
