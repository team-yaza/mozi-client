import React from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }: { children: React.ReactNode }) => {
  const element = typeof window !== 'undefined' && document.querySelector('#portal');
  return element && children ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
