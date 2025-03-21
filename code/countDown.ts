import { useRef, useState, usePrevious, useCallback, useEffect } from 'react';
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

interface CountDownProps {
  leftTime: number;
  ms: number;
  onEnd: () => void;
}

const useCountDown = ({ leftTime, ms = 1000, onEnd }: CountDownProps) => {
  const countdownTimer = useRef<number | null>();

  const startTimeRef = useRef<number>(performance.now());

  const nextTimeRef = useRef<number>(leftTime % ms);

  const totalTimeRef = useRef<number>(0);

  const [count, setCount] = useState(leftTime);

  const preLeftTime = usePrevious(leftTime);

  const clearTimer = useCallback(() => {
    if (countdownTimer.current) {
      clearTimeout(countdownTimer.current);
      countdownTimer.current = null;
    }
  }, []);

  const startCountDown = useCallback(
    (nt: number = 0) => {
      clearTimer();

      // 每次实际执行的时间
      const executionTime = performance.now() - startTimeRef.current; // 1.x

      totalTimeRef.current = totalTimeRef.current + executionTime;

      // 剩余时间减去应该执行的时间

      setCount((count) => {
        const nextCount =
          count - (Math.floor(executionTime / ms) || 1) * ms - nt;
        return nextCount <= 0 ? 0 : nextCount;
      });

      // 算出下一次的时间
      nextTimeRef.current = ms - (totalTimeRef.current % ms);

      // 重置初始时间
      startTimeRef.current = performance.now();

      countdownTimer.current = setTimeout(() => {
        requestAnimationFrame(() => startCountDown(0));
      }, nextTimeRef.current);
    },
    [ms]
  );

  useEffect(() => {
    if (preLeftTime !== leftTime && preLeftTime !== undefined) {
      clearTimer();
      setCount(() => leftTime);
      nextTimeRef.current = leftTime % ms;
      countdownTimer.current = setTimeout(() => {
        requestAnimationFrame(() => startCountDown(nextTimeRef.current));
      }, nextTimeRef.current);
    }
  }, [leftTime, ms]);

  useEffect(() => {
    countdownTimer.current = setTimeout(
      () => startCountDown(nextTimeRef.current),
      nextTimeRef.current
    );
    return () => {
      clearTimer();
    };
  }, []);

  useEffect(() => {
    if (count <= 0) {
      clearTimer();
      onEnd && onEnd();
    }
  }, [count]);

  const formatCount = parseMillisecond(count);

  return { formatCount, count };
};

export default useCountDown;
