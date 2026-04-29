import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="nav" id="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <svg viewBox="0 0 36 36" fill="none" width="36" height="36">
            <rect width="36" height="36" rx="10" fill="#1B6B4A"/>
            <path d="M10 18L16 24L26 12" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          信聘
        </Link>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          <Link to="/jobs" onClick={() => setOpen(false)}>找岗位</Link>
          <Link to="/about" onClick={() => setOpen(false)}>关于</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>工作台</Link>
              <span className="nav-user">
                {user.phone?.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')}
                <button onClick={handleLogout} className="nav-logout">退出</button>
              </span>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>登录</Link>
              <Link to="/register" className="nav-cta" onClick={() => setOpen(false)}>注册</Link>
            </>
          )}
        </div>

        <button className="nav-mobile" onClick={() => setOpen(!open)}>
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>
    </nav>
  );
}
