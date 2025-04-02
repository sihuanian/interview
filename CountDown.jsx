import React, { useState, useEffect, useRef } from 'react';

// 样式对象
const styles = {
  container: {
    textAlign: 'center',
    padding: '2rem',
    backgroundColor: '#f0f0f0',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  time: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#333',
    margin: '1rem 0',
  },
  controls: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  startButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  pauseButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  resetButton: {
    padding: '0.8rem 2rem',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [startTime, setStartTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(60);
  const requestRef = useRef();
  const isActive = useRef(false);

  // 使用 requestAnimationFrame + 时间差值计算
  const animate = (timestamp) => {
    if (!startTime) {
      setStartTime(timestamp);
    }
    
    const elapsed = Math.floor((timestamp - startTime) / 1000);
    const newTime = remainingTime - elapsed;
    
    if (newTime <= 0) {
      setTimeLeft(0);
      isActive.current = false;
      return;
    }

    if (newTime !== timeLeft) {
      setTimeLeft(newTime);
    }
    
    if (isActive.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    if (isActive.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isActive.current]);

  const toggleTimer = () => {
    if (!isActive.current) {
      setRemainingTime(timeLeft);
      setStartTime(null);
    }
    isActive.current = !isActive.current;
    
    if (isActive.current) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  const resetTimer = () => {
    isActive.current = false;
    setTimeLeft(60);
    setRemainingTime(60);
    setStartTime(null);
    cancelAnimationFrame(requestRef.current);
  };

  const formatTime = (seconds) => {
    return seconds.toString().padStart(2, '0');
  };

  return (
    <div style={styles.container}>
      <div style={styles.time}>{formatTime(timeLeft)}</div>
      <div style={styles.controls}>
        <button 
          style={isActive.current ? styles.pauseButton : styles.startButton}
          onClick={toggleTimer}
        >
          {isActive.current ? 'Pause' : 'Start'}
        </button>
        <button style={styles.resetButton} onClick={resetTimer}>
          Reset
        </button>
      </div>
    </div>
  );
};
