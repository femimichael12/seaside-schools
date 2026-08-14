/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Search, Mail, BookOpen, GraduationCap, X, Award, Waves, UserCheck, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TEACHERS_DATA, STUDENTS_DATA } from '../data';
import { Teacher, Student } from '../types';

export default function Directory() {
  const [activeTab, setActiveTab] = useState<'teachers' | 'students'>('teachers');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  
  // Modal states
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const departments = ['All', 'Sciences', 'Humanities', 'Languages', 'Arts', 'Athletics'];
  const grades = ['All', 'Grade 12', 'Grade 11', 'Grade 10'];

  // Filtering Logic
  const filteredTeachers = TEACHERS_DATA.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.role.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === 'All' || t.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  const filteredStudents = STUDENTS_DATA.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.role?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.bio.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || s.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('All');
    setSelectedGrade('All');
  };

  return (
    <section id="directory" className="py-20 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-extrabold text-[#E0533C] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Waves className="w-4 h-4" /> Academic Family
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F1A2C] mt-3">
            Who Shapes Seaside Schools
          </h3>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Meet the exceptional faculty steering our educational voyage, and the inspiring 
            students anchoring our leadership, clubs, and peer support networks.
          </p>
        </div>

        {/* Search and Tab Switclers bar */}
        <div className="bg-slate-50/80 p-4 rounded-3xl border border-slate-200/60 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Tab Switcher */}
          <div className="flex bg-slate-200/60 p-1 rounded-2xl w-full md:w-auto">
            <button
              id="tab-teachers"
              onClick={() => { setActiveTab('teachers'); clearFilters(); }}
              className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-white text-[#0F1A2C] shadow-sm font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Our Faculty ({TEACHERS_DATA.length})
            </button>
            <button
              id="tab-students"
              onClick={() => { setActiveTab('students'); clearFilters(); }}
              className={`flex-1 md:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'students'
                  ? 'bg-white text-[#0F1A2C] shadow-sm font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Student Leaders ({STUDENTS_DATA.length})
            </button>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              id="directory-search"
              type="text"
              placeholder={`Search ${activeTab === 'teachers' ? 'faculty' : 'students'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 focus:border-[#0F1A2C] rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F1A2C]/10 transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Filter Chips row */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-100 pb-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Filter:</span>
          {activeTab === 'teachers' ? (
            departments.map((dept) => (
              <button
                key={dept}
                id={`filter-dept-${dept}`}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedDepartment === dept
                    ? 'bg-[#0F1A2C] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
                }`}
              >
                {dept}
              </button>
            ))
          ) : (
            grades.map((grade) => (
              <button
                key={grade}
                id={`filter-grade-${grade}`}
                onClick={() => setSelectedGrade(grade)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  selectedGrade === grade
                    ? 'bg-[#0F1A2C] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-100'
                }`}
              >
                {grade}
              </button>
            ))
          )}
        </div>

        {/* Grid display section */}
        {activeTab === 'teachers' ? (
          filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.map((teacher) => (
                <motion.div
                  key={teacher.id}
                  id={`teacher-card-${teacher.id}`}
                  layout
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-[#E0533C]/20 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedTeacher(teacher)}
                >
                  <div className="p-6 space-y-4">
                    {/* Portrait & Title Block */}
                    <div className="flex items-start space-x-4">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-2xl object-cover border border-slate-100 flex-shrink-0 group-hover:scale-102 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] font-extrabold text-[#E0533C] bg-[#E0533C]/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {teacher.department}
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1.5 group-hover:text-[#E0533C] transition-colors">
                          {teacher.name}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">{teacher.role}</p>
                      </div>
                    </div>
                    {/* Short Bio snippet */}
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                      {teacher.bio}
                    </p>
                  </div>
                  {/* Footer Stats block */}
                  <div className="px-6 py-4 bg-[#FAF9F6] border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Exp: <strong className="text-slate-700">{teacher.yearsOfExperience} yrs</strong></span>
                    <span className="text-[#E0533C] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Profile →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl border border-slate-200/60">
              <p className="text-slate-500 text-sm">No faculty members found matching your search criteria.</p>
              <button onClick={clearFilters} className="text-xs text-[#E0533C] hover:text-[#C8432E] font-bold mt-2 underline">Clear Filters</button>
            </div>
          )
        ) : (
          filteredStudents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStudents.map((student) => (
                <motion.div
                  key={student.id}
                  id={`student-card-${student.id}`}
                  layout
                  className="bg-white/80 backdrop-blur-sm rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-lg hover:border-[#E0533C]/20 transition-all overflow-hidden flex flex-col justify-between group cursor-pointer"
                  onClick={() => setSelectedStudent(student)}
                >
                  <div className="p-6 md:p-8 space-y-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={student.image}
                        alt={student.name}
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-2xl object-cover border border-slate-100 flex-shrink-0 group-hover:scale-102 transition-transform"
                      />
                      <div>
                        <span className="text-[10px] font-extrabold text-[#E0533C] bg-[#E0533C]/5 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                          {student.grade}
                        </span>
                        {student.role && (
                          <span className="ml-2 text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            {student.role}
                          </span>
                        )}
                        <h4 className="text-lg font-bold text-slate-900 mt-2 group-hover:text-[#E0533C] transition-colors">
                          {student.name}
                        </h4>
                        <p className="text-xs text-slate-400 italic mt-1 line-clamp-1">
                          "{student.quote}"
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                      {student.bio}
                    </p>
                  </div>
                  {/* Achievements and Involvements previews */}
                  <div className="px-6 md:px-8 py-4 bg-[#FAF9F6] border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Activities: <strong className="text-slate-700">{student.involvement.length}</strong></span>
                    <span className="text-[#E0533C] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Achievements →
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#FAF9F6] rounded-2xl border border-slate-200/60">
              <p className="text-slate-500 text-sm">No student leaders found matching your search criteria.</p>
              <button onClick={clearFilters} className="text-xs text-[#E0533C] hover:text-[#C8432E] font-bold mt-2 underline">Clear Filters</button>
            </div>
          )
        )}

        {/* MODAL OVERLAY: TEACHER PROFILE */}
        <AnimatePresence>
          {selectedTeacher && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                id="teacher-modal"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200/60"
              >
                {/* Header Banner */}
                <div className="relative bg-[#0F1A2C] text-white p-6 md:p-8">
                  <button
                    id="close-teacher-modal"
                    onClick={() => setSelectedTeacher(null)}
                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedTeacher.image}
                      alt={selectedTeacher.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white/25 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-300 bg-black/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                        {selectedTeacher.department}
                      </span>
                      <h4 className="text-xl font-bold mt-1.5">{selectedTeacher.name}</h4>
                      <p className="text-xs text-slate-300">{selectedTeacher.role}</p>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Bio */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#0F1A2C]" /> Biography
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedTeacher.bio}
                    </p>
                  </div>

                  {/* Academic Degrees & Credentials */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-[#0F1A2C]" /> Education & Credentials
                    </h5>
                    <ul className="space-y-1.5 pl-1.5">
                      {selectedTeacher.degrees.map((deg, index) => (
                        <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E0533C]" />
                          <span>{deg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience & Contact */}
                  <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-5">
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Experience</h5>
                      <p className="text-sm font-semibold text-slate-800">{selectedTeacher.yearsOfExperience} Years of Instruction</p>
                    </div>
                    <div>
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Direct Contact</h5>
                      <a
                        href={`mailto:${selectedTeacher.email}`}
                        className="text-xs font-semibold text-[#E0533C] hover:text-[#C8432E] flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" /> {selectedTeacher.email}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* MODAL OVERLAY: STUDENT PROFILE */}
        <AnimatePresence>
          {selectedStudent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
              <motion.div
                id="student-modal"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-slate-200/60"
              >
                {/* Header Banner */}
                <div className="relative bg-[#0F1A2C] text-white p-6 md:p-8">
                  <button
                    id="close-student-modal"
                    onClick={() => setSelectedStudent(null)}
                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 rounded-full text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedStudent.image}
                      alt={selectedStudent.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-2xl object-cover border-2 border-white/25 flex-shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-300 bg-black/30 px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-white/10">
                        {selectedStudent.grade}
                      </span>
                      {selectedStudent.role && (
                        <span className="ml-2 text-[10px] font-extrabold text-white bg-[#E0533C] px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-white/5">
                          {selectedStudent.role}
                        </span>
                      )}
                      <h4 className="text-xl font-bold mt-1.5">{selectedStudent.name}</h4>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                  {/* Student Quote */}
                  <div className="bg-[#FAF9F6] p-4 rounded-2xl border border-slate-200/60 text-slate-700 italic text-sm text-center relative">
                    <span className="text-3xl text-[#C69223] font-serif absolute -top-2 left-3">“</span>
                    {selectedStudent.quote}
                    <span className="text-3xl text-[#C69223] font-serif absolute -bottom-5 right-3">”</span>
                  </div>

                  {/* Bio */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-[#0F1A2C]" /> About {selectedStudent.name.split(' ')[0]}
                    </h5>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedStudent.bio}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#E0533C]" /> Key Achievements
                    </h5>
                    <ul className="space-y-1.5 pl-1.5">
                      {selectedStudent.achievements.map((ach, index) => (
                        <li key={index} className="text-xs text-slate-600 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E0533C]" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Extracurriculars */}
                  <div>
                    <h5 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-[#C69223]" /> Campus Involvement
                    </h5>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {selectedStudent.involvement.map((inv, index) => (
                        <span key={index} className="text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1 rounded-xl">
                          {inv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
