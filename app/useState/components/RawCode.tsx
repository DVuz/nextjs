"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy, ChevronDown, ChevronUp } from "lucide-react";

interface RawCodeProps {
  code: string;
  fileName?: string;
}

export default function RawCode({ code, fileName = "Component.tsx" }: RawCodeProps) {
  const [isShown, setIsShown] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6 mb-8 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Header - Always visible */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="ml-3 text-sm font-medium text-slate-700 dark:text-slate-300">
            {fileName}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {isShown && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              <span className="text-xs">
                {copied ? "Copied" : "Copy"}
              </span>
            </Button>
          )}

          <Button
            size="sm"
            variant="ghost"
            className="h-8 px-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
            onClick={() => setIsShown(!isShown)}
          >
            {isShown ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                <span className="text-xs">Hide</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                <span className="text-xs">Show</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Code block - Conditionally rendered */}
      {isShown && (
        <div className="relative bg-slate-50 dark:bg-slate-900">
          <pre className="p-4 overflow-x-auto text-sm font-mono text-slate-800 dark:text-slate-200 max-h-[500px]">
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}