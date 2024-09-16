import React, { useState } from 'react';
import './App.css';
import UserInfoForm from './components/UserInfoForm';
import LetterGenerator from './components/LetterGenerator';

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = (info) => {
    setUserInfo(info);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📪时空信箱：对话过去的自己</h1>
      </header>
      <main>
        {!userInfo ? (
          <UserInfoForm onSubmit={handleSubmit} />
        ) : (
          <LetterGenerator userInfo={userInfo} />
        )}
      </main>
    </div>
  );
}

export default App;