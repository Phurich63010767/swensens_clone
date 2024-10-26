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
  const isAdmin = useUserState((state) => state.isAdmin);
  const setIsAdmin = useUserState((state) => state.setIsAdmin);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/user/${userId}`);
        console.log(response.data.isadmin);
        console.log(isAdmin);
        setIsAdmin(response.data.isadmin);
        if (!response.data.isadmin) {
          message.error('ไม่มีสิทธิ์เข้าถึง');
          navigate('/');
        }
      } catch (error) {
        navigate('/login');
      }
    };
    checkAdminStatus();
  }, [navigate]);

  useEffect(() => {
    if (isAdmin) {
        console.log('yeet');
      }
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const handleFileChange = (info) => {
    if (info.file.status === 'done') {
      setFile(info.file.originFileObj);
      message.success(`${info.file.name} uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} upload failed.`);
    }
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('category', values.category);
    formData.append('image', file);

    try {
      await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Product added successfully!');
      form.resetFields();
      setFile(null);
    } catch (error) {
      message.error('Failed to add product.');
    }
  };

  if (!isAdmin) return null;

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
          name="description"
          label="คำอธิบาย"
          rules={[{ required: true, message: 'กรุณากรอกคำอธิบาย' }]}
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
          valuePropName="file"
          rules={[{ required: true, message: 'กรุณาอัพโหลดรูปภาพ' }]}
        >
          <Upload
            name="file"
            listType="picture"
            beforeUpload={() => false}
            onChange={handleFileChange}
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
