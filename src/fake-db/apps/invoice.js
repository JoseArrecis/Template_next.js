const now = new Date()
const currentMonth = now.toLocaleString('default', { month: 'short' })

export const db = [
   {
    id: '4987',
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '7777 Mendez Plains',
    company: 'Hall-Robbins PLC',
    companyEmail: 'don85@johnson.com',
    country: 'USA',
    contact: '(616) 865-4180',
    name: 'Jordan Stevenson',
    service: 'Software Development',
    total: 3428,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$724',
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Premium Branding Package',
        description: 'Branding & Promotion',
        hours: 48,
        qty: 1,
        total: 32
      },
      {
        item: 'Social Media',
        description: 'Social media templates',
        hours: 42,
        qty: 1,
        total: 28
      },
      {
        item: 'Web Design',
        description: 'Web designing package',
        hours: 46,
        qty: 1,
        total: 24
      },
      {
        item: 'SEO',
        description: 'Search engine optimization',
        hours: 40,
        qty: 1,
        total: 22
      }
    ],

    salesperson: 'Tommy Shelby',
    note: 'It was a pleasure working with you and your team. We hope you will keep us in mind for future projects.'
  },
  {
    id: '4988',
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '04033 Wesley Wall Apt. 961',
    company: 'Mccann LLC and Sons',
    companyEmail: 'brenda49@taylor.info',
    country: 'Haiti',
    contact: '(226) 204-8287',
    name: 'Stephanie Burns',
    service: 'UI/UX Design & Development',
    total: 5219,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `15 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Web Design',
        description: 'Web designing package',
        hours: 50,
        qty: 2,
        total: 24
      },
      {
        item: 'SEO Optimization',
        description: 'SEO improvement package',
        hours: 30,
        qty: 2,
        total: 50
      }
    ],

    salesperson: 'Arthur Morgan',
    note: 'Thank you for trusting us with your project. We look forward to collaborating again soon.'
  },
  {
    id: '4989',
    issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
    address: '5345 Robert Squares',
    company: 'Leonard-Garcia and Sons',
    companyEmail: 'smithtiffany@powers.com',
    country: 'Denmark',
    contact: '(955) 676-1076',
    name: 'Tony Herrera',
    service: 'Unlimited Extended License',
    total: 3719,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `03 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Graphic Design',
        description: 'Graphic content creation',
        hours: 25,
        qty: 1,
        total: 50
      },
      {
        item: 'Content Writing',
        description: 'Articles and blog posts',
        hours: 15,
        qty: 4,
        total: 45
      }
    ],

    salesperson: 'Sarah Connor',
    note: 'It was great working with rout team! Hope to continue this partnership ib future campaigns'
  },
  {
    id: '4990',
    issuedDate: `06 ${currentMonth} ${now.getFullYear()}`,
    address: '19022 Clark Parks Suite 149',
    company: 'Smith, Miller and Henry LLC',
    companyEmail: 'mejiageorge@lee-perez.com',
    country: 'Cambodia',
    contact: '(832) 323-6914',
    name: 'Kevin Patton',
    service: 'Software Development',
    total: 4749,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `11 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'UI/UX design',
        description: 'User interface and experiencie',
        hours: 40,
        qty: 1,
        total: 35
      },
      {
        item: 'App Development',
        description: 'Mobile application development',
        hours: 60,
        qty: 1,
        total: 80
      }
    ],

    salesperson: 'Michael Scott',
    note: 'We appreciate your confidence in our services. Wishing you success on your launch'
  },
  {
    id: '4991',
    issuedDate: `08 ${currentMonth} ${now.getFullYear()}`,
    address: '8534 Saunders Hill Apt. 583',
    company: 'Garcia-Cameron and Sons',
    companyEmail: 'brandon07@pierce.com',
    country: 'Martinique',
    contact: '(970) 982-3353',
    name: 'Mrs. Julie Donovan MD',
    service: 'UI/UX Design & Development',
    total: 4056,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Draft',
    balance: '$815',
    dueDate: `30 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Social Media Management',
        description: 'Managing social media accounts',
        hours: 20,
        qty: 2,
        total: 30
      },
      {
        item: 'Email Marketing',
        description: 'Campaign creation and management',
        hours: 10,
        qty: 5,
        total: 25
      }
    ],

    salesperson: 'Lara Croft',
    note: 'Your cooperation mode this project a success. Let´s work together again soon'
  },
  {
    id: '4992',
    issuedDate: `26 ${currentMonth} ${now.getFullYear()}`,
    address: '661 Perez Run Apt. 778',
    company: 'Burnett-Young PLC',
    companyEmail: 'guerrerobrandy@beasley-harper.com',
    country: 'Botswana',
    contact: '(511) 938-9617',
    name: 'Amanda Phillips',
    service: 'UI/UX Design & Development',
    total: 2771,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `24 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Video Editing',
        description: 'Editing promotional videos',
        hours: 35,
        qty: 1,
        total: 40
      },
      {
        item: 'Photography',
        description: 'Professional photo sessions',
        hours: 15,
        qty: 2,
        total: 30
      }
    ],

    salesperson: 'Walter White',
    note: 'Thanks for the opportunity. We hope to bring even more value next time.'
  },
  {
    id: '4993',
    issuedDate: `17 ${currentMonth} ${now.getFullYear()}`,
    address: '074 Long Union',
    company: 'Wilson-Lee LLC',
    companyEmail: 'williamshenry@moon-smith.com',
    country: 'Montserrat',
    contact: '(504) 859-2893',
    name: 'Christina Collier',
    service: 'UI/UX Design & Development',
    total: 2713,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: '$407',
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Animation',
        description: '2D and 3D animation',
        hours: 50,
        qty: 1,
        total: 60
      },
      {
        item: 'Logo Design',
        description: 'Brand identity logo creation',
        hours: 12,
        qty: 3,
        total: 36
      }
    ],

    salesperson: 'Evelyn Carter',
    note: 'It was a pleasure assisting you. Don´t hesitate to reack out for future needs.'
  },
  {
    id: '4994',
    issuedDate: `11 ${currentMonth} ${now.getFullYear()}`,
    address: '5225 Ford Cape Apt. 840',
    company: 'Schwartz, Henry and Rhodes Group',
    companyEmail: 'margaretharvey@russell-murray.com',
    country: 'Oman',
    contact: '(758) 403-7718',
    name: 'David Flores',
    service: 'Template Customization',
    total: 4309,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: `10 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Illustration',
        description: 'Custom illustration',
        hours: 20,
        qty: 2,
        total: 35
      },
      {
        item: 'Brand Strategy',
        description: 'Brand identity logo creation',
        hours: 12,
        qty: 3,
        total: 36
      }
    ],

    salesperson: 'James Anderson', 
    note: 'Working with your company was a rewarding experience. Let’s stay in touch!'
  },
  {
    id: '4995',
    issuedDate: `26 ${currentMonth} ${now.getFullYear()}`,
    address: '23717 James Club Suite 277',
    company: 'Henderson-Holder PLC',
    companyEmail: 'dianarodriguez@villegas.com',
    country: 'Cambodia',
    contact: '(292) 873-8254',
    name: 'Valerie Perez',
    service: 'Software Development',
    total: 3367,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `24 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Copywriting',
        description: 'Creative copywriting for ads',
        hours: 18,
        qty: 3,
        total: 40,
      },
      {
        item: 'Web Hosting',
        description: 'Website hosting services',
        hours: 5,
        qty: 4,
        total: 20
      }
    ],

    salesperson: 'Mia Khalifa', 
    note: 'Thank you for choosing our team. We truly enjoyed this collaboration.'
  },
  {
    id: '4996',
    issuedDate: `15 ${currentMonth} ${now.getFullYear()}`,
    address: '4528 Myers Gateway',
    company: 'Page-Wise PLC',
    companyEmail: 'bwilson@norris-brock.com',
    country: 'Guam',
    contact: '(956) 803-2008',
    name: 'Susan Dickerson',
    service: 'Software Development',
    total: 4776,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$305',
    dueDate: `02 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Domain Registration',
        description: 'Registering domain names',
        hours: 2,
        qty: 5,
        total: 10
      },
      {
        item: 'PPC Campaing',
        description: 'Pay per click advertising',
        hours: 25,
        qty: 2,
        total: 50
      }
    ],

    salesperson: 'Tony Stark', 
    note: 'A fantastic project from start to finish! Looking forward to new challenges together.'
  },
  {
    id: '4997',
    issuedDate: `27 ${currentMonth} ${now.getFullYear()}`,
    address: '4234 Mills Club Suite 107',
    company: 'Turner PLC Inc',
    companyEmail: 'markcampbell@bell.info',
    country: 'United States Virgin Islands',
    contact: '(716) 962-8635',
    name: 'Kelly Smith',
    service: 'Unlimited Extended License',
    total: 3789,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Partial Payment',
    balance: '$666',
    dueDate: `18 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Analytics Setup',
        description: 'Website analytics integration',
        hours: 8,
        qty: 1,
        total: 12
      },
      {
        item: 'App Maintenance',
        description: 'Ongoing app updates',
        hours: 61,
        qty: 11,
        total: 50
      }
    ],

    salesperson: 'Hannah Green', 
    note: 'We loved working with your organization. Hope to collaborate again soon!'
  },
  {
    id: '4998',
    issuedDate: `31 ${currentMonth} ${now.getFullYear()}`,
    address: '476 Keith Meadow',
    company: 'Levine-Dorsey PLC',
    companyEmail: 'mary61@rosario.com',
    country: 'Syrian Arab Republic',
    contact: '(523) 449-0782',
    name: 'Jamie Jones',
    service: 'Unlimited Extended License',
    total: 5200,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `17 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Cloud Services',
        description: 'Cloud infrastructure setup',
        hours: 40,
        qty: 1,
        total: 60
      },
      {
        item: 'E-commerce Development',
        description: 'Online store creation',
        hours: 55,
        qty: 1,
        total: 75
      }
    ],

    salesperson: 'Jack Miller', 
    note: 'Appreciate your trust and professionalism throughout the project. Thank you!'
  },
  {
    id: '4999',
    issuedDate: `14 ${currentMonth} ${now.getFullYear()}`,
    address: '56381 Ashley Village Apt. 332',
    company: 'Hall, Thompson and Ramirez LLC',
    companyEmail: 'sean22@cook.com',
    country: 'Ukraine',
    contact: '(583) 470-8356',
    name: 'Ruben Garcia',
    service: 'Software Development',
    total: 4558,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `01 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Security Audit',
        description: 'Website security assessment',
        hours: 15,
        qty: 4,
        total: 20
      },
      {
        item: 'Performance Optimization',
        description: 'Improving website speed',
        hours: 10,
        qty: 2,
        total: 18
      }
    ],

    salesperson: 'Sophia Turner', 
    note: 'We hope the results exceeded your expectations. Let’s do it again!'
  },
  {
    id: '5000',
    issuedDate: `21 ${currentMonth} ${now.getFullYear()}`,
    address: '6946 Gregory Plaza Apt. 310',
    company: 'Lambert-Thomas Group',
    companyEmail: 'mccoymatthew@lopez-jenkins.net',
    country: 'Vanuatu',
    contact: '(366) 906-6467',
    name: 'Ryan Meyer',
    service: 'Template Customization',
    total: 3503,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'CRM Setup',
        description: 'Customer Relationship management',
        hours: 25,
        qty: 1,
        total: 30
      },
      {
        item: 'Newsletter Design',
        description: 'Designing email newsletter',
        hours: 12,
        qty: 2,
        total: 20
      }
    ],

    salesperson: 'Daniel Kim', 
    note: 'It was inspiring to work with such a creative team. Until next time!'
  },
  {
    id: '5001',
    issuedDate: `30 ${currentMonth} ${now.getFullYear()}`,
    address: '64351 Andrew Lights',
    company: 'Gregory-Haynes PLC',
    companyEmail: 'novakshannon@mccarty-murillo.com',
    country: 'Romania',
    contact: '(320) 616-3915',
    name: 'Valerie Valdez',
    service: 'Unlimited Extended License',
    total: 5285,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$202',
    dueDate: `02 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Product Photography',
        description: 'High-quality product photos',
        hours: 18,
        qty: 3,
        total: 45
      },
      {
        item: 'Illustrative Infographics',
        description: 'Creating infographics',
        hours: 20, 
        qty: 2,
        total: 38
      }
    ],

    salesperson: 'Emily Rose', 
    note: 'We’re grateful for the opportunity to contribute to your success.'
  },
  {
    id: '5002',
    issuedDate: `21 ${currentMonth} ${now.getFullYear()}`,
    address: '5702 Sarah Heights',
    company: 'Wright-Schmidt LLC',
    companyEmail: 'smithrachel@davis-rose.net',
    country: 'Costa Rica',
    contact: '(435) 899-1963',
    name: 'Melissa Wheeler',
    service: 'UI/UX Design & Development',
    total: 3668,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Downloaded',
    balance: '$731',
    dueDate: `15 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'App Testing',
        description: 'Manual and automated testing',
        hours: 22,
        qty: 1,
        total: 28
      },
      {
        item: 'Video Production',
        description: 'Full video production services',
        hours: 50,
        qty: 1,
        total: 65
      }
    ],

    salesperson: 'Victor Reyes', 
    note: 'Thanks for your excellent communication and support during this project.'
  },
  {
    id: '5003',
    issuedDate: `30 ${currentMonth} ${now.getFullYear()}`,
    address: '668 Robert Flats',
    company: 'Russell-Abbott Ltd',
    companyEmail: 'scott96@mejia.net',
    country: 'Congo',
    contact: '(254) 399-4728',
    name: 'Alan Jimenez',
    service: 'Unlimited Extended License',
    total: 4372,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Sent',
    balance: '-$344',
    dueDate: `17 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Social Media Ads',
        description: 'Creating ad campaigns',
        hours: 15,
        qty: 3,
        total: 40
      },
      {
        item: 'Marketing Consulation',
        description: 'Expert marketing advice',
        hours: 10,
        qty: 2,
        total: 25
      }
    ],

    salesperson: 'Nina Patel', 
    note: 'Working with you has been a highlight for our team. Thank you for your trust.'
  },
  {
    id: '5004',
    issuedDate: `27 ${currentMonth} ${now.getFullYear()}`,
    address: '55642 Chang Extensions Suite 373',
    company: 'Williams LLC Inc',
    companyEmail: 'cramirez@ross-bass.biz',
    country: 'Saint Pierre and Miquelon',
    contact: '(648) 500-4338',
    name: 'Jennifer Morris',
    service: 'Template Customization',
    total: 3198,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$253',
    dueDate: `16 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Protography Editing',
        description: 'Editing and retouching',
        hours: 12,
        qty: 2,
        total: 22
      },
      {
        item: 'Content Strategy',
        description: 'Planning content calendar',
        hours: 20,
        qty: 1,
        total: 28
      }
    ],

    salesperson: 'Chris Evans', 
    note: 'Your feedback was invaluable. Looking forward to the next big idea!'
  },
  {
    id: '5005',
    issuedDate: `30 ${currentMonth} ${now.getFullYear()}`,
    address: '56694 Eric Orchard',
    company: 'Hudson, Bell and Phillips PLC',
    companyEmail: 'arielberg@wolfe-smith.com',
    country: 'Uruguay',
    contact: '(896) 544-3796',
    name: 'Timothy Stevenson',
    service: 'Unlimited Extended License',
    total: 5293,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: `01 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Website Redesign',
        description: 'Redesigning existing website',
        hours: 45,
        qty: 1,
        total: 55
      },
      {
        item: 'Technical Support',
        description: 'IT support devices',
        hours: 10,
        qty: 3,
        total: 30
      }
    ],

    salesperson: 'Olivia Martinez', 
    note: 'We’re proud to have helped you reach your goals. Let’s stay connected!'
  },
  {
    id: '5006',
    issuedDate: `10 ${currentMonth} ${now.getFullYear()}`,
    address: '3727 Emma Island Suite 879',
    company: 'Berry, Gonzalez and Heath Inc',
    companyEmail: 'yrobinson@nichols.com',
    country: 'Israel',
    contact: '(236) 784-5142',
    name: 'Erik Hayden',
    service: 'Template Customization',
    total: 5612,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Downloaded',
    balance: '$883',
    dueDate: `12 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Animation for Ads',
        description: 'Short ad animations',
        hours: 18,
        qty: 2, 
        total: 36
      },
      {
        item: 'Print Design',
        description: 'Design for print materials',
        hours: 15,
        qty: 3,
        total: 35
      }
    ],

    salesperson: 'Jason Brown', 
    note: 'It was a smooth and successful collaboration. Thank you for your partnership.'
  },
  {
    id: '5007',
    issuedDate: `01 ${currentMonth} ${now.getFullYear()}`,
    address: '953 Miller Common Suite 580',
    company: 'Martinez, Fuller and Chavez and Sons',
    companyEmail: 'tatejennifer@allen.net',
    country: 'Cook Islands',
    contact: '(436) 717-2419',
    name: 'Katherine Kennedy',
    service: 'Software Development',
    total: 2230,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `19 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Brand Guidelines',
        description: 'Creating brand manuals',
        hours: 20,
        qty: 1,
        total: 30
      },
      {
        item: 'App Store Submission',
        description: 'Submitting apps to stores',
        hours: 20,
        qty: 1,
        total: 30 
      }
    ],

    salesperson: 'Sophia Lopez', 
    note: 'We’re happy to have worked on your project. Hope we’ll meet again soon.'
  },
  {
    id: '5008',
    issuedDate: `22 ${currentMonth} ${now.getFullYear()}`,
    address: '808 Sullivan Street Apt. 135',
    company: 'Wilson and Sons LLC',
    companyEmail: 'gdurham@lee.com',
    country: 'Nepal',
    contact: '(489) 946-3041',
    name: 'Monica Fuller',
    service: 'Unlimited Extended License',
    total: 2032,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `30 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Video Ads',
        description: 'Producing promotional videos',
        hours: 25,
        qty: 2,
        total: 45 
      },
      {
        item: 'Illustration for Books',
        description: 'Book illustrations',
        hours: 30,
        qty: 1,
        total: 38
      }
    ],

    salesperson: 'Ethan Clark', 
    note: 'Thank you for choosing us! We’re always ready to support your next initiative.'
  },
  {
    id: '5009',
    issuedDate: `30 ${currentMonth} ${now.getFullYear()}`,
    address: '25135 Christopher Creek',
    company: 'Hawkins, Johnston and Mcguire PLC',
    companyEmail: 'jenny96@lawrence-thompson.com',
    country: 'Kiribati',
    contact: '(274) 246-3725',
    name: 'Stacey Carter',
    service: 'UI/UX Design & Development',
    total: 3128,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `10 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Voice Over',
        description: 'Professional voice recording',
        hours: 10,
        qty: 3,
        total: 35
      },
      {
        item: 'Podcast Editing',
        description: 'Editing audio recording',
        hours: 12,
        qty: 2,
        total: 20 
      }
    ],

    salesperson: 'Isabella Moore', 
    note: 'It was wonderful collaborating with your team. Best wishes for your growth!'
  },
  {
    id: '5010',
    issuedDate: `06 ${currentMonth} ${now.getFullYear()}`,
    address: '81285 Rebecca Estates Suite 046',
    company: 'Huynh-Mills and Sons',
    companyEmail: 'jgutierrez@jackson.com',
    country: 'Swaziland',
    contact: '(258) 211-5970',
    name: 'Chad Davis',
    service: 'Software Development',
    total: 2060,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `08 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Landing Page',
        description: 'Single-page website design',
        hours: 15,
        qty: 1,
        total: 18
      },
      {
        item: 'Logo Animation',
        description: 'Animation Logos',
        hours: 12,
        qty: 1,
        total: 16
      }
    ],
    salesperson: 'Ryan Brooks', 
    note: 'Your trust means a lot to us. Looking forward to future opportunities together.'
  },
  {
    id: '5011',
    issuedDate: `01 ${currentMonth} ${now.getFullYear()}`,
    address: '3102 Briggs Dale Suite 118',
    company: 'Jones-Cooley and Sons',
    companyEmail: 'hunter14@jones.com',
    country: 'Congo',
    contact: '(593) 965-4100',
    name: 'Chris Reyes',
    service: 'UI/UX Design & Development',
    total: 4077,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `01 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Banner Design',
        description: 'Web and print banners',
        hours: 10,
        qty: 3,
        total: 28
      },
      {
        item: 'Content Translation',
        description: 'Translating content',
        hours: 20,
        qty: 2,
        total: 35
      }
    ],

    salesperson: 'Charlotte Davis', 
    note: 'It’s always great to work with motivated teams like yours. Thanks again!'
  },
  {
    id: '5012',
    issuedDate: `30 ${currentMonth} ${now.getFullYear()}`,
    address: '811 Jill Skyway',
    company: 'Jones PLC Ltd',
    companyEmail: 'pricetodd@johnson-jenkins.com',
    country: 'Brazil',
    contact: '(585) 829-2603',
    name: 'Laurie Summers',
    service: 'Template Customization',
    total: 2872,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `18 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Email Setup',
        description: 'Setting up email accounts',
        hours: 5,
        qty: 4,
        total: 12
      },
      {
        item: 'Video Tutorial Creation',
        description: 'Making tutorial videos',
        hours: 20,
        qty: 1,
        total: 25
      }
    ],

    salesperson: 'Noah Bennett', 
    note: 'Appreciate your business and your vision. Hope to work with you again soon.'
  },
  {
    id: '5013',
    issuedDate: `05 ${currentMonth} ${now.getFullYear()}`,
    address: '2223 Brandon Inlet Suite 597',
    company: 'Jordan, Gomez and Ross Group',
    companyEmail: 'perrydavid@chapman-rogers.com',
    country: 'Congo',
    contact: '(527) 351-5517',
    name: 'Lindsay Wilson',
    service: 'Software Development',
    total: 3740,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `01 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Social Media Graphics',
        description: 'Creating social media visual',
        hours: 15,
        qty: 2,
        total: 28 
      },
      {
        item: 'UX Audit',
        description: 'Evaluating user experience',
        hours: 18,
        qty: 1,
        total: 22
      }
    ],

    salesperson: 'Grace Adams', 
    note: 'We’re grateful for this project and excited about future collaborations!'
  },
  {
    id: '5014',
    issuedDate: `01 ${currentMonth} ${now.getFullYear()}`,
    address: '08724 Barry Causeway',
    company: 'Gonzalez, Moody and Glover LLC',
    companyEmail: 'leahgriffin@carpenter.com',
    country: 'Equatorial Guinea',
    contact: '(628) 903-0132',
    name: 'Jenna Castro',
    service: 'Unlimited Extended License',
    total: 3623,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Web App Integration',
        description: 'Integrating APIs',
        hours: 25,
        qty: 1,
        total: 32
      },
      {
        item: 'Photography Retouching',
        description: 'Advanced photo editing',
        hours: 12,
        qty: 2,
        total: 22
      }
    ],

    salesperson: 'Lucas Rivera', 
    note: 'Your support made everything easier. Thank you for being a great client!'
  },
  {
    id: '5015',
    issuedDate: `16 ${currentMonth} ${now.getFullYear()}`,
    address: '073 Holt Ramp Apt. 755',
    company: 'Ashley-Pacheco Ltd',
    companyEmail: 'esparzadaniel@allen.com',
    country: 'Seychelles',
    contact: '(847) 396-9904',
    name: 'Wendy Weber',
    service: 'Software Development',
    total: 2477,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `01 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Online course design',
        description: 'Creating e-learnng content',
        hours: 40,
        qty: 1,
        total: 50
      },
      {
        item: 'Interactive Infographics',
        description: 'Dynamic infographic design',
        hours: 22,
        qty: 1,
        total: 30
      }
    ],

    salesperson: 'Ava Johnson', 
    note: 'It’s been a pleasure supporting your project goals. Until next time!'
  },
  {
    id: '5016',
    issuedDate: `24 ${currentMonth} ${now.getFullYear()}`,
    address: '984 Sherry Trail Apt. 953',
    company: 'Berry PLC Group',
    companyEmail: 'todd34@owens-morgan.com',
    country: 'Ireland',
    contact: '(852) 249-4539',
    name: 'April Yates',
    service: 'Unlimited Extended License',
    total: 3904,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: '$951',
    dueDate: `30 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Brand Photography',
        description: 'Lifestyle brand photos',
        hours: 22,
        qty: 2,
        total: 36
      },
      {
        item: '3D Modeling',
        description: '3D asset creation',
        hours: 35,
        qty: 1,
        total: 45
      }
    ],

    salesperson: 'Henry Thompson', 
    note: 'We’re proud of the results we achieved together. Thanks for trusting us.'
  },
  {
    id: '5017',
    issuedDate: `24 ${currentMonth} ${now.getFullYear()}`,
    address: '093 Jonathan Camp Suite 953',
    company: 'Allen Group Ltd',
    companyEmail: 'roydavid@bailey.com',
    country: 'Netherlands',
    contact: '(917) 984-2232',
    name: 'Daniel Marshall PhD',
    service: 'UI/UX Design & Development',
    total: 3102,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$153',
    dueDate: `25 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'Phototype Design',
        description: 'App and website prototyping',
        hours: 20,
        qty: 1,
        total: 28
      },
      {
        item: 'Content Editing',
        description: 'Proofreading and editing',
        hours: 12,
        qty: 3,
        total: 30
      }
    ],

    salesperson: 'Emma Wilson', 
    note: 'It was a fun and productive experience. Hope to collaborate again soon!'
  },
  {
    id: '5018',
    issuedDate: `29 ${currentMonth} ${now.getFullYear()}`,
    address: '4735 Kristie Islands Apt. 259',
    company: 'Chapman-Schneider LLC',
    companyEmail: 'baldwinjoel@washington.com',
    country: 'Cocos (Keeling) Islands',
    contact: '(670) 409-3703',
    name: 'Randy Rich',
    service: 'UI/UX Design & Development',
    total: 2483,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `10 ${currentMonth} ${now.getFullYear()}`,

    items: [
      {
        item: 'UI Kit Design',
        description: 'Custom UI kit creation',
        hours: 25,
        qty: 1,
        total: 35
      },
      {
        item: 'Illustration for Web',
        description: 'Web page illustrations',
        hours: 15,
        qty: 2,
        total: 28
      }
    ],

    salesperson: 'David Carter', 
    note: 'Thanks for your patience and professionalism throughout this process.'
  },
  {
    id: '5019',
    issuedDate: `07 ${currentMonth} ${now.getFullYear()}`,
    address: '92218 Andrew Radial',
    company: 'Mcclure, Hernandez and Simon Ltd',
    companyEmail: 'psmith@morris.info',
    country: 'Macao',
    contact: '(646) 263-0257',
    name: 'Mrs. Jodi Chapman',
    service: 'Unlimited Extended License',
    total: 2825,
    avatar: '/images/avatars/1.png',
    invoiceStatus: 'Partial Payment',
    balance: '-$459',
    dueDate: `14 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Video Subtitles', 
        description: 'Adding subtitles to videos', 
        hours: 8, 
        qty: 2, 
        total: 14 
      },
      { 
        item: 'Animated GIFs', 
        description: 'Creating GIFs for social media',
        hours: 10, 
        qty: 2, 
        total: 18 
      },
    ],

    salesperson: 'Amelia Scott', 
    note: 'We really enjoyed working with your company. See you on the next project!'
  },
  {
    id: '5020',
    issuedDate: `10 ${currentMonth} ${now.getFullYear()}`,
    address: '2342 Michelle Valley',
    company: 'Hamilton PLC and Sons',
    companyEmail: 'lori06@morse.com',
    country: 'Somalia',
    contact: '(751) 213-4288',
    name: 'Steven Myers',
    service: 'Unlimited Extended License',
    total: 2029,
    avatar: '/images/avatars/2.png',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: `28 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Photography Portfolio',
        description: 'Curating photography portfolio', 
        hours: 20, 
        qty: 1, 
        total: 28 
      },
      { 
        item: 'UX Research',
        description: 'User research and testing', 
        hours: 30, 
        qty: 1, 
        total: 38 
      },
    ],

    salesperson: 'Benjamin Reed', 
    note: 'Your enthusiasm was contagious! Looking forward to more successful work ahead.'
  },
  {
    id: '5021',
    issuedDate: `02 ${currentMonth} ${now.getFullYear()}`,
    address: '16039 Brittany Terrace Apt. 128',
    company: 'Silva-Reeves LLC',
    companyEmail: 'zpearson@miller.com',
    country: 'Slovakia (Slovak Republic)',
    contact: '(655) 649-7872',
    name: 'Charles Alexander',
    service: 'Software Development',
    total: 3208,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `06 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'App Wireframing', 
        description: 'Wireframe creation', 
        hours: 15, 
        qty: 1, 
        total: 18 
      },
      { 
        item: 'Web Analytics', 
        description: 'Data analysis and reporting', 
        hours: 12, 
        qty: 1, 
        total: 16 
      },
    ],

    salesperson: 'Lily Collins', 
    note: 'It was an absolute pleasure. Let’s make the next project even better!'
  },
  {
    id: '5022',
    issuedDate: `02 ${currentMonth} ${now.getFullYear()}`,
    address: '37856 Olsen Lakes Apt. 852',
    company: 'Solis LLC Ltd',
    companyEmail: 'strongpenny@young.net',
    country: 'Brazil',
    contact: '(402) 935-0735',
    name: 'Elizabeth Jones',
    service: 'Software Development',
    total: 3077,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `09 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Photo Restoration', 
        description: 'Restoring old photos', 
        hours: 10, 
        qty: 2, 
        total: 18 
      },
      { 
        item: 'Marketing Video', 
        description: 'Promotional video production', 
        hours: 25, 
        qty: 1, 
        total: 32 
      },
    ],

    salesperson: 'Andrew Morgan', 
    note: 'We value your partnership and commitment. Thanks for everything!'
  },
  {
    id: '5023',
    issuedDate: `23 ${currentMonth} ${now.getFullYear()}`,
    address: '11489 Griffin Plaza Apt. 927',
    company: 'Munoz-Peters and Sons',
    companyEmail: 'carrietorres@acosta.com',
    country: 'Argentina',
    contact: '(915) 448-6271',
    name: 'Heidi Walton',
    service: 'Software Development',
    total: 5578,
    avatar: '/images/avatars/3.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `23 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Social Media Strategy', 
        description: 'Planning campaigns', 
        hours: 20, 
        qty: 1, 
        total: 28 
      },
      { 
        item: 'Illustrated Icons', 
        description: 'Custom icon design', 
        hours: 12, 
        qty: 2, 
        total: 20 
      },
    ],

    salesperson: 'Zoe Phillips', 
    note: 'A smooth collaboration from start to finish — we truly appreciate it.'
  },
  {
    id: '5024',
    issuedDate: `28 ${currentMonth} ${now.getFullYear()}`,
    address: '276 Michael Gardens Apt. 004',
    company: 'Shea, Velez and Garcia LLC',
    companyEmail: 'zjohnson@nichols-powers.com',
    country: 'Philippines',
    contact: '(817) 700-2984',
    name: 'Christopher Allen',
    service: 'Software Development',
    total: 2787,
    avatar: '/images/avatars/4.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `25 ${currentMonth} ${now.getFullYear()}`,
    
    items: [
      { 
        item: 'Landing Page Optimization', 
        description: 'Improving landing page', 
        hours: 15, 
        qty: 1, 
        total: 18 
      },
      { 
        item: 'Infographic Video', 
        description: 'Animated infographic videos', 
        hours: 20, 
        qty: 1, 
        total: 25 
      },
    ],

    salesperson: 'Mason Ramirez', 
    note: 'Thank you for being such a responsive and kind client. Let’s work again soon!'
  },
  {
    id: '5025',
    issuedDate: `21 ${currentMonth} ${now.getFullYear()}`,
    address: '633 Bell Well Apt. 057',
    company: 'Adams, Simmons and Brown Group',
    companyEmail: 'kayla09@thomas.com',
    country: 'Martinique',
    contact: '(266) 611-9482',
    name: 'Joseph Oliver',
    service: 'UI/UX Design & Development',
    total: 5591,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Downloaded',
    balance: 0,
    dueDate: `07 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'App UI Testing', 
        description: 'Testing app interfaces', 
        hours: 12, 
        qty: 1, 
        total: 16 
      },
      { 
        item: 'Corporate Branding', 
        description: 'Full brand identity', 
        hours: 40, 
        qty: 1, 
        total: 55 
      },
    ],

    salesperson: 'Harper Gray', 
    note: 'Your insights made this a stronger project. Thanks for the teamwork!'
  },
  {
    id: '5026',
    issuedDate: `24 ${currentMonth} ${now.getFullYear()}`,
    address: '1068 Lopez Fall',
    company: 'Williams-Lawrence and Sons',
    companyEmail: 'melvindavis@allen.info',
    country: 'Mexico',
    contact: '(739) 745-9728',
    name: 'Megan Roberts',
    service: 'Template Customization',
    total: 2783,
    avatar: '/images/avatars/5.png',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Photo Session', description: 'On-site photo shooting', 
        hours: 15, 
        qty: 2, 
        total: 28 
      },
      { 
        item: 'Video Montage', 
        description: 'Compiling video footage', 
        hours: 18, 
        qty: 1, 
        total: 22 
      },
    ],

    salesperson: 'Eleanor Hughes', 
    note: 'We’re thankful for your trust and collaboration. Best of luck ahead!'
  },
  {
    id: '5027',
    issuedDate: `13 ${currentMonth} ${now.getFullYear()}`,
    address: '86691 Mackenzie Light Suite 568',
    company: 'Deleon Inc LLC',
    companyEmail: 'gjordan@fernandez-coleman.com',
    country: 'Costa Rica',
    contact: '(682) 804-6506',
    name: 'Mary Garcia',
    service: 'Template Customization',
    total: 2719,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Sent',
    balance: 0,
    dueDate: `04 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Product Video', 
        description: 'Promotional product videos', 
        hours: 20, 
        qty: 1, 
        total: 28 
      },
      { 
        item: 'Illustration Pack', 
        description: 'Set of themed illustrations', 
        hours: 25,
        qty: 1, 
        total: 35 
      },
    ],

    salesperson: 'Logan Wright', 
    note: 'Working with you was motivating and fun. Let’s do it again!'
  },
  {
    id: '5028',
    issuedDate: `18 ${currentMonth} ${now.getFullYear()}`,
    address: '86580 Sarah Bridge',
    company: 'Farmer, Johnson and Anderson Group',
    companyEmail: 'robertscott@garcia.com',
    country: 'Cameroon',
    contact: '(775) 366-0411',
    name: 'Crystal Mays',
    service: 'Template Customization',
    total: 3325,
    avatar: '',
    avatarColor: 'primary',
    invoiceStatus: 'Paid',
    balance: '$361',
    dueDate: `02 ${currentMonth} ${now.getFullYear()}`, 

    items: [
      { 
        item: 'Animated Banner', 
        description: 'Banner animations', 
        hours: 12, 
        qty: 2, 
        total: 20 
      },
      { 
        item: 'UX Flow Design', 
        description: 'Mapping user flows', 
        hours: 18, 
        qty: 1, 
        total: 25 
      },
    ],

    salesperson: 'Sophie Gonzalez', 
    note: 'A great experience from our side — thank you for your confidence.'
  },
  {
    id: '5029',
    issuedDate: `29 ${currentMonth} ${now.getFullYear()}`,
    address: '49709 Edwin Ports Apt. 353',
    company: 'Sherman-Johnson PLC',
    companyEmail: 'desiree61@kelly.com',
    country: 'Macedonia',
    contact: '(510) 536-6029',
    name: 'Nicholas Tanner',
    service: 'Template Customization',
    total: 3851,
    avatar: '',
    avatarColor: 'secondary',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `25 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Web Security', 
        description: 'Securing web applications', 
        hours: 15, 
        qty: 1, 
        total: 22 
      },
      { 
        item: 'App Icon Design', 
        description: 'Icons for apps', 
        hours: 8, 
        qty: 2, 
        total: 14 
      },
    ],

    salesperson: 'William Foster', 
    note: 'We’re honored to have been part of your project. Stay awesome!'
  },
  {
    id: '5030',
    issuedDate: `07 ${currentMonth} ${now.getFullYear()}`,
    address: '3856 Mathis Squares Apt. 584',
    company: 'Byrd LLC PLC',
    companyEmail: 'jeffrey25@martinez-hodge.com',
    country: 'Congo',
    contact: '(253) 230-4657',
    name: 'Mr. Justin Richardson',
    service: 'Template Customization',
    total: 5565,
    avatar: '',
    avatarColor: 'success',
    invoiceStatus: 'Draft',
    balance: 0,
    dueDate: `06 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Custom Typography', 
        description: 'Unique font design', 
        hours: 12, 
        qty: 1, 
        total: 16 
      },
      { 
        item: 'Social Media Templates', 
        description: 'Editable post templates',
        hours: 15, 
        qty: 2, 
        total: 28 
      },
    ],

    salesperson: 'Ella Rivera', 
    note: 'Your energy and vision inspired us. Hope we can work together again soon.'
  },
  {
    id: '5031',
    issuedDate: `21 ${currentMonth} ${now.getFullYear()}`,
    address: '141 Adrian Ridge Suite 550',
    company: 'Stone-Zimmerman Group',
    companyEmail: 'john77@anderson.net',
    country: 'Falkland Islands (Malvinas)',
    contact: '(612) 546-3485',
    name: 'Jennifer Summers',
    service: 'Template Customization',
    total: 3313,
    avatar: '/images/avatars/6.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `09 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Video Captions', 
        description: 'Adding captions to videos', 
        hours: 8, 
        qty: 2, 
        total: 14 
      },
      { 
        item: 'Newsletter Campaign', 
        description: 'Creating email campaigns', 
        hours: 20, 
        qty: 1, 
        total: 25 
      },
    ],

    salesperson: 'Alexander Hayes', 
    note: 'We deeply appreciate your collaboration. Until our next project!'
  },
  {
    id: '5032',
    issuedDate: `31 ${currentMonth} ${now.getFullYear()}`,
    address: '01871 Kristy Square',
    company: 'Yang, Hansen and Hart PLC',
    companyEmail: 'ywagner@jones.com',
    country: 'Germany',
    contact: '(203) 601-8603',
    name: 'Richard Payne',
    service: 'Template Customization',
    total: 5181,
    avatar: '',
    avatarColor: 'error',
    invoiceStatus: 'Past Due',
    balance: 0,
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Illustration for Ads', 
        description: 'Ad illustrations', 
        hours: 12, 
        qty: 2, 
        total: 20 
      },
      { 
        item: 'Web Accessibility', 
        description: 'Improving accessibility', 
        hours: 10, 
        qty: 1, 
        total: 12 
      },
    ],

    salesperson: 'Scarlett Ward', 
    note: 'It’s been a rewarding experience. Thank you for your trust and time.'
  },
  {
    id: '5033',
    issuedDate: `12 ${currentMonth} ${now.getFullYear()}`,
    address: '075 Smith Views',
    company: 'Jenkins-Rosales Inc',
    companyEmail: 'calvin07@joseph-edwards.org',
    country: 'Colombia',
    contact: '(895) 401-4255',
    name: 'Lori Wells',
    service: 'Template Customization',
    total: 2869,
    avatar: '/images/avatars/7.png',
    invoiceStatus: 'Partial Payment',
    balance: 0,
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Marketing Analytics', 
        description: 'Tracking campaign results', 
        hours: 15, 
        qty: 1, 
        total: 18 
      },
      { 
        item: 'Video Compression', 
        description: 'Optimizing video size', 
        hours: 8, 
        qty: 1, 
        total: 10 
      },
    ],

    salesperson: 'Liam Edwards', 
    note: 'Great teamwork and communication — we’re looking forward to the next step!'
  },
  {
    id: '5034',
    issuedDate: `10 ${currentMonth} ${now.getFullYear()}`,
    address: '2577 Pearson Overpass Apt. 314',
    company: 'Mason-Reed PLC',
    companyEmail: 'eric47@george-castillo.com',
    country: 'Paraguay',
    contact: '(602) 336-9806',
    name: 'Tammy Sanchez',
    service: 'Unlimited Extended License',
    total: 4836,
    avatar: '',
    avatarColor: 'warning',
    invoiceStatus: 'Paid',
    balance: 0,
    dueDate: `22 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Brand Video', 
        description: 'Corporate branding video', 
        hours: 25, 
        qty: 1, 
        total: 32 
      },
      { 
        item: 'Illustration Set', 
        description: 'Set of illustrations', 
        hours: 20, 
        qty: 1, 
        total: 28 
      },
    ],

    salesperson: 'Natalie Flores', 
    note: 'Thanks for believing in us! Hope to continue creating together.'
  },
  {
    id: '5035',
    issuedDate: `20 ${currentMonth} ${now.getFullYear()}`,
    address: '1770 Sandra Mountains Suite 636',
    company: 'Foster-Pham PLC',
    companyEmail: 'jamesjoel@chapman.net',
    country: 'Western Sahara',
    contact: '(936) 550-1638',
    name: 'Dana Carey',
    service: 'UI/UX Design & Development',
    total: 4263,
    avatar: '',
    avatarColor: 'info',
    invoiceStatus: 'Draft',
    balance: '$762',
    dueDate: `12 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Website Migration', 
        description: 'Moving websites to new hosting', 
        hours: 20, 
        qty: 1, 
        total: 25 
      },
      { 
        item: 'App Maintenance Package', 
        description: 'Ongoing app updates', 
        hours: 15, 
        qty: 1, 
        total: 18 
      },
    ],

    salesperson: 'Owen King', 
    note: 'It was a privilege to contribute to your success. Stay in touch!'
  },
  {
    id: '5036',
    issuedDate: `19 ${currentMonth} ${now.getFullYear()}`,
    address: '78083 Laura Pines',
    company: 'Richardson and Sons LLC',
    companyEmail: 'pwillis@cross.org',
    country: 'Bhutan',
    contact: '(687) 660-2473',
    name: 'Andrew Burns',
    service: 'Unlimited Extended License',
    total: 3171,
    avatar: '/images/avatars/8.png',
    invoiceStatus: 'Paid',
    balance: '-$205',
    dueDate: `25 ${currentMonth} ${now.getFullYear()}`,

    items: [
      { 
        item: 'Content Repurposing', 
        description: 'Adapting content for multiple platforms', 
        hours: 10, 
        qty: 2, 
        total: 18 
      },
      { 
        item: 'UX Wireframe', 
        description: 'Creating wireframes for apps', 
        hours: 12, 
        qty: 1, 
        total: 16 
      },
    ],

    salesperson: 'Chloe Parker', 
    note: 'We loved every part of this collaboration. Thank you for your partnership!'
  }
]
