import React from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { useLoginState } from '../store/LoginState';

const Login = () => {
  const setIsLoggedIn = useLoginState((state) => state.setIsLoggedIn);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:3000/user/login', values);
      if (response.status === 201) {
        message.success('เข้าสู่ระบบสำเร็จ');
        setIsLoggedIn(true); // ตั้งค่าสถานะการเข้าสู่ระบบ
        navigate('/');
      } else {
        message.error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <Row className="login-row" gutter={100}>
        <Col span={12} className="login-form-container">
          <div className="top-buttons">
            <Button color="default" variant="text" type="link" onClick={() => navigate('/')}>
              กลับ
            </Button>
            <Button variant="outlined" color="danger" type="link" onClick={() => navigate('/register')}>
              สร้างบัญชี
            </Button>
          </div>

          <div className="login-form">
            <h2>ยินดีต้อนรับสมาชิก Swensen's เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย!</h2>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item name="email" label="อีเมล" rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}>
                <Input placeholder="อีเมล" />
              </Form.Item>

              <Form.Item name="password" label="รหัสผ่าน" rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}>
                <Input.Password placeholder="รหัสผ่าน" />
              </Form.Item>

              <div className="forget-pass">
                <a>ลืมรหัสผ่าน?</a>
              </div>              

              <Form.Item>
                <Button type="primary" danger htmlType="submit" block>
                  เข้าสู่ระบบ
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
