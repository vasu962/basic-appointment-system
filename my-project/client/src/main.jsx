import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='h-screen overflow-hidden bg-gray-100'>
      <App />
    </div>
  </React.StrictMode>,
)
