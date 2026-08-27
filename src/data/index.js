export const features = [
  {
    id: 1,
    title: 'Expert Tutors',
    description: 'Learn from industry experts who are passionate about teaching.',
    icon: 'UserCheck' // lucide icon name
  },
  {
    id: 2,
    title: 'Effective Courses',
    description: 'Practical, high-quality courses designed to help you achieve your goals.',
    icon: 'BookOpen'
  },
  {
    id: 3,
    title: 'Earn Certificate',
    description: 'Get a recognized certificate upon completion of your courses.',
    icon: 'Award'
  }
];

export const courses = [
  {
    id: 1,
    title: 'Complete Web Design: from Figma to Webflow to HTML/CSS',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    originalPrice: 99,
    price: 49,
    instructor: 'Jane Doe',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 4.8,
    reviews: 1240,
    lessons: 24,
    duration: '12h 30m',
    students: '8.5K'
  },
  {
    id: 2,
    title: 'Financial Analysis and Valuation for Startups',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=500&q=80',
    originalPrice: 120,
    price: 79,
    instructor: 'Mark Smith',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 4.7,
    reviews: 890,
    lessons: 32,
    duration: '16h 15m',
    students: '5.2K'
  },
  {
    id: 3,
    title: 'The Complete Full-Stack JavaScript Bootcamp 2024',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    originalPrice: 199,
    price: 89,
    instructor: 'Alex Johnson',
    instructorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    rating: 4.9,
    reviews: 3400,
    lessons: 68,
    duration: '45h 00m',
    students: '22K'
  },
  {
    id: 4,
    title: 'Mastering Digital Marketing: Strategy to Execution',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    originalPrice: 85,
    price: 39,
    instructor: 'Sarah Lee',
    instructorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 4.6,
    reviews: 560,
    lessons: 18,
    duration: '8h 45m',
    students: '3.1K'
  },
  {
    id: 5,
    title: 'Advanced UI/UX Animation Techniques',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&q=80',
    originalPrice: 110,
    price: 65,
    instructor: 'David Chen',
    instructorAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&q=80',
    rating: 4.8,
    reviews: 1120,
    lessons: 28,
    duration: '14h 20m',
    students: '7.8K'
  },
  {
    id: 6,
    title: 'Python for Data Science and Machine Learning',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    originalPrice: 150,
    price: 99,
    instructor: 'Elena Rostova',
    instructorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80',
    rating: 4.9,
    reviews: 4500,
    lessons: 85,
    duration: '52h 30m',
    students: '35K'
  },
  {
    id: 7,
    title: 'Graphic Design Masterclass',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&q=80',
    originalPrice: 120,
    price: 60,
    instructor: 'Jane Doe',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 4.7,
    reviews: 2100,
    lessons: 30,
    duration: '18h 00m',
    students: '12K'
  },
  {
    id: 17,
    title: 'Entrepreneurship 101',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=500&q=80',
    originalPrice: 150,
    price: 75,
    instructor: 'Mark Smith',
    instructorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
    rating: 4.8,
    reviews: 3100,
    lessons: 45,
    duration: '25h 00m',
    students: '20K'
  },
  {
    id: 27,
    title: 'React Native for Mobile Development',
    category: 'Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&q=80',
    originalPrice: 160,
    price: 80,
    instructor: 'Alex Johnson',
    instructorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
    rating: 4.8,
    reviews: 3500,
    lessons: 50,
    duration: '28h 00m',
    students: '22K'
  },
];

export const popularCategories = [
  {
    id: 1,
    name: 'Design',
    courses: 42,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
    iconBg: 'bg-pink-100',
    iconColor: 'text-pink-600',
    badge: 'Popular',
  },
  {
    id: 2,
    name: 'Business',
    courses: 36,
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&q=80',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    badge: 'Trending',
  },
  {
    id: 3,
    name: 'Development',
    courses: 68,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    badge: 'Popular',
  },
  {
    id: 4,
    name: 'Data Science',
    courses: 47,
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    badge: 'Hot',
  },
];

export const instructors = [
  {
    id: 1,
    name: 'Jane Doe',
    specialty: 'Lead Designer',
    bio: 'Former design lead at major tech firms. Passionate about pixels.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    rating: 4.8,
    students: '12K',
    courses: 5
  },
  {
    id: 2,
    name: 'Alex Johnson',
    specialty: 'Senior Developer',
    bio: 'Full-stack engineer with 15 years of experience building scalable apps.',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80',
    rating: 4.9,
    students: '45K',
    courses: 12
  },
  {
    id: 3,
    name: 'Sarah Lee',
    specialty: 'Marketing Expert',
    bio: 'Helped scale multiple startups to millions in revenue through growth marketing.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    rating: 4.7,
    students: '8K',
    courses: 3
  },
  {
    id: 4,
    name: 'David Chen',
    specialty: 'UX Researcher',
    bio: 'Specializes in user behavior and creating seamless digital experiences.',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400&q=80',
    rating: 4.8,
    students: '15K',
    courses: 7
  },
  {
    id: 5,
    name: 'Elena Rostova',
    specialty: 'Data Scientist',
    bio: 'Ph.D. in Computer Science. Making machine learning accessible to everyone.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    rating: 4.9,
    students: '38K',
    courses: 9
  }
];

export const events = [
  {
    id: 1,
    title: 'Global Education Fall Meeting for Everyone',
    date: '12 Oct, 2024',
    location: 'New York, USA',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80'
  },
  {
    id: 2,
    title: 'Design Systems Architecture Conference',
    date: '25 Nov, 2024',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?w=500&q=80'
  },
  {
    id: 3,
    title: 'Future of AI in Web Development Workshop',
    date: '05 Dec, 2024',
    location: 'San Francisco, USA',
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=500&q=80'
  }
];

export const blogs = [
  {
    id: 1,
    title: 'How to Become a Successful UI/UX Designer in 2024',
    category: 'Design',
    date: 'Oct 05, 2024',
    author: 'Jane Doe',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80'
  },
  {
    id: 2,
    title: '10 Essential JavaScript Frameworks You Must Know',
    category: 'Development',
    date: 'Oct 02, 2024',
    author: 'Alex Johnson',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80'
  },
  {
    id: 3,
    title: 'The Psychology of Colors in Modern Branding',
    category: 'Marketing',
    date: 'Sep 28, 2024',
    author: 'Sarah Lee',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80'
  },
  {
    id: 4,
    title: 'A Guide to Financial Planning for Freelancers',
    category: 'Business',
    date: 'Sep 24, 2024',
    author: 'Mark Smith',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80'
  }
];
