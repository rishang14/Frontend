"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ModuleAccordion from "./moduleaccordion";
import ProgressBar from "./progress";

interface CourseCardProps {
  course: any;
  handlecourseChange: React.Dispatch<React.SetStateAction<any>>;
}

export default function CourseCard({
  course,
  handlecourseChange,
}: CourseCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

 
  return (
    <div className="group rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
      {/* Card Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 flex items-start justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex-1 text-left">
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-2xl font-bold text-foreground">
              {course.course_name}
            </h2>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {course.duration}
            </span>
          </div>

          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Progress</span>
              <span className="text-sm font-semibold text-primary">
                {course.progress}%
              </span>
            </div>
            <ProgressBar progress={course.progress} />
          </div>
        </div>

        {/* Expand Icon */}
        <div
          className={`ml-4  transition-transform duration-300 ${
            isExpanded ? "rotate-180" : ""
          }`}
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
        </div>
      </button>

      {/* Divider */}
      {isExpanded && <div className="h-px bg-border" />}

      {/* Expandable Modules Section */}
      {isExpanded && (
        <div className="px-6 py-5 bg-secondary/20 space-y-3 animate-in fade-in duration-300">
          <div className="mb-4 flex justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Modules ({course.modules.length})
            </h3>
          </div>

          <div className="space-y-2">
            {course.modules.map((module: any, index: any) => (
              <ModuleAccordion
                key={index}
                module={module}
                index={index}
                handlecourseChange={handlecourseChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
