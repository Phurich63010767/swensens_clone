import React from 'react';
import { Form, Input, Button, Row, Col, DatePicker, Radio, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const onFinish = async (values) => {
    console.log(values);
    try {
      const formattedValues = {
        ...values,
        birthdate: values.birthdate.format('YYYY-MM-DD'),
        isadmin: false,
      };
      console.log(formattedValues);

      const response = await axios.post('http://localhost:3000/user/register', formattedValues);

      if (response.status === 201) {
        message.success(`${t('registerSuccess')}`);
        navigate('/login');
      } else {
        message.error(`${t('registerError')}`);
      }
    } catch (error) {
      message.error(`${t('registerError')}`);
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="register-container">
      <Row className="register-row" gutter={100}>
        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="register-form-container">
          <div className="top-buttons">
            <Button color="default" variant="text" type="link" onClick={() => navigate('/')}>
              {`<`} {t('back')}
            </Button>
            <Button variant="outlined" color="danger" type="link" onClick={() => navigate('/login')}>
              {t('login')}
            </Button>
          </div>

          <div className="register-form">
            <h2>{t('registerWelcome')}</h2>
            <Form name="register" onFinish={onFinish} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={t('name')}
                    rules={[{ required: true, message: `${t('missName')}` }]}
                  >
                    <Input placeholder={t('name')} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="lastname"
                    label={t('lastname')}
                    rules={[{ required: true, message: `${t('missLastname')}` }]}
                  >
                    <Input placeholder={t('lastname')} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={t('email')}
                    rules={[{ required: true, message: `${t('missEmail')}` }]}
                  >
                    <Input placeholder={t('email')} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label={t('password')}
                    rules={[{ required: true, message: `${t('missPass')}` }]}
                  >
                    <Input.Password placeholder={t('password')} />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="birthdate"
                    label={t('birthdate')}
                    rules={[{ required: true, message: `${t('missBirthdate')}` }]}
                  >
                    <DatePicker placeholder={t('birthdate')} style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label={t('phone')}
                    rules={[{ required: true, message: `${t('missPhone')}` }]}
                  >
                    <Input placeholder={t('phone')} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="gender"
                label={t('gender')}
                rules={[{ required: true, message: `${t('missGender')}` }]}
              >
                <Radio.Group>
                  <Radio value="ชาย">{t('male')}</Radio>
                  <Radio value="หญิง">{t('female')}</Radio>
                  <Radio value="ไม่ระบุ">{t('notSpecified')}</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button type="primary" danger htmlType="submit" block>
                  {t('createAccount')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={12} className="register-banner">
          <img src="/images/register-banner.webp" alt="Swensen's Banner" className="banner-image" />
        </Col>
      </Row>
    </div>
  );
};

export default Register;
