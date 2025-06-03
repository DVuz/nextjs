"use client";
import dynamic from "next/dynamic";
import {countClickded} from "@/app/useState/data";
import CountClicked from "@/app/useState/components/CountClicked";
import Lesson from "@/app/useState/components/Lesson";
import InputState from "@/app/useState/components/InputState";
import {inputState} from "@/app/useState/data";

import {todoList} from "@/app/useState/data";
import TodoList from "@/app/useState/components/TodoList";
import {likeOrDislike} from "@/app/useState/data";
import LikeOrDislike from "@/app/useState/components/LikeOrDislike";

const TimeAndClock = dynamic(() => import("@/app/useState/components/TimeAndClock"), {ssr: false});


export default function page() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">useState Example</h1>

      <div className="flex flex-col space-y-6 border-2 border-gray-200 p-4 rounded-lg shadow-sm bg-white">
        {/* Task description */}
        <Lesson
          taskNumber={1}
          taskDescription="Create a button that increments a count each time it is clicked. The count should be displayed above the button."
          demoComponent={<CountClicked/>}
          codeString={countClickded}
          fileName="CountClicked.tsx"
        />
        {/*task 2: input field that updates state*/}
        <Lesson
          taskNumber={2}
          taskDescription="Create an input field that updates a state variable with the current value of the input. Display the current value below the input field."
          demoComponent={<InputState/>}
          codeString={inputState}
          fileName="InputState.tsx"
        />

        {/*Task 3: Todo List*/}
        <Lesson
          taskNumber={3}
          taskDescription="Create a simple Todo List application where users can add, delete, and toggle the completion status of todos. Display the list of todos below the input field."
          demoComponent={<TodoList/>}
          codeString={todoList}
          fileName="TodoList.tsx"
        />
        {/*Task 4: like or dislike*/}
        <Lesson
          taskNumber={4}
          taskDescription="Create a Like or Dislike component where users can click on a button to like or dislike an item. Display the current state of like or dislike below the buttons."
          demoComponent={<LikeOrDislike/>}
          codeString={likeOrDislike}
          fileName="LikeOrDislike.tsx"
        />

        <TimeAndClock/>
      </div>
    </div>
  );
}