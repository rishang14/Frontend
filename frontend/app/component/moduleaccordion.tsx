"use client";

import { useMemo, useState } from "react";
import { ChevronRight, Play } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { baseurl } from "@/lib/utils";

interface ModuleAccordionProps {
  module: any;
  index: number; 
  courseId:number,
  handlecourseChange: React.Dispatch<React.SetStateAction<any>>;
}

export default function ModuleAccordion({
  module,
  index, 
  courseId,
  handlecourseChange,
}: ModuleAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [videomodule, setmodule] = useState(module); 

  const handlemoduleCheckedChange = async (e: boolean, moduleId: number) => {
    console.log(e, "val");
    try {
      const update = await axios.patch(
        `${baseurl}/courses/${courseId}/${moduleId}/progress`,
        {
          val: e,
        }
      );
      console.log(update, "update");
      handlecourseChange((course: any) => ({
        ...course,
        progress: update.data.progress,
        modules: course?.modules?.map((mod: any) =>
          mod.id === moduleId
            ? {
                ...mod,
                videos: mod.videos.map((vid: any) => ({
                  ...vid,
                  completed: e,
                })),
              }
            : mod
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  };  

  

  const handleProgress = async (e: any, id: number) => {
    console.log(e, "video check");
    // i can just map it in videomodule and then get the video make the progress to true and there will be onfucntion
    // which will just run it and its job is to check all the true ones and then some logic to calc progress
    const progress = await axios.patch(
      `${baseurl}/videos/${module.id}/${id}/complete`,
      {
        courseId: courseId,
        val: e,
      }
    );
    console.log(progress, "progres");
    handlecourseChange((course: any) => ({
    ...course,
    progress: progress.data.courseProgress,
  }));
  };  

   

  return (
    <div className="rounded-lg border border-border/50  bg-zinc-400 overflow-hidden hover:border-primary/30 transition-colors">
      <div className=" w-full flex justify-between p-2 items-center">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-3 text-left flex-1">
            <span className=" w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h4 className="font-medium text-foreground truncate">
                {module?.module_name}
              </h4>
              <p className="text-xs text-muted-foreground">
                {module.videos?.length} videos
              </p>
            </div>
          </div>

          <ChevronRight
            className={`w-4 h-4 text-muted-foreground  transition-transform duration-300 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>
        <div onClick={(e) => e.stopPropagation()}>
          <Checkbox
            onClick={(e) => e.stopPropagation()}
            defaultChecked={false}
            onCheckedChange={(e) => {
              handlemoduleCheckedChange(e as boolean, module?.id);
            }}
          />
        </div>
      </div>   

      

      {/* Expandable Videos List */}
      {isOpen && (
        <div className="border-t border-border/50 bg-background/50 divide-y divide-border/30 animate-in fade-in duration-300">
          {module.videos.map((video: any) => (
            <div
              key={video.sno}
              className="px-4 py-3 hover:bg-primary/5 transition-colors cursor-pointer group flex items-center gap-3"
            >
              <div className=" w-6 h-6 rounded flex items-center justify-center bg-secondary/50 group-hover:bg-primary/50 transition-colors">
                <Play className="w-3 h-3 text-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {video?.video_name}
                </p>
              </div>
              <span className=" text-xs text-muted-foreground">
                Video {video?.sno}
              </span>
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  defaultChecked={video.completed}
                  onClick={(e) => e.stopPropagation()}
                  onCheckedChange={(e) => handleProgress(e, video?.sno)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
