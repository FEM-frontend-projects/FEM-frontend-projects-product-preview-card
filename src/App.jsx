import './app.scss';
import imgMobile from './assets/images/image-product-mobile.jpg';
import imgDesktop from './assets/images/image-product-desktop.jpg';
import cartSvg from './assets/images/icon-cart.svg';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function App() {
  const [isMobileSize, setIsMobileSize] = useState(null);
  const imageRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    //only run if node component exist and there is no observer created yet
    if (imageRef.current && !observerRef.current) {
      const handleElementSizeChange = (entries) => {
        let observedElement = entries[0];
        const elementWidth = observedElement.contentRect.width;
        setIsMobileSize(elementWidth < 600);
      };

      const imageNode = imageRef.current;

      //store observer in a ref
      observerRef.current = new ResizeObserver(handleElementSizeChange);
      observerRef.current.observe(imageNode);

      return () => {
        observerRef.current.disconnect();
        observerRef.current = null;
      };
    }
  }, []);

  return (
    <main className="main">
      <div ref={imageRef} className="card">
        <div className="image-container">
          <img src={isMobileSize ? imgMobile : imgDesktop} alt="" />
        </div>
        <div className="text-section">
          <p className="text-item-name">Perfume</p>

          <h1 className="text-title">Gabrielle Essence Eau De Parfum</h1>
          <p className="text-description">
            A floral, solar and voluptuous interpretation composed by Olivier Polge, Perfumer-Creator for the House of
            CHANEL.
          </p>

          <div className="price-container">
            <p className="text-price">$149.99</p>
            <p className="text-retailprice">$169.99</p>
          </div>
          <button>
            <div className="image-container-cart">
              <img src={cartSvg} alt="" />
            </div>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
