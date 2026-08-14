/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Teacher, Student, SchoolRule, SchoolEvent } from './types';

export const TEACHERS_DATA: Teacher[] = [
  {
    id: 't1',
    name: 'Dr. Marina Vance',
    role: 'Head of Marine Sciences & AP Biology',
    department: 'Sciences',
    bio: 'With over a decade of research in marine ecology, Dr. Vance brings the living ocean directly into the classroom. She leads our weekly tide-pool excursions and student marine biology research projects.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'm.vance@seasideschools.edu',
    yearsOfExperience: 12,
    degrees: ['B.S. in Marine Biology (UCSB)', 'M.S. in Ecology', 'Ph.D. in Oceanography (Scripps)']
  },
  {
    id: 't2',
    name: 'Arthur Pendleton',
    role: 'History & Maritime Heritage Instructor',
    department: 'Humanities',
    bio: 'Mr. Pendleton specializes in coastal trade history and modern civics. He is passionate about helping students connect historical waves with current global issues, and coordinates the annual mock trial.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'a.pendleton@seasideschools.edu',
    yearsOfExperience: 15,
    degrees: ['B.A. in History (Yale)', 'M.A. in Secondary Education']
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'English Literature & Creative Writing Chair',
    department: 'Languages',
    bio: 'Ms. Rostova believes that words, like the tides, have immense power. She sponsors the Seaside Literary Gazette and runs workshop sessions that help students discover their unique creative voices.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'e.rostova@seasideschools.edu',
    yearsOfExperience: 8,
    degrees: ['B.A. in English (Middlebury)', 'M.F.A. in Creative Writing (Iowa)']
  },
  {
    id: 't4',
    name: 'Coach Kai Tanaka',
    role: 'Director of Athletics & Sailing Master',
    department: 'Athletics',
    bio: 'A former competitive sailor, Coach Tanaka oversees Seaside\'s physical education and sailing program. Under his guidance, the Seaside Seagulls sailing team has won three consecutive regional regattas.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'k.tanaka@seasideschools.edu',
    yearsOfExperience: 6,
    degrees: ['B.S. in Kinesiology (UH Mānoa)', 'US Sailing Level 3 Certified Coach']
  },
  {
    id: 't5',
    name: 'Chloe Mercier',
    role: 'Fine Arts & Coastal Ceramics Instructor',
    department: 'Arts',
    bio: 'Mrs. Mercier uses nature as her primary medium, teaching students painting, sculpting, and pottery inspired by the coastal landscape. She is the curator of our end-of-year beachside art exhibition.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    email: 'c.mercier@seasideschools.edu',
    yearsOfExperience: 10,
    degrees: ['B.F.A. in Fine Arts (RISD)', 'M.F.A. in Studio Art']
  }
];

