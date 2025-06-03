import RawCode from "@/app/useState/components/RawCode";
import {ReactNode} from "react";

interface LessonProps {
  taskNumber?: number;
  taskDescription: string;
  demoComponent: ReactNode;
  codeString: string;
  fileName: string;
  demoTitle?: string;
  implementationTitle?: string;
}

export default function Lesson({
                                 taskNumber = 1,
                                 taskDescription,
                                 demoComponent,
                                 codeString,
                                 fileName,
                                 demoTitle = "Live Demo",
                                 implementationTitle = "Implementation"
                               }: LessonProps) {
  return (
    <>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <p>
          <span className="font-semibold">Task {taskNumber}:</span> {taskDescription}
        </p>
      </div>

      {/* Live demo */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold mb-4">{demoTitle}</h2>
        <div className="flex justify-center">
          {demoComponent}
        </div>
      </div>

      {/* Code display */}
      <div>
        <h2 className="text-lg font-semibold mb-2">{implementationTitle}</h2>
        <RawCode code={codeString} fileName={fileName}/>
      </div>
    </>
  );
}