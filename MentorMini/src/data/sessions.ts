import { Session } from '../types';

export const mockSessions: Session[] = [
  // Mathematics sessions
  {
    id: 'ss1',
    lessonId: 'l1',
    date: '2025-01-10',
    topic: 'Introduction to Algebra',
    summary:
      'Covered variables, constants, and basic algebraic expressions. Student demonstrated good understanding of solving for x in single-variable equations.',
  },
  {
    id: 'ss2',
    lessonId: 'l1',
    date: '2025-01-17',
    topic: 'Quadratic Equations',
    summary:
      'Introduced the quadratic formula. Worked through 8 practice problems. Student struggled initially with negative discriminants — will revisit next session.',
  },
  {
    id: 'ss3',
    lessonId: 'l1',
    date: '2025-01-24',
    topic: 'Graphing Functions',
    summary:
      'Explored linear and quadratic graphs on the coordinate plane. Student showed strong spatial reasoning skills.',
  },
  // Physics sessions
  {
    id: 'ss4',
    lessonId: 'l2',
    date: '2025-01-12',
    topic: "Newton's Laws of Motion",
    summary:
      "Reviewed all three of Newton's laws with real-world examples. Conducted a thought experiment on friction and inertia. Student engaged well with the material.",
  },
  {
    id: 'ss5',
    lessonId: 'l2',
    date: '2025-01-19',
    topic: 'Velocity and Acceleration',
    summary:
      'Worked through kinematic equations. Introduced velocity-time graphs and how to derive distance from the area under the curve.',
  },
  // English sessions
  {
    id: 'ss6',
    lessonId: 'l3',
    date: '2025-01-11',
    topic: 'Essay Structure',
    summary:
      'Covered introduction, body paragraph, and conclusion structure. Student wrote a short practice essay on environmental conservation.',
  },
  {
    id: 'ss7',
    lessonId: 'l3',
    date: '2025-01-18',
    topic: 'Literary Devices',
    summary:
      'Introduced metaphor, simile, alliteration, and personification. Analysed examples from classic literature. Student particularly enjoyed the poetry examples.',
  },
  // Chemistry sessions
  {
    id: 'ss8',
    lessonId: 'l4',
    date: '2025-01-13',
    topic: 'The Periodic Table',
    summary:
      'Learned how to read the periodic table — atomic number, mass, and element groups. Focused on the first 20 elements.',
  },
];