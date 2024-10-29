import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useLoginState } from '../store/LoginState';
import { useUserState } from '../store/UserState';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);
  const setUserInfo = useUserState((state) => state.setUserInfo);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', values);
      if (response.status === 201) {
        message.success(`${t('loginSuccess')}`);
        setIsLoggedIn(true); 
        const getByEmail = await axios.get(`http://localhost:3000/user/email/${values.email}`);

        console.log(getByEmail.data.id);
        console.log(getByEmail.data);

        setUserInfo(getByEmail.data);

        navigate('/');
      } else {
        message.error(`${t('userPassWorng')}`);
      }
    } catch (error) {
      message.error(`${t('loginError')}`);
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <Row className="login-row" gutter={100}>
        <Col span={12} className="login-form-container">
          <div className="top-buttons">
            <Button color="default" variant="text" type="link" onClick={() => navigate('/')}>
              {`<`} {t('back')}
            </Button>
            <Button variant="outlined" color="danger" type="link" onClick={() => navigate('/register')}>
              {t('signUp')}
            </Button>
          </div>

          <div className="login-form">
            <h2>{t('loginWelcome')}</h2>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item name="email" label={t('email')} rules={[{ required: true, message: `${t('missEmail')}` }]}>
                <Input placeholder={t('email')} />
              </Form.Item>

              <Form.Item name="password" label={t('password')} rules={[{ required: true, message: `${t('missPass')}` }]}>
                <Input.Password placeholder={t('password')} />
              </Form.Item>

              <div className="forget-pass">
                <a>{t('forgotPass')}</a>
              </div>              

              <Form.Item>
                <Button type="primary" danger htmlType="submit" block>
                  {t('login')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col span={12} className="login-banner">
          <img src="/images/register-banner.webp" alt="Swensen's Banner" className="banner-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
