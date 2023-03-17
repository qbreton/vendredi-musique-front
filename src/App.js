import Draw from './Draw';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

function App() {
  const token = Cookies.get('token');
  const [isAdmin, setIsAdmin] = useState(false);

  function parseJwt(token) {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    let parsed = parseJwt(token);
    if (parsed && parsed.username === "music_god") {
      setIsAdmin(true)
    }
  }, [token]);

  return (
    <div className="App">
      <Draw token={token} isAdmin={isAdmin} setIsAdmin={setIsAdmin}></Draw>
    </div>
  );
}

export default App;
