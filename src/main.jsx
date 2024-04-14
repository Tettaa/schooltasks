import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SchoolApp from './SchoolApp.jsx'
import School from './School.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';


import GermanWordChallange from './GermanWordsChallange/GermanWordChallange.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GermanWordChallange />
  </React.StrictMode>,
)
