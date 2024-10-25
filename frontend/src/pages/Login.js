import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <div className="login-container">
      <Row className="login-row" gutter={100}>
        {/* Section for the Login Form */}
        <Col span={12} className="login-form-container">
          
          {/* Top buttons for navigation, outside of form */}
          <div className="top-buttons">
            <Button type="link" onClick={() => navigate('/')}>
              กลับ
            </Button>
            <Button type="link" onClick={() => navigate('/register')}>
              สร้างบัญชี
            </Button>
          </div>

          <div className="login-form">
            <h2>ยินดีต้อนรับสมาชิก Swensen's เข้าสู่ระบบแล้วเริ่มสั่งไอศกรีมกันเลย!</h2>
            <Form name="login" onFinish={onFinish} layout="vertical">
              <Form.Item
                name="email"
                label="อีเมล"
                rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
              >
                <Input placeholder="อีเมล" />
              </Form.Item>

              <Form.Item
                name="password"
                label="รหัสผ่าน"
                rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
              >
                <Input.Password placeholder="รหัสผ่าน" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  เข้าสู่ระบบ
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Section for the Banner */}
        <Col span={12} className="login-banner">
          <img src="/images/register-banner.webp" alt="Swensen's Banner" className="banner-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
