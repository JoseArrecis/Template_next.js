export const db = {
  courses: [
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
      instructorPosition: 'Frontend Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=jMy4pVZMyLM',
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
      language: 'Español',
      isCaptions: true,
      totalLectures: 20,
      length: '46m 58s',
      description: [
        'Aprende a construir aplicaciones web completas con frontend y backend.',
        'Usando tecnologías modernas como React, Node.js y bases de datos NoSQL.'
      ],
      instructor: 'Free Code Camp',
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
      about: 'Introducción a la inteligencia artificial y machine learning.',
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
        'Aprende las estrategias clave del marketing digital.',
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
        'Aprende los conceptos básicos de la ciberseguridad.',
        'y cómo proteger sistemas y datos contra amenazas comunes.'
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
      language: 'Español',
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
    // ================== CURSOS 11 AL 24 ==================
    {
      id: 11,
      about: 'Curso de Python para principiantes.',
      image: '/images/courses/python.png',
      skillLevel: 'Beginner',
      totalStudents: 900,
      language: 'Español',
      isCaptions: true,
      totalLectures: 14,
      length: '2h 10m',
      description: [
        'Aprende Python desde cero.',
        'Cubriendo sintaxis, estructuras de datos y funciones.'
      ],
      instructor: 'Juan Pérez',
      instructorPosition: 'Python Developer',
      videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
      content: [
        {
          title: 'Fundamentos',
          topics: [
            { title: 'Variables y Tipos', time: '5.0', isCompleted: false },
            { title: 'Condicionales', time: '6.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 12,
      about: 'JavaScript moderno y ES6.',
      image: '/images/courses/javascript.png',
      skillLevel: 'Intermediate',
      totalStudents: 1100,
      language: 'Español',
      isCaptions: true,
      totalLectures: 16,
      length: '3h 5m',
      description: [
        'Domina JavaScript moderno.',
        'Aprende ES6+, promesas, async/await y más.'
      ],
      instructor: 'Carlos López',
      instructorPosition: 'Front-end Developer',
      videoUrl: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
      content: [
        {
          title: 'ES6',
          topics: [
            { title: 'Let y Const', time: '4.5', isCompleted: false },
            { title: 'Arrow Functions', time: '5.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 13,
      about: 'Node.js y Express: Backend para principiantes.',
      image: '/images/courses/nodejs.png',
      skillLevel: 'Beginner',
      totalStudents: 500,
      language: 'Español',
      isCaptions: false,
      totalLectures: 12,
      length: '2h 15m',
      description: [
        'Aprende a crear servidores y APIs con Node.js y Express.'
      ],
      instructor: 'Laura Martínez',
      instructorPosition: 'Backend Developer',
      videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE',
      content: [
        {
          title: 'Node.js',
          topics: [
            { title: 'Instalación', time: '3.0', isCompleted: false },
            { title: 'Rutas y Middleware', time: '5.5', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 14,
      about: 'Bases de datos con MongoDB.',
      image: '/images/courses/mongodb.png',
      skillLevel: 'Intermediate',
      totalStudents: 600,
      language: 'Español',
      isCaptions: true,
      totalLectures: 10,
      length: '1h 50m',
      description: [
        'Aprende MongoDB y cómo integrarlo en aplicaciones web.'
      ],
      instructor: 'Ana Gómez',
      instructorPosition: 'Database Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=-56x56UppqQ',
      content: [
        {
          title: 'MongoDB',
          topics: [
            { title: 'CRUD', time: '5.0', isCompleted: false },
            { title: 'Consultas Avanzadas', time: '6.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 15,
      about: 'TypeScript: Tipado fuerte para JavaScript.',
      image: '/images/courses/typescript.png',
      skillLevel: 'Intermediate',
      totalStudents: 400,
      language: 'Español',
      isCaptions: true,
      totalLectures: 8,
      length: '1h 30m',
      description: [
        'Aprende a usar TypeScript para código más seguro y legible.'
      ],
      instructor: 'Miguel Torres',
      instructorPosition: 'Software Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
      content: [
        {
          title: 'Fundamentos',
          topics: [
            { title: 'Tipos', time: '4.0', isCompleted: false },
            { title: 'Interfaces', time: '5.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 16,
      about: 'React avanzado con Redux y Context API.',
      image: '/images/courses/react-redux.png',
      skillLevel: 'Advanced',
      totalStudents: 350,
      language: 'Español',
      isCaptions: false,
      totalLectures: 14,
      length: '2h 40m',
      description: [
        'Aprende a manejar estados complejos con Redux y Context API.'
      ],
      instructor: 'Carlos Rivera',
      instructorPosition: 'Senior React Developer',
      videoUrl: 'https://www.youtube.com/watch?v=CVpUuw9XSjY',
      content: [
        {
          title: 'Redux',
          topics: [
            { title: 'Store y Reducers', time: '5.5', isCompleted: false },
            { title: 'Acciones y Dispatch', time: '6.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 17,
      about: 'Docker y contenedores para principiantes.',
      image: '/images/courses/docker.png',
      skillLevel: 'Beginner',
      totalStudents: 220,
      language: 'Español',
      isCaptions: true,
      totalLectures: 9,
      length: '1h 20m',
      description: [
        'Aprende a crear contenedores y manejar aplicaciones en Docker.'
      ],
      instructor: 'Laura Fernández',
      instructorPosition: 'DevOps Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=fqMOX6JJhGo',
      content: [
        {
          title: 'Docker',
          topics: [
            { title: 'Instalación', time: '4.0', isCompleted: false },
            { title: 'Contenedores Básicos', time: '5.5', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 18,
      about: 'Kubernetes para desarrolladores.',
      image: '/images/courses/kubernetes.png',
      skillLevel: 'Advanced',
      totalStudents: 180,
      language: 'Español',
      isCaptions: false,
      totalLectures: 12,
      length: '2h 5m',
      description: [
        'Aprende a desplegar y escalar aplicaciones con Kubernetes.'
      ],
      instructor: 'Diego Ruiz',
      instructorPosition: 'DevOps Specialist',
      videoUrl: 'https://www.youtube.com/watch?v=X48VuDVv0do',
      content: [
        {
          title: 'Kubernetes',
          topics: [
            { title: 'Pods y Deployments', time: '5.0', isCompleted: false },
            { title: 'Services y Volumes', time: '6.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 19,
      about: 'Introducción a la inteligencia artificial con Python.',
      image: '/images/courses/ai-python.png',
      skillLevel: 'Intermediate',
      totalStudents: 260,
      language: 'Español',
      isCaptions: true,
      totalLectures: 11,
      length: '1h 50m',
      description: [
        'Aprende IA con Python y librerías como TensorFlow y scikit-learn.'
      ],
      instructor: 'Sofía Martínez',
      instructorPosition: 'Data Scientist',
      videoUrl: 'https://www.youtube.com/watch?v=aircAruvnKk',
      content: [
        {
          title: 'IA con Python',
          topics: [
            { title: 'Fundamentos de Machine Learning', time: '5.0', isCompleted: false },
            { title: 'Redes Neuronales', time: '6.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 20,
      about: 'Scrum y metodologías ágiles.',
      image: '/images/courses/scrum.png',
      skillLevel: 'Beginner',
      totalStudents: 200,
      language: 'Español',
      isCaptions: true,
      totalLectures: 8,
      length: '50m',
      description: [
        'Aprende los fundamentos de Scrum y gestión ágil de proyectos.'
      ],
      instructor: 'Pedro López',
      instructorPosition: 'Agile Coach',
      videoUrl: 'https://www.youtube.com/watch?v=9TycLR0TqFA',
      content: [
        {
          title: 'Scrum',
          topics: [
            { title: 'Roles', time: '5.0', isCompleted: false },
            { title: 'Eventos', time: '4.5', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 21,
      about: 'Fundamentos de SEO.',
      image: '/images/courses/seo.png',
      skillLevel: 'Beginner',
      totalStudents: 150,
      language: 'Español',
      isCaptions: true,
      totalLectures: 6,
      length: '30m',
      description: [
        'Aprende técnicas básicas de SEO para mejorar el posicionamiento web.'
      ],
      instructor: 'Laura Pérez',
      instructorPosition: 'SEO Specialist',
      videoUrl: 'https://www.youtube.com/watch?v=hF515-0Tduk',
      content: [
        {
          title: 'SEO',
          topics: [
            { title: 'SEO On-Page', time: '4.0', isCompleted: false },
            { title: 'SEO Off-Page', time: '5.0', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 22,
      about: 'Fundamentos de diseño gráfico con Photoshop.',
      image: '/images/courses/photoshop.png',
      skillLevel: 'Beginner',
      totalStudents: 120,
      language: 'Español',
      isCaptions: true,
      totalLectures: 7,
      length: '1h 10m',
      description: [
        'Aprende a usar Photoshop para diseño gráfico y retoque fotográfico.'
      ],
      instructor: 'Juan Martínez',
      instructorPosition: 'Graphic Designer',
      videoUrl: 'https://www.youtube.com/watch?v=OjRqZiAgoHo',
      content: [
        {
          title: 'Photoshop',
          topics: [
            { title: 'Herramientas Básicas', time: '4.0', isCompleted: false },
            { title: 'Capas y Ajustes', time: '5.5', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 23,
      about: 'Fundamentos de SQL.',
      image: '/images/courses/sql.png',
      skillLevel: 'Beginner',
      totalStudents: 180,
      language: 'Español',
      isCaptions: false,
      totalLectures: 9,
      length: '1h 20m',
      description: [
        'Aprende a crear y consultar bases de datos relacionales con SQL.'
      ],
      instructor: 'Pedro Sánchez',
      instructorPosition: 'Database Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
      content: [
        {
          title: 'SQL',
          topics: [
            { title: 'SELECT y JOIN', time: '4.5', isCompleted: false },
            { title: 'Subconsultas', time: '5.5', isCompleted: false }
          ]
        }
      ]
    },
    {
      id: 24,
      about: 'Fundamentos de Git y GitHub.',
      image: '/images/courses/git.png',
      skillLevel: 'Beginner',
      totalStudents: 250,
      language: 'Español',
      isCaptions: true,
      totalLectures: 8,
      length: '50m',
      description: [
        'Aprende control de versiones con Git y colaboración en GitHub.'
      ],
      instructor: 'Ana Rodríguez',
      instructorPosition: 'Software Engineer',
      videoUrl: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
      content: [
        {
          title: 'Git y GitHub',
          topics: [
            { title: 'Comandos Básicos', time: '4.0', isCompleted: false },
            { title: 'Ramas y Merge', time: '5.0', isCompleted: false }
          ]
        }
      ]
    }
  ]
}
