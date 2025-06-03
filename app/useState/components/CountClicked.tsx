"use client";
import {useState} from "react";
import { Button } from "@/components/ui/button"


export default function CountClicked() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Count: {count}</h1>
      <Button onClick={() => setCount(count + 1)} className="bg-green-600 text-white">
        Click Me
      </Button>
    </div>
  )
}