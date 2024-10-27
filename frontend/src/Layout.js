import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';
import { message, Dropdown, Menu } from 'antd';
import { useLoginState } from './store/LoginState';
import { useUserState } from './store/UserState';
import { useTranslation } from 'react-i18next';

const Layout = ({ children }) => {
  const isLoggedIn = useLoginState((state) => state.isLoggedIn);
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);
  const userInfo = useUserState((state) => state.userInfo);
  const setUserInfo = useUserState((state) => state.setUserInfo);
  const navigate = useNavigate();
  const location = useLocation();

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleLoginClick = () => {
    if (location.pathname === '/login') {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserInfo({});
    message.success('ออกจากระบบสำเร็จ');
    navigate('/');
  };

  const handleIconClick = () => {
    navigate('/');
  };

  const handleAdminHomeClick = () => {
    if (location.pathname === '/admin') {
      navigate('/'); 
    } else {
      navigate('/admin'); 
    }
  };

  const languageMenu = (
    <Menu onClick={({ key }) => changeLanguage(key)}>
      <Menu.Item key="en">EN</Menu.Item>
      <Menu.Item key="th">TH</Menu.Item>
    </Menu>
  );

  return (
    <div className="layout">
      <header className="header sticky-header">
        <div className="logo-container">
          <img src="/images/swensens-logo.svg" alt="Swensen's Logo" className="logo" onClick={handleIconClick} />
        </div>
        <nav className="navbar">
          <ul className="nav-list">
            {isLoggedIn && (
              <li className="nav-item">
                <span>{userInfo.name}, {userInfo.lastname}</span> 
              </li>
            )}
            {userInfo.isadmin && (
              <li className="nav-item">
                <button className="login-btn" onClick={handleAdminHomeClick}>
                  {location.pathname === '/admin' ? 'Home' : 'Admin'}
                </button>
              </li>
            )}
            <li className="nav-item">
              {isLoggedIn ? (
                <button className="login-btn" onClick={handleLogout}>
                  {t('logout')}
                </button>
              ) : (
                <button className="login-btn" onClick={handleLoginClick}>
                  {t('login')} / {t('register')}
                </button>
              )}
            </li>
            <li className="nav-item">
              <Dropdown overlay={languageMenu} trigger={['click']}>
                <span style={{ cursor: 'pointer' }}>🌐 {t('currentLang')}</span>
              </Dropdown>
            </li>
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
