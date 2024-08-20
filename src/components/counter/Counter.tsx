"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";

interface CounterProps {
  initialCount: number;
}

const Counter = ({ initialCount }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const reset = () => {
    setCount(initialCount);
  };

  return (
    <div className="flex gap-10 p-10">
      <p>Current count: {count}</p>
      <Button onClick={increment}>Increment</Button>
      <Button onClick={decrement}>Decrement</Button>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
};

export default Counter;
