import { reactive } from 'vue';
import { courses as initialCourses } from '../data/index.js';
import { createCourse, deleteCourse, getAllCourses, updateCourse } from '../services/courseApi.js';

const documentLessonsMap = {
  2: [
    {
      id: 201,
      title: '1. Introduction to Startup Valuation & Financial Models',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Introduction to Startup Valuation & Financial Models</h2>
        <p>Startup valuation differs significantly from public equity valuation because early-stage companies often lack historic revenue, steady profitability, or predictable cash flows. This document covers essential fundamentals to evaluate high-growth ventures.</p>
        
        <h3>Key Valuation Metrics</h3>
        <ul>
          <li><strong>Pre-Money Valuation:</strong> Value of the company before receiving new external investment capital.</li>
          <li><strong>Post-Money Valuation:</strong> Pre-Money Valuation + Total Investment Amount.</li>
          <li><strong>Dilution:</strong> Percentage of equity ownership given to investors in exchange for capital.</li>
        </ul>

        <h3>Common Valuation Methods for Startups</h3>
        <p>1. <strong>Berkus Method:</strong> Assigns financial value (up to $500k each) to 5 success factors: Sound Idea, Prototype, Quality Management, Strategic Relationships, and Product Rollout.</p>
        <p>2. <strong>Scorecard Valuation:</strong> Compares the target startup against average funded startups in the same sector and region across key criteria.</p>
        <p>3. <strong>Venture Capital (VC) Method:</strong> Works backwards from anticipated exit price (e.g. 5x-10x in 5 years) discounted by the required rate of return.</p>
        
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <strong>💡 Key Takeaway:</strong> Early-stage valuation is primarily negotiated based on market size (TAM), team pedigree, customer traction, and investor market dynamics.
        </div>
      `
    },
    {
      id: 202,
      title: '2. Discounted Cash Flow (DCF) & Multiples Methodology',
      type: 'text',
      order: 2,
      content: `
        <h2>2. Discounted Cash Flow (DCF) & Multiples Methodology</h2>
        <p>For revenue-generating companies with predictable growth, Discounted Cash Flow (DCF) and Trading Multiples provide quantitative rigor to financial assessments.</p>

        <h3>The DCF Formula</h3>
        <p>Enterprise Value equals the sum of discounted future Free Cash Flows (FCF) plus the discounted Terminal Value (TV):</p>
        <pre><code>PV = FCF_1 / (1 + r)^1 + FCF_2 / (1 + r)^2 + ... + (FCF_n + Terminal Value) / (1 + r)^n</code></pre>
        <p>Where <strong>r</strong> represents the Weighted Average Cost of Capital (WACC).</p>

        <h3>Valuation Multiples</h3>
        <ul>
          <li><strong>EV / ARR:</strong> Enterprise Value to Annual Recurring Revenue (dominant for SaaS & subscription models).</li>
          <li><strong>EV / EBITDA:</strong> Enterprise Value to Earnings Before Interest, Taxes, Depreciation & Amortization.</li>
          <li><strong>P / E Ratio:</strong> Price-to-Earnings ratio for profitable established businesses.</li>
        </ul>
      `
    },
    {
      id: 203,
      title: '3. Cap Table Management, Dilution & Unit Economics',
      type: 'text',
      order: 3,
      content: `
        <h2>3. Cap Table Management, Dilution & Unit Economics</h2>
        <p>A Capitalization Table (Cap Table) lists all securities issued by the startup, including common shares, preferred stock, options pool (ESOP), and convertible instruments (SAFEs/Convertible Notes).</p>

        <h3>Core Unit Economics</h3>
        <ul>
          <li><strong>CAC (Customer Acquisition Cost):</strong> Total Sales & Marketing Expenses / New Customers Acquired.</li>
          <li><strong>LTV (Customer Lifetime Value):</strong> (Average Revenue Per User × Gross Margin) / Churn Rate.</li>
          <li><strong>LTV : CAC Ratio:</strong> Benchmark target should exceed <strong>3 : 1</strong> for sustainable unit economics.</li>
          <li><strong>CAC Payback Period:</strong> Months required to recover customer acquisition costs (ideal is &lt; 12 months).</li>
        </ul>
      `
    }
  ],
  4: [
    {
      id: 401,
      title: '1. Strategic Marketing Funnel & Customer Journey',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Strategic Marketing Funnel & Customer Journey</h2>
        <p>Modern digital marketing requires a full-funnel approach connecting awareness, consideration, acquisition, retention, and referral.</p>
        
        <h3>The Modern Full-Funnel Framework</h3>
        <ol>
          <li><strong>TOFU (Top of Funnel - Awareness):</strong> Educational blog posts, short-form video, viral content, and podcast sponsorships.</li>
          <li><strong>MOFU (Middle of Funnel - Consideration):</strong> Case studies, comparison pages, webinars, whitepapers, and free tools.</li>
          <li><strong>BOFU (Bottom of Funnel - Conversion):</strong> Product demos, free trials, promotional discounts, and retargeting ads.</li>
        </ol>
      `
    },
    {
      id: 402,
      title: '2. SEO Architecture, Keyword Mapping & Content Strategy',
      type: 'text',
      order: 2,
      content: `
        <h2>2. SEO Architecture, Keyword Mapping & Content Strategy</h2>
        <p>Search Engine Optimization (SEO) builds sustainable organic traffic pipelines. A successful strategy requires technical SEO, on-page content relevance, and domain authority.</p>

        <h3>Content Pillar & Cluster Model</h3>
        <p>Organize related topics into clusters pointing to a central pillar page. This signals domain topical authority to search engine crawlers and improves indexation velocity.</p>
      `
    }
  ],
  7: [
    {
      id: 701,
      title: '1. Visual Hierarchy, Balance & Layout Principles',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Visual Hierarchy, Balance & Layout Principles</h2>
        <p>Visual hierarchy guides the viewer's eye through a composition in the intended order of importance. This document details the 6 core pillars of layout design.</p>
        
        <h3>Key Principles</h3>
        <ul>
          <li><strong>Scale & Proportion:</strong> Larger elements naturally attract immediate focal attention.</li>
          <li><strong>Contrast:</strong> Variations in color brightness, typeface weight, and shape establish visual rhythm.</li>
          <li><strong>Negative Space (White Space):</strong> Gives breathing room, separating distinct content groups and elevating luxury feel.</li>
        </ul>
      `
    },
    {
      id: 702,
      title: '2. Typography Pairing & Color Harmonies',
      type: 'text',
      order: 2,
      content: `
        <h2>2. Typography Pairing & Color Harmonies</h2>
        <p>Typography and color form the emotional voice of any visual brand.</p>

        <h3>Typography Pairing Rules</h3>
        <p>Pair a expressive Heading typeface (e.g. geometric Sans-Serif or elegant Serif) with a clean, high-legibility body typeface (e.g. Inter, Roboto, or Open Sans).</p>
      `
    }
  ],
  8: [
    {
      id: 801,
      title: '1. Semantic HTML5 & Modern Layout Architecture',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Semantic HTML5 & Modern Layout Architecture</h2>
        <p>Semantic HTML improves accessibility (a11y), SEO rankings, and clean code maintenance.</p>

        <h3>Core Semantic Elements</h3>
        <pre><code>&lt;header&gt;  - Site navigation and branding
&lt;main&gt;    - Primary unique document content
&lt;article&gt; - Self-contained syndicatable content
&lt;section&gt; - Thematic grouping of content
&lt;aside&gt;   - Complementary sidebar content
&lt;footer&gt;  - Metadata, copyright, and secondary links</code></pre>
      `
    },
    {
      id: 802,
      title: '2. Modern CSS: Flexbox & Grid Deep Dive',
      type: 'text',
      order: 2,
      content: `
        <h2>2. Modern CSS: Flexbox & Grid Deep Dive</h2>
        <p>Mastering modern CSS layout techniques eliminates the need for legacy float and positioning hacks.</p>

        <h3>When to use Flexbox vs Grid</h3>
        <ul>
          <li><strong>CSS Flexbox:</strong> Ideal for 1-dimensional layouts (either a single row or a single column). Excellent for navbars, pill tags, and vertical stacks.</li>
          <li><strong>CSS Grid:</strong> Ideal for 2-dimensional layouts (rows and columns simultaneously). Perfect for card grids, dashboards, and page scaffolding.</li>
        </ul>
      `
    },
    {
      id: 803,
      title: '3. Modern JavaScript (ES6+) Core Fundamentals',
      type: 'text',
      order: 3,
      content: `
        <h2>3. Modern JavaScript (ES6+) Core Fundamentals</h2>
        <p>Essential modern JavaScript patterns for scalable frontend and backend development.</p>

        <h3>Key ES6+ Syntax</h3>
        <pre><code>// Destructuring & Spread
const { title, price } = course;
const updatedCourse = { ...course, status: 'live' };

// Array Methods
const freeCourses = courses.filter(c => c.price === 0);
const titles = courses.map(c => c.title);

// Async / Await with Fetch
async function loadData() {
  try {
    const res = await fetch('/api/courses');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err);
  }
}</code></pre>
      `
    }
  ],
  9: [
    {
      id: 901,
      title: '1. Python Data Science Ecosystem & NumPy Reference',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Python Data Science Ecosystem & NumPy Reference</h2>
        <p>NumPy (Numerical Python) is the fundamental package for scientific computing in Python, providing multidimensional array objects and vectorised mathematical operations.</p>
        
        <h3>Essential NumPy Commands</h3>
        <pre><code>import numpy as np

# Creating Arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.zeros((3, 3))

# Vectorized Operations
result = arr * 2 + 10
mean_val = np.mean(arr)
std_dev = np.std(arr)</code></pre>
      `
    },
    {
      id: 902,
      title: '2. Pandas Data Wrangling & Cleaning Handbook',
      type: 'text',
      order: 2,
      content: `
        <h2>2. Pandas Data Wrangling & Cleaning Handbook</h2>
        <p>Pandas provides fast, flexible data structures (Series and DataFrames) designed to make working with structured tabular data intuitive.</p>
        
        <h3>Data Manipulation Cheat Sheet</h3>
        <pre><code>import pandas as pd

# Reading Data
df = pd.read_csv('dataset.csv')

# Filtering & Querying
active = df[(df['status'] == 'active') & (df['score'] > 80)]

# Aggregations
summary = df.groupby('category')['revenue'].agg(['sum', 'mean'])</code></pre>
      `
    }
  ],
  10: [
    {
      id: 1001,
      title: '1. Design Tokens: Colors, Typography & Elevation Architecture',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Design Tokens Architecture</h2>
        <p>Design tokens are the single source of truth to store visual design attributes like colors, spacing, typography scales, and animation durations.</p>
        
        <h3>Token Hierarchy</h3>
        <ul>
          <li><strong>Global Tokens:</strong> <code>color-blue-500: #3b82f6</code></li>
          <li><strong>Semantic Tokens:</strong> <code>color-action-primary: {color-blue-500}</code></li>
          <li><strong>Component Tokens:</strong> <code>button-primary-bg: {color-action-primary}</code></li>
        </ul>
      `
    },
    {
      id: 1002,
      title: '2. Building Scalable Figma Components & Variants',
      type: 'text',
      order: 2,
      content: `
        <h2>2. Building Scalable Figma Components & Variants</h2>
        <p>Learn how to structure component properties (Booleans, Text props, Instance swaps, and Variant matrices) for effortless collaboration between designers and frontend developers.</p>
      `
    }
  ],
  11: [
    {
      id: 1101,
      title: '1. Relational Database Modeling & Normalization',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Relational Database Modeling & Normalization</h2>
        <p>Proper database normalization prevents data duplication, anomalies, and inconsistencies across transactions.</p>
        
        <h3>Normal Forms</h3>
        <ul>
          <li><strong>1NF:</strong> Atomic values, no repeating groups.</li>
          <li><strong>2NF:</strong> In 1NF and all non-key attributes fully functionally dependent on primary key.</li>
          <li><strong>3NF:</strong> In 2NF and no transitive functional dependencies.</li>
        </ul>
      `
    },
    {
      id: 1102,
      title: '2. SQL Indexing & Query Optimization Strategies',
      type: 'text',
      order: 2,
      content: `
        <h2>2. SQL Indexing & Query Optimization Strategies</h2>
        <p>Indexes are data structures (typically B-Tree) that allow databases to locate specific rows quickly without scanning the entire table (Full Table Scan).</p>
      `
    }
  ],
  12: [
    {
      id: 1201,
      title: '1. Docker Fundamentals & Multi-Stage Production Builds',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Docker Fundamentals & Production Builds</h2>
        <p>Docker packages application code, runtime, system tools, and libraries into lightweight, reproducible containers.</p>

        <h3>Example Multi-Stage Dockerfile (Node/Vue)</h3>
        <pre><code># Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</code></pre>
      `
    }
  ],
  17: [
    {
      id: 1701,
      title: '1. Validating Business Ideas & Customer Discovery',
      type: 'text',
      order: 1,
      content: `
        <h2>1. Validating Business Ideas & Customer Discovery</h2>
        <p>Before writing a single line of code, top founders validate problem-solution fit through structured customer discovery interviews using The Mom Test principles.</p>
        
        <h3>Customer Discovery Rules</h3>
        <ul>
          <li>Talk about their life and past experiences, not your idea or hypothetical future.</li>
          <li>Ask about specific past behaviors rather than generic opinions.</li>
          <li>Listen 80% of the time, talk 20% of the time.</li>
        </ul>
      `
    }
  ]
};

