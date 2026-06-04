import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CursorFollower from './CursorFollower';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div className="App">
      <CursorFollower />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
