import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; 
import { Buffer } from 'buffer';
import './Home.css';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); // เปลี่ยน URL ตาม backend ของคุณ
        const productsWithBase64 = response.data.map(product => ({
          ...product,
          image: product.image ? `data:image/jpeg;base64,${Buffer.from(product.image.data).toString('base64')}` : null
        }));
        setProducts(productsWithBase64);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">

      <div className="delivery-bar">
        <label htmlFor="delivery-location" className="delivery-label">{t('deliverTo')}:</label>
        <select id="delivery-location" className="delivery-select">
          <option value="default">{t('selectLocation')}</option>
        </select>
      </div>
      
      <div className="promotion-banner">
        <img src="/images/banner_sw-banner.webp" alt="Promotion Banner" className="promotion-banner-image" />
      </div>
      
      <section className="promotion-section">
        <h2>{t('promotion')}</h2>
        <div className="promotion-items">
          {products
            .filter(product => product.category === 'promotion') 
            .map(product => (
              <div key={product.id} className="promotion-item">
                <img src={product.image} alt={i18n.language === 'th' ? product.descriptionTH : product.descriptionEN} />
                <p className="price">฿{product.price}</p>
                <p>{i18n.language === 'th' ? product.descriptionTH : product.descriptionEN}</p>  
              </div>
            ))}
        </div>

        <h2>{t('deliveryMenu')}</h2>
        <div className="promotion-items">
          {products
            .filter(product => product.category !== 'promotion') 
            .map(product => (
              <div key={product.id} className="promotion-item">
                <img src={product.image} alt={i18n.language === 'th' ? product.descriptionTH : product.descriptionEN} />
                <p className="price">฿{product.price}</p>
                <p>{i18n.language === 'th' ? product.descriptionTH : product.descriptionEN}</p>  
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
