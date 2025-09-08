import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton, Snackbar, Alert } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const Home = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!longUrl || !isValidUrl(longUrl)) {
      setError(true);
      return;
    }

    const shortcode = Math.random().toString(36).substring(2, 8);
    setShortUrl(`${window.location.origin}/${shortcode}`);

    // Save URL in localStorage
    const urls = JSON.parse(localStorage.getItem('urls') || '{}');
    urls[shortcode] = { longUrl, clicks: 0 };
    localStorage.setItem('urls', JSON.stringify(urls));

    setLongUrl('');
    setError(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5, mx: 2 }}>
      <Typography variant="h4" gutterBottom>Shorten Your URL</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 500 }}>
        <TextField
          label="Enter Long URL"
          variant="outlined"
          fullWidth
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          error={error}
          helperText={error ? 'Please enter a valid URL' : ''}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>Generate Short URL</Button>
      </Box>

      {shortUrl && (
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
          </Typography>
          <IconButton color="primary" onClick={handleCopy} sx={{ ml: 1 }}>
            <ContentCopyIcon />
          </IconButton>
        </Box>
      )}

      <Snackbar open={copied} autoHideDuration={2000} onClose={() => setCopied(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>Copied to clipboard!</Alert>
      </Snackbar>
    </Box>
  );
};

export default Home;
