import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css'; 

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation(); 

  const handleLoginClick = () => {
    if (location.pathname === '/login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleIconClick = () => {  
    navigate('/');   
  };

  return (
    <div className="layout">
      <header className="header sticky-header">
        <div className="logo-container">
          <img src="/images/swensens-logo.svg" alt="Swensen's Logo" className="logo" onClick={handleIconClick}/>
        </div>
        <nav className="navbar">
          <ul className="nav-list">
            <li className="nav-item">
              <button className="login-btn" onClick={handleLoginClick}>
                เข้าสู่ระบบ / ลงทะเบียน
              </button>
            </li>
            <li className="nav-item">🌐 TH</li>
          </ul>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <img src="/images/footer.png" alt="footer" className="footer-image"/>
      </footer>
    </div>
  );
};

export default Layout;
