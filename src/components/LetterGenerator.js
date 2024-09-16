import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReplyForm from './ReplyForm';
import WritingAnimation from './WritingAnimation';

function LetterGenerator({ userInfo }) {
  const [letter, setLetter] = useState('');
  const [reply, setReply] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [expandedLetters, setExpandedLetters] = useState({
    firstLetter: true,
    reply: true,
    secondLetter: true
  });

  useEffect(() => {
    generateLetter(userInfo);
  }, [userInfo]);

  const generateLetter = async (info) => {
    try {
      const currentYear = new Date().getFullYear();
      const currentAge = currentYear - info.birthYear;
      const pastAge = info.pastYear - info.birthYear;
      
      const response = await axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        model: "glm-4",
        messages: [
          {
            role: "system",
            content: `你是一个AI助手，现在要扮演用户${info.pastYear}年时${pastAge}岁的自己，给现在${currentAge}岁的自己写一封信。请记住，你是过去的自己，不要混淆身份。保持${info.pastYear}年时的视角、知识水平和说话方式。你需要充分体现出以下特点：
          1. 你是一个${pastAge}岁的${info.gender === 'male' ? '男孩' : '女孩'}，处于${info.pastYear}年的中国。
          2. 你的处境和性格是：${info.situation}
          3. 你要真诚地关心"未来的自己"，每句话都要有实质内容，避免空洞的套话。
          4. 根据你的年龄，表现出相应的成熟度和思考深度，不要过于幼稚或故作成熟。
          5. 尽可能引用具体的生活细节或当时的想法，使信件更加真实可信。`
          },
          {
            role: "user",
            content: `我的昵称是${info.nickname}，出生于${info.birthYear}年，性别是${info.gender}。现在是${info.pastYear}年的我，${info.situation}。
            请以${info.pastYear}年${pastAge}岁的我的身份，写一封信给现在${currentAge}岁的我。信中应该：
            1. 表达对现在这个年龄的我的看法和想象，如果有的话。
            2. 询问一些你真正关心的问题，这些问题应该反映出你当前的处境和思考。
            3. 给"未来的自己"一些由衷的建议或鼓励，这些建议应该基于你当前的价值观和经历。
            4. 在信的结尾，表达你希望得到回信，了解"未来的自己"现在的生活。
            请确保信的语气和表达方式完全符合${info.pastYear}年时我的性格和说话方式。使用"${info.nickname}"来称呼我，并在信中自然地融入一些${info.pastYear}年的背景元素。`
          }
        ],
        temperature: 0.7,
        top_p: 0.7,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GLM_API_KEY}`
        }
      });

      setLetter(response.data.choices[0].message.content);
    } catch (err) {
      setError('生成信件时出错，请稍后再试。');
      console.error('Error generating letter:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (replyText) => {
    setReply(replyText);
    setLoading(true);
    try {
      const currentYear = new Date().getFullYear();
      const currentAge = currentYear - userInfo.birthYear;
      const pastAge = userInfo.pastYear - userInfo.birthYear;

      const response = await axios.post('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
        model: "glm-4",
        messages: [
          {
            role: "system",
            content: `你是一个AI助手，正在扮演用户${userInfo.pastYear}年${pastAge}岁的自己。你刚刚给现在${currentAge}岁的自己写了一封信。现在，你需要回应现在的自己的回信。请记住，你是过去的自己，不要混淆身份。保持${userInfo.pastYear}年时的视角、知识水平和说话方式。`
          },
          {
            role: "assistant",
            content: `作为${userInfo.pastYear}年${pastAge}岁的你，我刚刚写了这封信：\n\n${letter}`
          },
          {
            role: "user",
            content: `现在${currentAge}岁的我回信说：${replyText}\n\n请以${userInfo.pastYear}年${pastAge}岁的我的身份回应这封信。在回应时：
            1. 表达你对收到回信的感受。
            2. 对比你之前期望和现实，表达你的想法。
            3. 如果现实与你的期望有差距，给予鼓励；如果超出期望，表达欣慰。
            4. 给现在的自己一些建议或祝福，做一个告别。
            请确保回信的语气和表达方式与你之前的信件一致，符合${userInfo.pastYear}年时的你的性格和说话方式。记住，你还不知道现在发生的事情，只能基于你当时的期望和想象来回应。使用"${userInfo.nickname}"来称呼我。`
          }
        ],
        temperature: 0.6,
        top_p: 0.7,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_GLM_API_KEY}`
        }
      });

      setAiResponse(response.data.choices[0].message.content);
      
      // 自动折叠之前的信件
      setExpandedLetters({
        firstLetter: false,
        reply: false,
        secondLetter: true
      });
    } catch (err) {
      setError('生成回复时出错，请稍后再试。');
      console.error('Error generating reply:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLetter = (letterType) => {
    setExpandedLetters(prev => ({
      ...prev,
      [letterType]: !prev[letterType]
    }));
  };

  if (loading) {
    const pastAge = userInfo.pastYear - userInfo.birthYear;
    return <WritingAnimation age={pastAge} nickname={userInfo.nickname} />;
  }
  if (error) return <p>{error}</p>;

  return (
    <div className="letter-container">
      <div className="letter-timeline">
        <div className="letter-item past-letter">
          <button onClick={() => toggleLetter('firstLetter')} className="toggle-button">
            {expandedLetters.firstLetter ? '收起' : '展开'} 来自过去的信
          </button>
          {expandedLetters.firstLetter && (
            <div className="letter">
              <pre>{letter}</pre>
            </div>
          )}
        </div>
        
        {reply && (
          <div className="letter-item present-letter">
            <button onClick={() => toggleLetter('reply')} className="toggle-button">
              {expandedLetters.reply ? '收起' : '展开'} 你的回信
            </button>
            {expandedLetters.reply && (
              <div className="letter">
                <pre>{reply}</pre>
              </div>
            )}
          </div>
        )}
        
        {aiResponse && (
          <div className="letter-item past-letter">
            <button onClick={() => toggleLetter('secondLetter')} className="toggle-button">
              {expandedLetters.secondLetter ? '收起' : '展开'} 过去的自己的回应
            </button>
            {expandedLetters.secondLetter && (
              <div className="letter">
                <pre>{aiResponse}</pre>
              </div>
            )}
          </div>
        )}
      </div>
      
      {!reply && <ReplyForm onSubmit={handleReply} />}
    </div>
  );
}

export default LetterGenerator;