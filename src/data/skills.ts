import type { SkillCategory } from '@/types';

export const skills: SkillCategory[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Development',
    icon: 'Code2',
    skills: [
      'React',
      'Next.js',
      'Node.js',
      'TypeScript',
      'MongoDB',
      'PostgreSQL',
      'REST APIs',
      'GraphQL',
      'Tailwind CSS',
    ],
  },
  {
    id: 'product',
    title: 'Product Engineering',
    icon: 'Layers',
    skills: [
      'Product Strategy',
      'Sprint Planning',
      'Roadmap Design',
      'User Research',
      'Figma',
      'Cross-team Leadership',
      'Client Management',
      'OKRs',
    ],
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    icon: 'Cpu',
    skills: [
      'LLM Integration',
      'Prompt Engineering',
      'OpenAI API',
      'Anthropic API',
      'AI Features',
      'Workflow Automation',
      'RAG Systems',
    ],
  },
];
