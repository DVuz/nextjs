export const countClickded = `"use client";
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
}`;

export const inputState = `"use client"
import { useState } from "react";
import Input from "@/components/ui/input";
import {useEffect} from "react";

export default function InputState() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col space-y-4">
      <Input
        type="text"
        placeholder="Type something..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="w-full"
      />
      <p className="text-sm text-gray-600">Current input value: {inputValue}</p>
    </div>
  );
}`
export const todoList = `"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";


export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, {id: Date.now(), text: inputValue, completed: false}]);
      setInputValue("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    ));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h1 className="text-center text-2xl text-neutral-900 mb-4">Todo List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a new todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <Button onClick={handleAddTodo} className="bg-blue-500">
          Add
        </Button>
      </div>

      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center justify-between p-3 bg-white border rounded shadow-sm">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleTodo(todo.id)}
                className="h-4 w-4"
              />
              <span className={todo.completed ? "line-through text-gray-400" : ""}>
                {todo.text}
              </span>
            </div>
            <Button
              onClick={() => handleDeleteTodo(todo.id)}
              variant="destructive"
              size="sm"
              className="bg-red-500"
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No todos yet. Add some!</p>
      )}
    </div>
  );
}
`

export const likeOrDislike = `"use client";
import React, {useState} from "react";
import {ThumbsUp, ThumbsDown} from "lucide-react";

export default function LikeOrDislike() {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);

  const handleLike = () => {
    setLike(!like);
    if (dislike) {
      setDislike(false);
    }
  }
  const handleDislike = () => {
    setDislike(!dislike);
    if (like) {
      setLike(false);
    }
  }
  return(
    <div>
      <h1 className="text-center text-2xl text-neutral-900 mb-4">Like or Dislike</h1>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleLike}
          className={\`p-3 rounded-full \${like ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}\`}
        >
          <ThumbsUp size={24} />
        </button>
        <button
          onClick={handleDislike}
          className={\`p-3 rounded-full \${dislike ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}\`}
        >
          <ThumbsDown size={24} />
        </button>
      </div>
      <div className="text-center mt-4">
        {like && <p>You liked this!</p>}
        {dislike && <p>You disliked this!</p>}
      </div>
    </div>
  )
}`;