import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './pages/CoinPage';
import HomePage from './pages/HomePage';

function App() {

 

  return (
    <BrowserRouter>
      <Box sx={{
        backgroundColor: '#14161a',
        color: 'white',
        minHeight: '100vh'
      }}>
        <Header />
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
