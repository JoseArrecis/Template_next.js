'use client'

import Grid from '@mui/material/Grid2'
import Details from '@views/apps/academy/course-details/Details'
import Sidebar from '@views/apps/academy/course-details/Sidebar'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

// Mock Data con IDs consistentes
const mockCourses = [
  {
    id: 1,
    about: 'Aprende los fundamentos de Next.js desde cero.', 
    image: '/images/courses/nextjs.png',
    skillLevel: 'Beginner',
    totalStudents: 1240,
    language: 'Español',
    isCaptions: true,
    totalLectures: 12,
    length: '1h 42m 28s',
    description: [
      'Este curso cubre los conceptos básicos de Next.js.',
      'Aprenderás a trabajar con páginas, layouts y data fetching.'
    ],
    instructor: 'Miguel Ángel Durán',
    videoUrl: 'https://www.youtube.com/watch?v=jMy4pVZMyLM',
    instructorPosition: 'Frontend Engineer',
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
  {
    id: 2,
    about: 'Curso avanzado de React con hooks y context.',
    image: '/images/courses/react.png',
    skillLevel: 'Intermediate',
    totalStudents: 860,
    language: 'Español',
    isCaptions: false,
    totalLectures: 15,
    length: '43m 46s',
    description: [
      'Aprende a dominar hooks y el contexto global en React.',
      'Implementaremos un proyecto práctico paso a paso.'
    ],
    instructor: 'Miguel Ángel Durán',
    instructorPosition: 'Senior React Developer',
    videoUrl: 'https://www.youtube.com/watch?v=x-LcbVw99o8',
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
  },
  {
    id: 3,
    about: 'Fundamentos de diseño web con HTML y CSS.',
    image: '/images/courses/html-css.png',
    skillLevel: 'Beginner',
    totalStudents: 540,
    language: 'Español',
    isCaptions: true,
    totalLectures: 10,
    length: '1h 00m 42s',
    description: [
      'Aprende a crear páginas web atractivas y responsivas.',
      'Cubriendo desde lo básico de HTML hasta técnicas avanzadas de CSS.'
    ],
    instructor: 'Traversy Media',
    instructorPosition: 'Web Designer',
    videoUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
    content: [
      {
        title: 'HTML Básico',
        topics: [
          { title: 'Estructura HTML', time: '4.0', isCompleted: false },
          { title: 'Elementos Comunes', time: '5.5', isCompleted: false }
        ]
      },
      {
        title: 'CSS Básico',
        topics: [
          { title: 'Selectores y Propiedades', time: '7.1', isCompleted: false },
          { title: 'Box Model y Flexbox', time: '6.3', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 4,
    about: 'Curso completo de desarrollo web full-stack',
    image: '/images/courses/fullStack.png',
    skillLevel: 'Advanced',
    totalStudents: 320,
    language: 'Ingles',
    isCaptions: true,
    totalLectures: 20,
    length: '46m 58s',
    description: [
      'Aprende a construir aplicaiciones web completas con frontend y backend.',
      'Usando tecnologías modernas como React, Node.js y bases de datos NoSQL.'
    ],
    instructor: 'Free Coud Camp',
    instructorPosition: 'Full-stack Developer',
    videoUrl: 'https://www.youtube.com/watch?v=Z1RJmh_OqeA',
    content: [
      {
        title: 'Frontend',
        topics: [
          { title: 'React Native', time: '12.0', isCompleted: false },
          { title: 'State Management', time: '9.5', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 5,
    about: 'Introduccion a la inteligencia artificial y machine learning.',
    image: '/images/courses/ai-ml.png',
    skillLevel: 'Beginner',
    totalStudents: 300,
    language: 'Español',
    isCaptions: false,
    totalLectures: 8,
    length: '12m 45s',
    description: [
      'Descubre los conceptos básicos de la inteligencia artificial.',
      'y cómo aplicar algoritmos de machine learning en proyectos reales.'
    ],
    instructor: 'Josh Starmer',
    instructorPosition: 'Data Scientist',
    videoUrl: 'https://www.youtube.com/watch?v=Gv9_4yMHFhI',
    content: [
      {
        title: 'Introducción',
        topics: [
          { title: '¿Qué es IA?', time: '3.8', isCompleted: false },
          { title: 'Aplicaciones Comunes', time: '4.6', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 6,
    about: 'Curso de fundamentos de marketing digital.',
    image: '/images/courses/marketing.png',
    skillLevel: 'Beginner',
    totalStudents: 150,
    language: 'Español',
    isCaptions: true,
    totalLectures: 6,
    length: '29m 2s',
    description: [
      'Aprender las estrategias clave del marketing digital.',
      'Incluyendo SEO, SEM, email marketing y redes sociales.'
    ],
    instructor: 'Felipe Vergara',
    instructorPosition: 'Digital Marketing Specialist',
    videoUrl: 'https://www.youtube.com/watch?v=Tdm5tMY2-7I',
    content: [
      {
        title: 'Fundamentos',
        topics: [
          { title: 'SEO Básico', time: '5.0', isCompleted: false },
          { title: 'Redes Sociales', time: '4.3', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 7,
    about: 'Curso de introducción a la ciberseguridad.',
    image: '/images/courses/cybersecurity.png',
    skillLevel: 'Intermediate',
    totalStudents: 80,
    language: 'Español',
    isCaptions: false,
    totalLectures: 9,
    length: '1h 3m 36s',
    description: [
      'Aprende los conceptos basicos de la ciberseguridad.',
      'y como proteger sistemas y datos contra amanazas comunes.'
    ],
    instructor: 'Hixec',
    instructorPosition: 'Cybersecurity Analyst',
    videoUrl: 'https://www.youtube.com/watch?v=gzES0MuWqHE',
    content: [
      {
        title: 'Conceptos Básicos',
        topics: [
          { title: 'Tipos de Amenazas', time: '6.1', isCompleted: false },
          { title: 'Buenas Prácticas', time: '5.4', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 8,
    about: 'Curso de introducción a la nube con AWS.',
    image: '/images/courses/aws.png',
    skillLevel: 'Beginner',
    totalStudents: 60,
    language: 'Español',
    isCaptions: true,
    totalLectures: 7,
    length: '2h 7s',
    description: [
      'Aprende los conceptos básicos de la computación en la nube.',
      'y cómo utilizar los servicios principales de AWS.'
    ],
    instructor: 'Miguel Ángel Durán',
    instructorPosition: 'Cloud Engineer',
    videoUrl: 'https://www.youtube.com/watch?v=zQyrhjEAqLs',
    content: [
      {
        title: 'Introducción a la Nube',
        topics: [
          { title: '¿Qué es la Nube?', time: '4.7', isCompleted: false },
          { title: 'Servicios Clave de AWS', time: '6.0', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 9,
    about: 'Curso de fundamentos de desarrollo móvil con React Native.',
    image: '/images/courses/react-native.png',
    skillLevel: 'Intermediate',
    totalStudents: 45,
    language: 'Ingles',
    isCaptions: false,
    totalLectures: 11,
    length: '51m 27s',
    description: [
      'Aprende a construir aplicaciones móviles multiplataforma con React Native.',
      'Cubriendo desde la configuración del entorno hasta la publicación en tiendas de apps.'
    ],
    instructor: 'Traversy Media',
    instructorPosition: 'Mobile Developer',
    videoUrl: 'https://www.youtube.com/watch?v=Hf4MJH0jDb4',
    content: [
      {
        title: 'Configuración Inicial',
        topics: [
          { title: 'Entorno de Desarrollo', time: '5.6', isCompleted: false },
          { title: 'Primer App con React Native', time: '7.8', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 10,
    about: 'Curso de introducción al diseño UX/UI.',
    image: '/images/courses/ux-ui.png',
    skillLevel: 'Beginner',
    totalStudents: 30,
    language: 'Español',
    isCaptions: true,
    totalLectures: 5,
    length: '39m 20s',
    description: [
      'Aprende los principios básicos del diseño UX/UI.',
      'y cómo crear interfaces atractivas y funcionales.'
    ],
    instructor: 'Dalto',
    instructorPosition: 'UX/UI Designer',
    videoUrl: 'https://www.youtube.com/watch?v=ABggYX2jOsM',
    content: [
      {
        title: 'Fundamentos de UX/UI',
        topics: [
          { title: 'Principios de Diseño', time: '4.1', isCompleted: false },
          { title: 'Herramientas Comunes', time: '3.9', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 11,
    about: 'Curso de introducción a la programación con Python.',
    image: '/images/courses/python.png',
    skillLevel: 'Beginner',
    totalStudents: 20,
    language: 'Ingles',
    isCaptions: false,
    totalLectures: 8,
    length: '4h 26m 52s',
    description: [
      'Aprende los conceptos básicos de la programación usando Python.',
      'Cubriendo desde variables y tipos de datos hasta estructuras de control y funciones.'
    ],
    instructor: 'Free Code Camp',
    instructorPosition: 'Software Developer',
    videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    content: [
      {
        title: 'Conceptos Básicos de Python',
        topics: [
          { title: 'Variables y Tipos de Datos', time: '6.4', isCompleted: false },
          { title: 'Estructuras de Control', time: '7.9', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 12,
    about: 'Curso de introducción a la analitica de datos con Excel.',
    image: '/images/courses/excel.png',
    skillLevel: 'Beginner',
    totalStudents: 10,
    language: 'Español',
    isCaptions: true,
    totalLectures: 4,
    length: '14m 48s',
    description: [
      'Aprende a analizar datos de manera efectiva usando Microsoft Excel.',
      'Cubriendo desde funciones básicas hasta técnicas avanzadas de análisis.'
    ],
    instructor: 'Jon',
    instructorPosition: 'Data Analyst',
    videoUrl: 'https://www.youtube.com/watch?v=9NUjHBNWe9M',
    content: [
      {
        title: 'Fundamentos de Excel',
        topics: [
          { title: 'Funciones Básicas', time: '5.3', isCompleted: false },
          { title: 'Análisis de Datos', time: '6.7', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 13,
    about: 'Curso de introdcción a la gestión de proyectos en Agile.',
    image: '/images/courses/agile.png',
    skillLevel: 'Intermediate',
    totalStudents: 5,
    language: 'Español',
    isCaptions: false,
    totalLectures: 6,
    length: '11m 55s',
    description: [
      'Aprende los principios y practicas de la gestión de proyectos Agile.',
      'Incluyendo Scrum, Kanban y herramientas populares.'
    ],
    instructor: 'Mark Shead',
    instructorPosition: 'Project Manager',
    videoUrl: 'https://www.youtube.com/watch?v=Z9QbYZh1YXY',
    content: [
      {
        title: 'Introducción a Agile',
        topics: [
          { title: 'Principios de Agile', time: '4.9', isCompleted: false },
          { title: 'Metodologías Comunes', time: '5.8', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 14,
    about: 'Curso de fundamentos de blockchain y criptomonedas.',
    image: '/images/courses/blockchain.png',
    skillLevel: 'Beginner',
    totalStudents: 25,
    language: 'Español',
    isCaptions: true,
    totalLectures: 7,
    length: '5m 59s',
    description: [
      'Aprende los conceptos basicos de blockchain y como funcionan las criptomonedas.',
      'Incluyendo Bitcoin, Ethereum y aplicaciones descestralizadas.'
    ],
    instructor: 'Simply Explained',
    instructorPosition: 'Blockchain Developer',
    videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
    content: [
      {
        title: 'Conceptos Básicos',
        topics: [
          { title: '¿Qué es Blockchain?', time: '6.6', isCompleted: false },
          { title: 'Criptomonedas Populares', time: '7.4', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 15,
    about: 'Curso de introducción a la realidad aumentada y virtual.',
    image: '/images/courses/ar-vr.png',
    skillLevel: 'Intermediate',
    totalStudents: 8,
    language: 'Español',
    isCaptions: false,
    totalLectures: 9,
    length: '5m 42s',
    description: [
      'Aprende los conceptos básicos de la realidad aumentada (AR) y la realidad virtual (VR).',
      'y cómo desarrollar aplicaciones inmersivas.'
    ],
    instructor: 'Felipe Vergara',
    instructorPosition: 'AR/VR Developer',
    videoUrl: 'https://www.youtube.com/watch?v=Tdm5tMY2-7I&t=1s',
    content: [
      {
        title: 'Introducción a AR/VR',
        topics: [
          { title: 'Conceptos Básicos', time: '8.3', isCompleted: false },
          { title: 'Herramientas y Plataformas', time: '9.7', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 16,
    about: 'Curso de fundamentos de DevOps y CI/CD.',
    image: '/images/courses/devops.png',
    skillLevel: 'Intermediate',
    totalStudents: 12,
    language: 'Español',
    isCaptions: true,
    totalLectures: 10,
    length: '7m 22s',
    description: [
      'Aprende los principios y prácticas de DevOps.',
      'Incluyendo integración continua (CI) y entrega continua (CD).'
    ],
    instructor: 'Fazt Code',
    instructorPosition: 'DevOps Engineer',
    videoUrl: 'https://www.youtube.com/watch?v=xm1psJEFFIY',
    content: [
      {
        title: 'Fundamentos de DevOps',
        topics: [
          { title: 'Cultura DevOps', time: '7.5', isCompleted: false },
          { title: 'Herramientas', time: '8.8', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 17,
    about: 'Curso de introducción a la automatización con RPA.',
    image: '/images/courses/rpa.png',
    skillLevel: 'Beginner',
    totalStudents: 18, 
    language: 'Ingles',
    isCaptions: false,
    totalLectures: 5,
    length: '10h 30m 3s',
    description: [
      'Aprende los conceptos basicos de la automatización robótica de procecos (RPA).',
      'y como implementar soluciones RPA.'
    ],
    instructor: 'edureka!',
    instructorPosition: 'RPA Developer',
    videoUrl: 'https://www.youtube.com/watch?v=MBl-3Yb30FA',
    content: [
      {
        title: 'Introducción a RPA',
        topics: [
          { title: '¿Qué es RPA?', time: '6.2', isCompleted: false },
          { title: 'Casos de Uso', time: '5.1', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 18,
    about: 'Curso de fundamentos de Internet de las Cosas (IoT).',
    image: '/images/courses/iot.png',
    skillLevel: 'Beginner',
    totalStudents: 68,
    language: '',
    isCaptions: true,
    totalLectures: 6,
    length: '15h 4s',
    description: [
      'Aprende los conceptos basicos de Internet de las cosas (IoT).',
      'y como desarrollar soluciones IoT.'
    ],
    instructor: 'Freddy Vega',
    instructorPosition: 'IoT Developer',
    videoUrl: 'https://www.youtube.com/watch?v=x6cTpJozRd0',
    content: [
      {
        title: 'Conceptos Básicos de IoT',
        topics: [
          { title: 'Arquitectura IoT', time: '9.1', isCompleted: false },
          { title: 'Plataformas y Protocolos', time: '8.4', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 19,
    about: 'Virtalización en VirtualBox',
    image: '/images/courses/virtualbox.png',
    skillLevel: 'Beginner',
    totalStudents: 34,
    language: 'Español',
    isCaptions: true,
    totalLectures: 5,
    length: '1h 50m 42s',
    description: [
      'Aprende a crear y gestionar máquinas virtuales usando VirtualBox.',
      'Cubriendo desde la instalación hasta la configuración avanzada.'
    ],
    instructor: 'Hixec',
    instructorPosition: 'System Administrator',
    videoUrl: 'https://www.youtube.com/watch?v=CLdHQPyHeN0',
    content: [
      {
        title: 'Introducción a VirtualBox',
        topics: [
          { title: 'Instalación y Configuración', time: '4.4', isCompleted: false },
          { title: 'Gestión de Máquinas Virtuales', time: '5.6', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 20,
    about: 'Curso de la introducción a la programación JavaScript.',
    image: '/images/courses/javaScript.png',
    skillLevel: 'Beginner',
    totalStudents: 28,
    language: 'Ingles',
    isCaptions: true,
    totalLectures: 7,
    length: '45m 16s',
    description: [
      'Aprende los conceptos basicos de la programación usando JavaScript.',
      'Cubriendo desde variables y tipos de datos hasta funciones y eventos.'
    ],
    instructor: 'Mosh Hamedani',
    instructorPosition: 'Frontend Developer',
    videoUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
    content: [
      {
        title: 'Conceptos Básicos de JavaScript',
        topics: [
          { title: 'Variables y Tipos de Datos', time: '5.7', isCompleted: false },
          { title: 'Funciones y Eventos', time: '6.9', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 21,
    about: 'Curso de introducción a la programación con Ruby.',
    image: '/images/courses/ruby.png',
    skillLevel: 'Beginner',
    totalStudents: 22,
    language: 'Ingles',
    isCaptions: false,
    totalLectures: 6,
    length: '4h 2m 51s',
    description: [
      'Aprende los conceptos básicos de la programación usando Ruby.',
      'Cubriendo desde variables y tipos de datos hasta estructuras de control y métodos.'
    ],
    instructor: 'Free Code Camp',
    instructorPosition: 'Backend Developer',
    videoUrl: 'https://www.youtube.com/watch?v=t_ispmWmdjY',
    content: [
      {
        title: 'Conceptos Básicos de Ruby',
        topics: [
          { title: 'Variables y Tipos de Datos', time: '6.1', isCompleted: false },
          { title: 'Estructuras de Control', time: '7.3', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 22,
    about: 'Curso de introducción a la programación con Angular.',
    image: '/images/courses/angular.png',
    skillLevel: 'Intermediate',
    totalStudents: 176,
    language: 'Español',
    isCaptions: true,
    totalLectures: 54,
    length: '1h 23m 34s',
    description: [
      'Aprende los conceptos basicos y avanzados de la programación usando Angular.',
      'Cubriendo desde componentes y servicios hasta routing y formularios.'
    ],
    instructor: 'Miguel Ángel Durán',
    instructorPosition: 'Frontend Developer',
    videoUrl: 'https://www.youtube.com/watch?v=f7unUpshmpA',
    content: [
      {
        title: 'Conceptos Básicos de Angular',
        topics: [
          { title: 'Componentes y Templates', time: '8.2', isCompleted: false },
          { title: 'Servicios e Inyección de Dependencias', time: '9.4', isCompleted: false }
        ]
      }
    ]
  },
  {
    id: 23,
    about: 'Curso de introducción a la programación con Go.',
    image: '/images/courses/go.png',
    skillLevel: 'Intermediate',
    totalStudents: 98,
    language: 'Español',
    isCaptions: false,
    totalLectures: 45,
    length: '1h 2m 13s',
    description: [
      'Aprende los conceptos basicos y avanzados de la programación usando Go.',
      'Cubriendo desde componentes y servicios hasta routing y formularios.'
    ],
    instructor: 'Oscar Turquet',
    instructorPosition: 'Frontend Developer',
    videoUrl: 'https://www.youtube.com/watch?v=UHvpi0IB1Yk',
    content: [
      {
        title: 'Conceptos básicos de Go.',
        topics: [
          { title: 'Arreglos', time: '8.4', isCompleted: true },
          { title: 'Interfaces, slices y mapas', time: '14.5', isCompleted: true }
        ]
      }
    ]
  },
  {
    id: 24,
    about: 'Curso de MongoDB para desarrolladores',
    image: '/images/courses/mongodb.png',
    skillLevel: 'Beginner',
    totalStudents: 100,
    language: 'Ingles',
    isCaptions: true,
    totalLectures: 87,
    length: '29m 59s',
    description: [
      'Aprende los conceptos desde el mas basico al mas avanzado utilizando MongoDB',
      'Cubriendo desde documentos hasta agregaciones'
    ],
    instructor: 'Web Dev Simplified',
    instructorPosition: 'BakcEnd Developer',
    videoUrl: 'https://www.youtube.com/watch?v=ofme2o29ngU',
    content: [
      {
        title: 'Conceptos básicos de MongoBD',
        topics: [
          { title: 'Documentación', time: '9.5', isCompleted: false },
          { title: 'Colecciones - Agregaciones', time: '15.9', isCompleted: false }
        ]
      }
    ]
  }
]

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
