import React, { useState, useEffect } from 'react';

const popularSongs = [
  { year: 1990, lyrics: "让我们的热情充满着青春的骄傲，让我们期待明天会更好" },
  { year: 1995, lyrics: "让我们的热情充满着青春的骄傲，让我们期待明天会更好" },
  { year: 2000, lyrics: "让我们的热情充满着青春的骄傲，让我们期待明天会更好" },
  // 添加更多年代的歌词...
];

function WritingAnimation({ year }) {
  const [randomLyric, setRandomLyric] = useState('');

  useEffect(() => {
    const songsFromYear = popularSongs.filter(song => 
      Math.abs(song.year - year) <= 5
    );
    if (songsFromYear.length > 0) {
      const randomSong = songsFromYear[Math.floor(Math.random() * songsFromYear.length)];
      setRandomLyric(randomSong.lyrics);
    }
  }, [year]);

  return (
    <div className="writing-animation">
      <div className="pencil"></div>
      <p className="random-lyric">{randomLyric}</p>
    </div>
  );
}

export default WritingAnimation;