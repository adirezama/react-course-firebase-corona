import React, { useState, useEffect } from 'react';
import { authService } from '../../services';
import Cards from '../../components/cards/index';
import './style.css';

const Produk = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataProduk, setDataProduk] = useState([]);

  const getProduk = () => {
    authService
      .getProduk()
      .then((res) => {
        console.log(res);
        setDataProduk(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProduk();
  }, []);

  return (
    <div>
      <h1>Produk Page!</h1>
      <div className="produ-wrapper">
        {dataProduk.map((produk) => {
          return (
            <Cards style={{ fontSize: 18, lineHeight: 1.5 }} key={[produk.id]}>
              <h1>{produk.description}</h1>
              <div className="diskon-wrapper">
                <div className="diskon-wrapper__percentage">
                  {produk.display_promo_price_percentage}
                </div>
                <span className="harga-produk">
                  {produk.display_normal_price}
                </span>
              </div>
              <h3 className="harga-produk-terdiskon">{produk.display_price}</h3>
              <p>{produk.name}</p>
            </Cards>
          );
        })}
      </div>
    </div>
  );
};

export default Produk;
