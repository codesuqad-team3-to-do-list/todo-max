import { useState } from 'react';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const isLogin = !!token;

  return <div></div>;
}
