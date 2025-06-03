"use client";
import {useState, useEffect} from 'react';

function ControlledExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < 10) { // Add a condition to control updates
      const timer = setTimeout(() => {
        setCount(prevCount => prevCount + 1); // Increment count after a delay
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [count]); // Dependency array includes 'count'

  return <p>Count: {count}</p>;
}

export default ControlledExample;