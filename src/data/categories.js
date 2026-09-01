// Shared category data for category listing and detail pages.
export const categories = [
  { icon: '🌐', name: 'Web Development', slug: 'web-development', desc: 'HTML, CSS, JavaScript, and modern frameworks' },
  { icon: '📱', name: 'Mobile Development', slug: 'mobile-development', desc: 'Android, iOS, Flutter, and React Native' },
  { icon: '☕️', name: 'Programming Languages', slug: 'programming-languages', desc: 'Java, Python, C++, Go, and more' },
  { icon: '🗄️', name: 'Database', slug: 'database', desc: 'SQL, NoSQL, design, and optimization' },
  { icon: '🤖', name: 'Artificial Intelligence (AI)', slug: 'artificial-intelligence', desc: 'Machine learning, deep learning, and LLMs' },
  { icon: '🔐', name: 'Cybersecurity', slug: 'cybersecurity', desc: 'Ethical hacking, network and app security' },
  { icon: '☁️', name: 'Cloud Computing', slug: 'cloud-computing', desc: 'AWS, Azure, Google Cloud, and serverless' },
  { icon: '🎨', name: 'UI/UX & Graphic Design', slug: 'ui-ux-graphic-design', desc: 'Figma, design systems, and visual design' },
  { icon: '📊', name: 'Data Science & Data Analytics', slug: 'data-science-analytics', desc: 'Analysis, visualization, and statistics' },
  { icon: '🖥️', name: 'Networking & System Administration', slug: 'networking-sysadmin', desc: 'Linux, servers, and network engineering' },
  { icon: '🎮', name: 'Game Development', slug: 'game-development', desc: 'Unity, Unreal Engine, and game design' },
  { icon: '⚙️', name: 'DevOps & Software Engineering', slug: 'devops-software-engineering', desc: 'CI/CD, Docker, Kubernetes, and testing' },
];

export const findCategory = (slug) => categories.find((category) => category.slug === slug);
