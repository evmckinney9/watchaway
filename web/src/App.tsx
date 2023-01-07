import React, { useState } from 'react';
import { apiUrl } from './config';
import axios from 'axios';

function App() {
  const [data, setData] = useState<string | null>(null);


  async function getData() {
    const response = await axios.get(apiUrl + '/getAllUsers');
    setData(JSON.stringify(response.data));
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={getData}>Get Data</button>
        {data && <div>{data}</div>}
      </header>
    </div>
  );
}

export default App;
