import React from 'react'
import { useAuthContext } from '../context/auth';
import AuthRouter from '../routes/AuthRouter';
import AppRouter from '../routes/AppRouter';

function Shopnest() {
  const { authContextSelector } = useAuthContext();

  if (!authContextSelector.isAuthenticated()) {
    return (
      <>
        <AuthRouter />
        <AppRouter role='USER' />
      </>
    );
  }
  
  return <AppRouter role={authContextSelector.getUser().activeRole} />;
}

export default Shopnest;