'use client'

import Grid from '@mui/material/Grid2'
import Details from '@views/apps/academy/course-details/Details'
import Sidebar from '@views/apps/academy/course-details/Sidebar'
import { useParams } from 'next/navigation'

// Mock Data
const mockCourses = {
  1: {
    about: 'Aprende los fundamentos de Next.js desde cero.',
    skillLevel: 'Beginner',
    totalStudents: 1240,
    language: 'Español',
    isCaptions: true,
    totalLectures: 12,
    length: '3h 40m',
    description: [
      'Este curso cubre los conceptos básicos de Next.js.',
      'Aprenderás a trabajar con páginas, layouts y data fetching.'
    ],
    instructor: 'Miguel Ángel Durán',
    instructorPosition: 'Frontend Engineer',
    instructorAvatar: '/images/avatars/1.png',
    content: [
      {
        title: 'Introducción',
        topics: [
          { title: 'Bienvenida', time: '2.5', isCompleted: false },
          { title: '¿Qué es Next.js?', time: '5.2', isCompleted: false }
        ]
      },
      {
        title: 'Conceptos Básicos',
        topics: [
          { title: 'Pages y Routing', time: '7.3', isCompleted: false },
          { title: 'Layouts y Metadata', time: '6.8', isCompleted: false }
        ]
      }
    ]
  },
  2: {
    about: 'Curso avanzado de React con hooks y context.',
    skillLevel: 'Intermediate',
    totalStudents: 860,
    language: 'Español',
    isCaptions: false,
    totalLectures: 15,
    length: '5h 20m',
    description: [
      'Aprende a dominar hooks y el contexto global en React.',
      'Implementaremos un proyecto práctico paso a paso.'
    ],
    instructor: 'Juan Pérez',
    instructorPosition: 'Senior React Developer',
    instructorAvatar: '/images/avatars/2.png',
    content: [
      {
        title: 'Repaso Rápido',
        topics: [
          { title: 'Componentes y Props', time: '3.2', isCompleted: false },
          { title: 'Estado y Eventos', time: '6.5', isCompleted: false }
        ]
      },
      {
        title: 'Avanzado',
        topics: [
          { title: 'useContext y useReducer', time: '10.2', isCompleted: false },
          { title: 'Custom Hooks', time: '8.7', isCompleted: false }
        ]
      }
    ]
  }
}

export default function CourseDetailsPage() {
  const params = useParams()
  const { id } = params
  const course = mockCourses[id]

  if (!course) {
    return <p className="text-center text-red-500">Curso no encontrado</p>
  }

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12, md: 8 }}>
        <Details data={course} />
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Sidebar content={course.content} />
      </Grid>
    </Grid>
  )
}
