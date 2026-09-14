import { useState } from 'react'

import PostsManager from './components/PostsManager';
import DashboardStats from './components/DashboardStats';
/*import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'*/

export default function App() {
  const [pestana, setPestana] = useState('posts')

  return (
    <div className="container py-4">
      <header className="pb-3 mb-4 border-bottom d-flex justify-content-between align-items-center">
        <h1 className="h3">Mi CRUD con JSONPlaceholder</h1>
        <span className="badge bg-dark">REST API</span>
      </header>
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${pestana === 'posts' ? 'active' : ''}`} onClick={() => setPestana('posts')}>Posts</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${pestana === 'stats' ? 'active' : ''}`} onClick={() => setPestana('stats')}>Dashboard</button>
        </li>
      </ul>
      <main>
        {pestana === 'posts' && <PostsManager />}
        {pestana === 'stats' && <DashboardStats />}
      </main>

    </div>
  );
}

//export default App
