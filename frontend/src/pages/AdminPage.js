import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUserState } from '../store/UserState';
import './AdminPage.css';

const AdminPage = () => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  const userInfo = useUserState((state) => state.userInfo);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (!userInfo.isadmin) {
          message.error('ไม่มีสิทธิ์เข้าถึง');
          navigate('/');
        }
      } catch (error) {
        navigate('/login');
      }
    };
    checkAdminStatus();
  }, [navigate, userInfo.isadmin]);

  const handleFileChange = (info) => {
    setFile(info.file);
  };  

  const onFinish = async (values) => {
    console.log(values);
    const formData = new FormData();
    formData.append('price', values.price);
    formData.append('descriptionTH', values.descriptionTH);
    formData.append('descriptionEN', values.descriptionEN);
    formData.append('category', values.category);
    formData.append('file', file);
  
    try {
      await axios.post('http://localhost:3000/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userInfo}`, 
          'userId': userInfo.id,
        },
      });
      message.success('Product added successfully!');
      form.resetFields();
      setFile(null);
    } catch (error) {
      message.error('Failed to add product.');
    }
  };

  if (!userInfo.isadmin) return null;

  return (
    <div className="admin-page-container">
      <h2>เพิ่มสินค้าใหม่</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="price"
          label="ราคา"
          rules={[{ required: true, message: 'กรุณากรอกราคา' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="descriptionTH"
          label="คำอธิบายภาษาไทย"
          rules={[{ required: true, message: 'กรุณากรอกคำอธิบายไทย' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="descriptionEN"
          label="คำอธิบายภาษาอังกฤษ"
          rules={[{ required: true, message: 'กรุณากรอกคำอธิบายอังกฤษ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="category"
          label="หมวดหมู่"
          rules={[{ required: true, message: 'กรุณากรอกหมวดหมู่' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="image"
          label="อัพโหลดรูปภาพ"
          rules={[{ required: true, message: 'กรุณาอัพโหลดรูปภาพ' }]}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
            maxCount={1} 
          >
            <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            เพิ่มสินค้า
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminPage;
