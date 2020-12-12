import React from 'react';
import './style.css';

const Cards = (props) => {
  const { children } = props;
  return <div className="cards">{children}</div>;
};

export default Cards;
