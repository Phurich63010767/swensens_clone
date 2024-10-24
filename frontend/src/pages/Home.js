import React from 'react';
import './Home.css';  // ไฟล์สไตล์ที่เราจะสร้าง

const Home = () => {
  return (
    <div className="home-container">
      <header className="header">
        <img src="/images/swensens-logo.svg" alt="Swensen's Logo" className="logo" />
        <nav className="navbar">
          <ul>
            <li>เข้าสู่ระบบ / ลงทะเบียน</li>
            <li>TH</li>
          </ul>
        </nav>
      </header>
      
      <div className="promotion-banner">
        <img src="/images/banner_sw-banner.webp" alt="Promotion Banner" />
      </div>
      
      <section className="promotion-section">
        <h2>โปรโมชั่น</h2>
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
