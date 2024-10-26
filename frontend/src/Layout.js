import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';
import { message } from 'antd';
import { useLoginState } from './store/LoginState';

const Layout = ({ children }) => {
  const isLoggedIn = useLoginState((state) => state.isLoggedIn);
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    if (location.pathname === '/login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    message.success('ออกจากระบบสำเร็จ');
    navigate('/');
  };

  const handleIconClick = () => {
    navigate('/');
  };

  return (
    <div className="layout">
      <header className="header sticky-header">
        <div className="logo-container">
          <img src="/images/swensens-logo.svg" alt="Swensen's Logo" className="logo" onClick={handleIconClick} />
        </div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              {isLoggedIn ? (
                <button className="login-btn" onClick={handleLogout}>
                  ออกจากระบบ
                </button>
              ) : (
                <button className="login-btn" onClick={handleLoginClick}>
                  เข้าสู่ระบบ / ลงทะเบียน
                </button>
              )}
            </li>
            <li className="nav-item">🌐 TH</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <img src="/images/footer.png" alt="footer" className="footer-image" />
      </footer>
    </div>
  );
};

export default Layout;
