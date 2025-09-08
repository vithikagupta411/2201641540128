import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const Stats = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const storedUrls = JSON.parse(localStorage.getItem('urls') || '{}');
    const urlArray = Object.entries(storedUrls).map(([shortcode, data]) => ({
      shortcode,
      ...data,
    }));
    setUrls(urlArray);
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>URL Statistics</Typography>
      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Short URL</TableCell>
              <TableCell>Long URL</TableCell>
              <TableCell>Clicks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {urls.map((url) => (
              <TableRow key={url.shortcode}>
                <TableCell>
                  <a href={`${window.location.origin}/${url.shortcode}`} target="_blank" rel="noopener noreferrer">
                    {url.shortcode}
                  </a>
                </TableCell>
                <TableCell>{url.longUrl}</TableCell>
                <TableCell>{url.clicks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};

export default Stats;