const defaultVideoLessons = [
  { id: 1, title: 'Video Module 1: Introduction & Course Roadmap', type: 'video', content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 1 },
  { id: 2, title: 'Video Module 2: Core Deep Dive & Practical Demo', type: 'video', content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', order: 2 },
  { id: 3, title: 'Module 3: Knowledge Assessment Quiz', type: 'quiz', content: [
    { q: 'What is the recommended approach for practical mastery?', options: ['Build hands-on projects', 'Only read theory', 'Skip exercises'], answer: 'Build hands-on projects' }
  ], order: 3 }
];

const defaultDocumentLessons = [
  { id: 101, title: 'Document Module 1: Comprehensive Overview & Core Concepts', type: 'text', content: '<h2>Course Overview</h2><p>Welcome to this free document course. In this module, we explore core conceptual foundations, industry terms, and practical step-by-step methodologies.</p><h3>Key Learning Objectives</h3><ul><li>Understand the foundational framework.</li><li>Analyze industry case studies and standard models.</li><li>Implement the best practices in real-world scenarios.</li></ul>', order: 1 },
  { id: 102, title: 'Document Module 2: In-Depth Practical Reference & Handbook', type: 'text', content: '<h2>Practical Reference Guide</h2><p>This module provides actionable techniques, step-by-step checklists, and implementation guidelines for day-to-day execution.</p><div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; border-radius: 8px; margin: 20px 0;"><strong>💡 Pro Tip:</strong> Apply each concept incrementally to reinforce memory and retain mastery.</div>', order: 2 },
  { id: 103, title: 'Document Module 3: Knowledge Assessment & Summary', type: 'quiz', content: [
    { q: 'What is the primary advantage of document-based self-paced learning?', options: ['Fast searchable reference & deep focus', 'Passive listening', 'Requires live presence'], answer: 'Fast searchable reference & deep focus' }
  ], order: 3 }
];

function getCourseLessons(course) {
  if (documentLessonsMap[course.id]) {
    return documentLessonsMap[course.id];
  }
  if (course.type === 'document' || Number(course.price) === 0) {
    return defaultDocumentLessons;
  }
  return defaultVideoLessons;
}

function loadInitialCourses() {
  let stored = [];
  try {
    const raw = localStorage.getItem('course_data_v3') || localStorage.getItem('course_data');
    if (raw) stored = JSON.parse(raw);
  } catch {
    stored = [];
  }

  const storedMap = new Map((stored || []).map(c => [c.id, c]));

  const reconciled = initialCourses.map(initCourse => {
    const existing = storedMap.get(initCourse.id) || {};
    storedMap.delete(initCourse.id);
    const isDoc = initCourse.type === 'document' || Number(initCourse.price) === 0;
    return {
      ...initCourse,
      ...existing,
      type: initCourse.type,
      price: isDoc ? 0 : (existing.price ?? initCourse.price),
      originalPrice: isDoc ? 0 : (existing.originalPrice ?? initCourse.originalPrice),
      status: existing.status || 'live',
      lessons: getCourseLessons(initCourse)
    };
  });

  for (const [, customCourse] of storedMap) {
    const isDoc = customCourse.type === 'document' || Number(customCourse.price) === 0;
    reconciled.push({
      ...customCourse,
      type: isDoc ? 'document' : (customCourse.type || 'video'),
      price: isDoc ? 0 : (customCourse.price || 0),
      status: customCourse.status || 'live',
      lessons: customCourse.lessons?.length ? customCourse.lessons : (isDoc ? defaultDocumentLessons : defaultVideoLessons)
    });
  }

  return reconciled;
}

let defaultCourses = loadInitialCourses();
localStorage.setItem('course_data', JSON.stringify(defaultCourses));
localStorage.setItem('course_data_v2', JSON.stringify(defaultCourses));
localStorage.setItem('course_data_v3', JSON.stringify(defaultCourses));

export const courseStore = reactive({
  courses: defaultCourses,

  async fetchCourses() {
    const response = await getAllCourses();
    const payload = response?.data?.data || response?.data || [];
    this.courses = Array.isArray(payload) ? payload : payload.courses || [];
    this.save();
    return this.courses;
  },

  save() {
    localStorage.setItem('course_data', JSON.stringify(this.courses));
  },

  async addCourse(course) {
    const courseType = course.type || (Number(course.price) === 0 ? 'document' : 'video');
    const newCourse = {
      ...course,
      type: courseType,
      price: courseType === 'document' ? 0 : (Number(course.price) || 0),
      thumbnailUrl: course.thumbnailUrl || course.image || '',
      image: course.image || course.thumbnailUrl || '',
      published: course.published ?? course.status !== 'draft',
      lessons: [],
      status: course.status || 'draft',
      students: '0',
      rating: 0,
      reviews: 0
    };
    const response = await createCourse(newCourse);
    const payload = response?.data?.data || response?.data || response;
    const createdCourse = payload?.course || payload;
    this.courses.push({ ...newCourse, ...createdCourse });
    this.save();
    return { ...newCourse, ...createdCourse };
  },

  async updateCourse(id, updatedData) {
    const index = this.courses.findIndex(c => c.id === id);
    if (index !== -1) {
      const courseType = updatedData.type || this.courses[index].type || (Number(updatedData.price) === 0 ? 'document' : 'video');
      const nextCourse = {
        ...this.courses[index],
        ...updatedData,
        type: courseType,
        price: courseType === 'document' ? 0 : (Number(updatedData.price ?? this.courses[index].price) || 0),
        thumbnailUrl: updatedData.thumbnailUrl || updatedData.image || this.courses[index].thumbnailUrl || this.courses[index].image || '',
        image: updatedData.image || updatedData.thumbnailUrl || this.courses[index].image || this.courses[index].thumbnailUrl || '',
        published: updatedData.published ?? this.courses[index].published ?? this.courses[index].status !== 'draft',
        status: updatedData.status || this.courses[index].status || 'draft',
      };
      const response = await updateCourse(id, nextCourse);
      const payload = response?.data?.data || response?.data || response;
      this.courses[index] = { ...nextCourse, ...(payload?.course || payload) };
      this.save();
      return this.courses[index];
    }
  },

  async deleteCourse(id) {
    await deleteCourse(id);
    this.courses = this.courses.filter(c => String(c.id) !== String(id));
    this.save();
  },

  addLesson(courseId, lesson) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.lessons.push({ ...lesson, id: Date.now() });
      this.save();
    }
  },

  updateLesson(courseId, lessonId, lessonData) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      const idx = course.lessons.findIndex(l => l.id === lessonId);
      if (idx !== -1) {
        course.lessons[idx] = { ...course.lessons[idx], ...lessonData };
        this.save();
      }
    }
  },

  deleteLesson(courseId, lessonId) {
    const course = this.courses.find(c => c.id === courseId);
    if (course) {
      course.lessons = course.lessons.filter(l => l.id !== lessonId);
      this.save();
    }
  }
});
