import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const urls = JSON.parse(localStorage.getItem('urls') || '{}');
    if (urls[shortcode]) {
      urls[shortcode].clicks += 1;
      localStorage.setItem('urls', JSON.stringify(urls));
      window.location.href = urls[shortcode].longUrl;
    } else {
      alert('Short URL not found!');
      navigate('/');
    }
  }, [shortcode, navigate]);

  return (
    <Box sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h5">Redirecting...</Typography>
    </Box>
  );
};

export default RedirectHandler;
