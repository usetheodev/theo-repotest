import { useState, useEffect } from 'react'

function App() {
  const [info, setInfo] = useState(null)

  useEffect(() => {
    fetch('/api/info')
      .then(r => r.json())
      .then(setInfo)
      .catch(() => setInfo({ name: 'Theo Repotest', description: 'Loading...' }))
  }, [])

  return (
    <div style={{ fontFamily: 'system-ui', background: '#0a0a0a', color: '#eee', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {info?.name || 'Loading...'}
        </h1>
        <p style={{ color: '#888', fontSize: '1.2rem' }}>{info?.description}</p>
        <p style={{ color: '#555', fontSize: '0.9rem', marginTop: '2rem' }}>
          Deploy method: <strong style={{ color: '#34d399' }}>{info?.deploy_method || '...'}</strong>
        </p>
      </div>
    </div>
  )
}

export default App
