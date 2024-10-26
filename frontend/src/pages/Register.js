import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Radio, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const formattedValues = {
        ...values,
        birthdate: values.birthdate.format('YYYY-MM-DD'),
      };
      console.log(formattedValues);

      const response = await axios.post('http://localhost:3000/user/register', formattedValues);

      if (response.status === 201) {
        message.success('สมัครสมาชิกสำเร็จ!');
        navigate('/login');
      } else {
        message.error('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      }
    } catch (error) {
      message.error('เกิดข้อผิดพลาดในการสมัครสมาชิก');
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <Row className="register-row" gutter={100}>
        <Col span={12} className="register-form-container">
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
                    name="name"
                    label="ชื่อ"
                    rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
                  >
                    <Input placeholder="ชื่อ" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastname"
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
                    name="birthdate"
                    label="วันเกิด"
                    rules={[{ required: true, message: 'กรุณาเลือกวันเกิด' }]}
                  >
                    <DatePicker placeholder="วันเกิด" style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="เบอร์โทรศัพท์"
                    rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์' }]}
                  >
                    <Input placeholder="เบอร์โทรศัพท์" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="gender"
                label="เพศ"
                rules={[{ required: true, message: 'กรุณาเลือกเพศ' }]}
              >
                <Radio.Group>
                  <Radio value="ชาย">ชาย</Radio>
                  <Radio value="หญิง">หญิง</Radio>
                  <Radio value="ไม่ระบุ">ไม่ระบุ</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" danger htmlType="submit" block>
                  สร้างบัญชี
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col span={12} className="register-banner">
          <img src="/images/register-banner.webp" alt="Swensen's Banner" className="banner-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
