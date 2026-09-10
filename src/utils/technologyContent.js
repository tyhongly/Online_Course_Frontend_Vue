const technologyCategories = new Set([
  'ai',
  'artificial intelligence',
  'cloud computing',
  'cybersecurity',
  'data science',
  'database',
  'design',
  'development',
  'devops',
  'game development',
  'mobile development',
  'networking',
  'programming languages',
  'system administration',
  'technology',
  'ui/ux',
  'ui/ux & graphic design',
  'web development'
]);

const technologyKeywords = /ai|algorithm|api|cloud|code|computer|cyber|data|database|devops|docker|figma|frontend|full[- ]stack|html|javascript|kubernetes|linux|machine learning|mobile|network|programming|python|react|security|server|software|sql|system administration|typescript|ui\/?ux|web development|vue/i;

export const isTechnologyCourse = (course) => {
  const category = String(course?.category || course?.categoryName || '').trim().toLowerCase();
  const title = String(course?.title || '');
  return technologyCategories.has(category) || technologyKeywords.test(`${title} ${category}`);
};
