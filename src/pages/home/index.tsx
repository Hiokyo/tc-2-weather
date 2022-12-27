import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.HomePage);
  });

  return (
    <>
    </>
  );
}
