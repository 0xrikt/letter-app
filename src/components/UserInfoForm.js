import React, { useState } from 'react';

function UserInfoForm({ onSubmit }) {
  const currentYear = new Date().getFullYear();
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    birthYear: 1995,
    gender: '',
    pastYear: 2005,
    situation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  const yearOptions = Array.from({length: 101}, (_, i) => currentYear - i);

  return (
    <form onSubmit={handleSubmit} className="user-info-form">
      <div>
        <label htmlFor="nickname">你想如何称呼自己：</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={userInfo.nickname}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="birthYear">出生年份：</label>
        <select
          id="birthYear"
          name="birthYear"
          value={userInfo.birthYear}
          onChange={handleChange}
          required
        >
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="gender">性别：</label>
        <select
          id="gender"
          name="gender"
          value={userInfo.gender}
          onChange={handleChange}
          required
        >
          <option value="">请选择</option>
          <option value="male">男</option>
          <option value="female">女</option>
          <option value="other">其他</option>
        </select>
      </div>
      <div>
        <label htmlFor="pastYear">想对话的年份：</label>
        <select
          id="pastYear"
          name="pastYear"
          value={userInfo.pastYear}
          onChange={handleChange}
          required
        >
          {yearOptions.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="situation">当时的情况：</label>
        <p className="situation-hint">当时在哪里，在干什么，是什么性格，最关心哪些问题，对未来的想象是什么样子……</p>
        <textarea
          id="situation"
          name="situation"
          value={userInfo.situation}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">开始对话</button>
    </form>
  );
}

export default UserInfoForm;