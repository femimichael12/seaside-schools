/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Teacher {
  id: string;
  name: string;
  role: string;
  department: 'Sciences' | 'Humanities' | 'Languages' | 'Arts' | 'Athletics';
  bio: string;
  image: string;
  email: string;
  yearsOfExperience: number;
  degrees: string[];
}

export interface Student {
  id: string;
  name: string;
  grade: string;
  role?: string; // e.g. "Student Council President", "Valedictorian"
  achievements: string[];
  quote: string;
  bio: string;
  image: string;
  involvement: string[]; // e.g. ["Oceanography Club", "Varsity Sailing", "Debate Team"]
}

export interface SchoolRule {
  id: string;
  category: 'Respect' | 'Academic' | 'Safety' | 'Environment' | 'Community';
  title: string;
  description: string;
  iconName: string; // Used to reference a Lucide icon
}

export interface SchoolEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  category: 'Academic' | 'Sports' | 'Community' | 'Arts';
}
