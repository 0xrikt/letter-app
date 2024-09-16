import React, { useState } from 'react';

function ReplyForm({ onSubmit }) {
  const [reply, setReply] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reply);
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <h2>回信给过去的自己</h2>
      <textarea
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="写下你想对过去的自己说的话..."
        required
      />
      <button type="submit">发送回信</button>
    </form>
  );
}

export default ReplyForm;