import React, { useState } from 'react';
import './App.css';
import UserInfoForm from './components/UserInfoForm';
import LetterGenerator from './components/LetterGenerator';
import StructuredData from './components/StructuredData';
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const handleSubmit = (info) => {
    setUserInfo(info);
  };

  return (
    <div className="App">
      <StructuredData />
      <header className="App-header">
        <h1>📪时空信箱：对话过去的自己</h1>
      </header>
      <main>
        {!userInfo ? (
          <section className="user-info-section">
            <UserInfoForm onSubmit={handleSubmit} />
          </section>
        ) : (
          <section className="letter-section">
            <LetterGenerator userInfo={userInfo} />
          </section>
        )}
      </main>
      <footer>
        <p>© 2024 AISELF</p>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;