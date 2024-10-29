import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; 
import { Buffer } from 'buffer';
import { Button, Space, Input } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import './Home.css';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { key: 'all' },
    { key: 'Ice Cream - Cake' },
    { key: 'Ice Cream Quart (450g)' },
    { key: 'Ice Cream Mini Quart (250g)' },
    { key: 'Sundae Set' },
    { key: 'Ice Cream Scoop' },
    { key: 'Small Bites Ice Cream' },
    { key: 'Topping' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); 
        const productsWithBase64 = response.data.map(product => ({
          ...product,
          image: product.image ? `data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}` : null
        }));
        setProducts(productsWithBase64);
        setFilteredProducts(productsWithBase64.filter(product => product.category !== 'promotion'));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="home-container">

      <div className="delivery-bar">
        <label htmlFor="delivery-location" className="delivery-label">{t('deliverTo')} :</label>
        <Input
          id="delivery-location"
          className="delivery-input"
          placeholder={t('selectLocation')}
          prefix={<EnvironmentOutlined style={{ color: '#bfbfbf' }} />}
        />
      </div>
      
      <div className="promotion-banner">
        <img src="/images/banner_sw-banner.webp" alt="Promotion Banner" className="promotion-banner-image" />
      </div>
      
      <section className="promotion-section">
        <h2 className="promotion-text ">{t('promotion')}</h2>
        <div className="promotion-items">
          {products
            .filter(product => product.category === 'promotion') 
            .map(product => (
              <div key={product.id} className="promotion-item">
                <img src={product.image} alt={i18n.language === 'th' ? product.descriptionTH : product.descriptionEN} />
                <div className="detail-container">
                  <p className="price">฿{product.price}</p>
                  <p>{i18n.language === 'th' ? product.descriptionTH : product.descriptionEN}</p>  
                  <Button className="detail-button">{t('viewDetail')}</Button>
                </div>
              </div>
            ))}
        </div>

        <h2 className="promotion-text ">{t('deliveryMenu')}</h2>
        <Space className="category-buttons" size="middle">
          {categories.map(({ key }) => (
            <Button
              key={key}
              type="default"
              variant="outlined"
              className={selectedCategory === key ? 'active' : 'inactive'}
              color={selectedCategory === key ? 'danger' : 'default'}
              onClick={() => filterByCategory(key)}
            >
              {t(`category.${key}`)}
            </Button>
          ))}
        </Space>
        <div className="promotion-items">
          {filteredProducts
            .filter(product => product.category !== 'promotion') 
            .map(product => (
              <div key={product.id} className="promotion-item">
                <img src={product.image} alt={i18n.language === 'th' ? product.descriptionTH : product.descriptionEN} />
                <div className="detail-container">
                  <p className="price">฿{product.price}</p>
                  <p>{i18n.language === 'th' ? product.descriptionTH : product.descriptionEN}</p>  
                  <Button className="detail-button">{t('viewDetail')}</Button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
