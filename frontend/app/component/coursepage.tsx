"use client"

import { useState, useMemo, useEffect } from "react"
import CourseCard from "./coursecard"
import DurationFilter from "./durationfilter"
import axios from "axios"
import { baseurl } from "@/lib/utils"

const DURATION_OPTIONS = [
  { value: "1 Month", label: "1 Month" },
  { value: "2 Months", label: "2 Months" },
]

export default function CoursesPage() {
  const [selectedDurations, setSelectedDurations] = useState<string[]>([])
  const [courses,setCourses]=useState<any[]>([]);  
   


  useEffect(()=>{ 
   async function getcourses(){
    try {
       const {data}=await axios.get(`${baseurl}/courses`);  
       console.log(data,"data"); 
       setCourses(data) 
    } catch (error) {
      console.log(error)
    }
  }
   getcourses()
   
  },[])



  const filteredCourses = useMemo(() => {
    if (selectedDurations.length === 0) {
      return courses
    }
    return [...courses].filter((course) => selectedDurations.includes(course?.duration))
  }, [selectedDurations,courses])

  return (
    <div className="min-h-screen  from-background via-background to-secondary/5">
      {/* Header */}
      <div className="border-b border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Learning Courses</h1>
          <p className="text-muted-foreground">Expand your skills with our comprehensive course catalog</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-64">
            <div className="sticky top-8">
              <DurationFilter
                options={DURATION_OPTIONS}
                selectedDurations={selectedDurations}
                onDurationChange={setSelectedDurations}
              />
            </div>
          </aside>

          {/* Main Content - Courses Grid */}
          <main className="flex-1">
            {filteredCourses.length > 0 ? (
              <div className="grid gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course}  handlecourseChange={setCourses}/>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="mb-4 text-5xl">📚</div>
                <h3 className="text-lg font-semibold text-foreground mb-2">No courses found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to see available courses</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
