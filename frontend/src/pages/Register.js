import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log('Register Success:', values);
  };

  return (
    <div className="register-container">
      <Row className="register-row" gutter={100}>
        {/* Section for the Register Form */}
        <Col span={12} className="register-form-container">
          
          {/* Top buttons for navigation, outside of form */}
          <div className="top-buttons">
            <Button color="default" variant="text" type="link" onClick={() => navigate('/')}>
              กลับ
            </Button>
            <Button variant="outlined" color="danger" type="link" onClick={() => navigate('/login')}>
              เข้าสู่ระบบ
            </Button>
          </div>

          <div className="register-form">
            <h2>สมัครสมาชิกฟรี! รับสิทธิประโยชน์และส่วนลดมากมาย</h2>
            <Form name="register" onFinish={onFinish} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="firstName"
                    label="ชื่อ"
                    rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
                  >
                    <Input placeholder="ชื่อ" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastName"
                    label="นามสกุล"
                    rules={[{ required: true, message: 'กรุณากรอกนามสกุล' }]}
                  >
                    <Input placeholder="นามสกุล" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="อีเมล"
                    rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
                  >
                    <Input placeholder="อีเมล" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="รหัสผ่าน"
                    rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
                  >
                    <Input.Password placeholder="รหัสผ่าน" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="birthDate"
                    label="วันเกิด"
                    rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}
                  >
                    <DatePicker placeholder="วันเกิด" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phoneNumber"
                    label="เบอร์โทรศัพท์"
                    rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}
                  >
                    <Input placeholder="เบอร์โทรศัพท์" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                <Button type="primary" danger htmlType="submit" block>
                  สร้างบัญชี
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        {/* Section for the Banner */}
        <Col span={12} className="register-banner">
          <img src="/images/register-banner.webp" alt="Swensen's Banner" className="banner-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
