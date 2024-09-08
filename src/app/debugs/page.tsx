"use client";

import React, { useState } from "react";
import Counter from "@/components/counter/Counter";
import { Button } from "@/components/ui/button";

const page = () => {
  const [initialCount, setInitialCount] = useState(0);

  return (
    <div className="container">
        <Button className="bg-red-600" onClick={() => setInitialCount(prev => prev + 8)}>Change number</Button>
      <Counter initialCount={initialCount} />
    </div>
  );
};

export default page;