export const STUDENTS_DATA: Student[] = [
  {
    id: 's1',
    name: 'Maya Lin',
    grade: 'Grade 12',
    role: 'Student Council President',
    achievements: ['National Merit Semifinalist', 'Ocean Guardian Youth Grant Recipient', 'Varsity Sailing Captain'],
    quote: 'The ocean reminds us that we are part of something much greater. At Seaside, we learn to lead with responsibility, curiosity, and respect for our environment.',
    bio: 'Maya is a senior who excels in both biochemistry and community leadership. When she is not organizing school events, she conducts independent research on macroalgae and serves as helmsman on the school’s sailing crew.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
    involvement: ['Oceanography Club', 'Varsity Sailing', 'Student Senate']
  },
  {
    id: 's2',
    name: 'Liam Sterling',
    grade: 'Grade 11',
    role: 'Science Olympiad Captain',
    achievements: ['State Science Fair Gold Medalist', 'Lifeguard Certification', 'Swim Team MVP'],
    quote: 'Curiosity is our compass, and scientific integrity is our anchor. I love exploring the intersections of engineering and environmental science here.',
    bio: 'Liam has designed a low-cost water quality sensor now deployed off our school pier. He enjoys competitive swimming, water polo, and tutoring younger students in physics and mathematics.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
    involvement: ['STEM League', 'Varsity Swimming', 'Peer Tutoring']
  },
  {
    id: 's3',
    name: 'Sophia Al-Jamil',
    grade: 'Grade 12',
    role: 'Arts Coordinator',
    achievements: ['Scholastic Art & Writing Gold Key', 'Coastal Mural Designer', 'Literary Magazine Editor-in-Chief'],
    quote: 'Creative expression is how we make sense of our world. Painting the coast has taught me to appreciate the fluid, changing nature of our community.',
    bio: 'Sophia recently spearheaded a student collaborative mural project in the central pavilion. She is an aspiring illustrator who designs posters for our theatrical plays and compiles the annual Seaside Literary Magazine.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400',
    involvement: ['Creative Writing Circle', 'Symphonic Band', 'Fine Arts Guild']
  },
  {
    id: 's4',
    name: 'Ethan Cross',
    grade: 'Grade 10',
    role: 'Sophomore Representative',
    achievements: ['Coastal Conservation Outstanding Youth Award', 'Debate League Outstanding Novice Medalist'],
    quote: 'Small ripples of action eventually create waves of positive change. Every volunteer hour counts!',
    bio: 'Ethan organized the "Clean Shores" campus-wide campaign, which eliminated single-use plastics from our dining hall. He is an avid surfer, public speaker, and marine conservation enthusiast.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    involvement: ['Surf Club', 'Debate Society', 'Green Campus Coalition']
  }
];

export const SCHOOL_RULES: SchoolRule[] = [
  {
    id: 'r1',
    category: 'Respect',
    title: 'Respect and Compassion',
    description: 'Treat teachers, school staff, peers, and campus visitors with kindness and dignity. Maintain an open mind, value diverse viewpoints, and solve conflicts through peaceful dialog.',
    iconName: 'Heart'
  },
  {
    id: 'r2',
    category: 'Academic',
    title: 'Intellectual Integrity',
    description: 'Engage in original and authentic learning. Plagiarism, cheating, or unauthorized assistance in any form contradicts the foundation of academic growth. Lift up classmates through helpful collaboration.',
    iconName: 'BookOpen'
  },
  {
    id: 'r3',
    category: 'Environment',
    title: 'Stewardship of the Shore',
    description: 'Our campus is nested in a fragile coastal ecosystem. Avoid littering, active participation in our sorting/recycling program is required, and treat all coastal flora, fauna, and marine life with protection and care.',
    iconName: 'Compass'
  },
  {
    id: 'r4',
    category: 'Safety',
    title: 'Safe Sailing & Conduct',
    description: 'Arrive to class and maritime activities on time. Follow safety protocols, especially near the ocean laboratory, docks, and during field studies. Report any hazardous situations to faculty immediately.',
    iconName: 'Shield'
  },
  {
    id: 'r5',
    category: 'Community',
    title: 'Inclusive Waves',
    description: 'Construct a positive community culture. Bullying, cyberbullying, exclusions, and harassment are strictly prohibited. Foster inclusive spaces on campus, in student residences, and online.',
    iconName: 'Users'
  }
];

export const UPCOMING_EVENTS: SchoolEvent[] = [
  {
    id: 'e1',
    day: '04',
    month: 'SEP',
    title: 'Autumn Term Orientation',
    time: '09:00 AM - 12:00 PM',
    location: 'Seaside Amphitheater',
    category: 'Academic'
  },
  {
    id: 'e2',
    day: '18',
    month: 'SEP',
    title: 'Coastal Conservation Beach Clean-up',
    time: '01:00 PM - 04:30 PM',
    location: 'School Beach & Lab Dock',
    category: 'Community'
  },
  {
    id: 'e3',
    day: '12',
    month: 'OCT',
    title: 'Annual Seaside Fall Regatta',
    time: '10:00 AM - 04:00 PM',
    location: 'Marina Bay & Jetty course',
    category: 'Sports'
  },
  {
    id: 'e4',
    day: '23',
    month: 'OCT',
    title: 'Maritime Arts Exhibition & Concert',
    time: '06:00 PM - 08:30 PM',
    location: 'Oceanus Pavilion Lobby',
    category: 'Arts'
  }
];
