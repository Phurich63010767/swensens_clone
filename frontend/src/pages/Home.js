import React from 'react';
import { useTranslation } from 'react-i18next';
import './Home.css';  

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="home-container">

      <div className="delivery-bar">
        <label htmlFor="delivery-location" className="delivery-label">{t('deliverTo')}:</label>
        <select id="delivery-location" className="delivery-select">
          <option value="default">{t('selcetLocation')}</option>
        </select>
      </div>
      
      <div className="promotion-banner">
        <img src="/images/banner_sw-banner.webp" alt="Promotion Banner" className="promotion-image" />
      </div>
      
      <section className="promotion-section">
        <h2>{t('promotion')}</h2>
        <div className="promotion-items">
          <img src="/path-to-promo-item-1" alt="Promotion Item 1" />
          <img src="/path-to-promo-item-2" alt="Promotion Item 2" />
          {/* เพิ่มสินค้าตามที่ต้องการ */}
        </div>
      </section>
    </div>
  );
}

export default Home;
