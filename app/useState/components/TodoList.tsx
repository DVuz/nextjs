"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

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