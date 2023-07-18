import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { designSystem } from './styles/designSystem.ts';
import { GlobalStyles } from './styles/GlobalStyles.ts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Main from './pages/Main';
import Sign from './pages/Sign';

export default function App() {
  const [token, setToken] = useState(null);
  const isLogin = !!token;

  return (
    <ThemeProvider theme={designSystem}>
      <GlobalStyles />
      <BrowserRouter>
        <Header isLogin={isLogin} />
        <Routes>
          <Route path="/login" element={<Sign type={'login'} />} />
          <Route path="/" element={<Main token={token} />} />
          <Route path="/sign-up" element={<Sign type={'signUp'} />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
