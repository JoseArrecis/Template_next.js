'use client'

import Grid from '@mui/material/Grid2'
import Details from '@views/apps/academy/course-details/Details'
import Sidebar from '@views/apps/academy/course-details/Sidebar'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { mockCourses } from './mockCourse'

// Mock Data con IDs consistentes


export default function CourseDetailsPage() {
  const router = useRouter()
  const params = useParams()
  const idNum = parseInt(params.id, 10)
  const course = mockCourses.find(c => c.id === idNum)

  const [isClicking, setIsClicking] = useState()

  if (!course) {
    return <p className="text-center text-red-500">Curso no encontrado</p>
  }

  const handleGoToCourses = () => {
    router.push('/apps/academy/my-courses')
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Details key={idNum} data={course} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Sidebar content={course.content} />
      </Grid>

      {/* Boton para regresar a mis cursos */}
      <div>
        <button
          onClick={handleGoToCourses}
          onMouseDown={() => setIsClicking(true)}
          onMouseUp={() => setIsClicking(false)}
          className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 
          ${isClicking ? 'cursor-grabbing' : 'cursor-pointer'}`}
        >
          My courses
        </button>
      </div>
    </Grid>
  )
}
