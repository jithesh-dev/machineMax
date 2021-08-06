import React, { FC } from 'react';
import Navbar from 'components/Navbar';
import './styles.scss';

const Layout: FC = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
