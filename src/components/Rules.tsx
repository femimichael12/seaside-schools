/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Heart, BookOpen, Compass, Shield, Users, HelpCircle, Waves, ChevronDown, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SCHOOL_RULES } from '../data';
import { SchoolRule } from '../types';

const getRuleIcon = (name: string) => {
  switch (name) {
    case 'Heart':
      return <Heart className="w-6 h-6 text-[#E0533C]" />;
    case 'BookOpen':
      return <BookOpen className="w-6 h-6 text-[#0F1A2C]" />;
    case 'Compass':
      return <Compass className="w-6 h-6 text-[#C69223]" />;
    case 'Shield':
      return <Shield className="w-6 h-6 text-[#E0533C]" />;
    case 'Users':
      return <Users className="w-6 h-6 text-[#0F1A2C]" />;
    default:
      return <HelpCircle className="w-6 h-6 text-slate-600" />;
  }
};

const getRuleColorClass = (category: string) => {
  switch (category) {
    case 'Respect':
      return 'bg-[#E0533C]/5 border-[#E0533C]/15 text-[#E0533C]';
    case 'Academic':
      return 'bg-[#0F1A2C]/5 border-[#0F1A2C]/15 text-[#0F1A2C]';
    case 'Environment':
      return 'bg-[#C69223]/5 border-[#C69223]/15 text-[#C69223]';
    case 'Safety':
      return 'bg-[#E0533C]/5 border-[#E0533C]/15 text-[#E0533C]';
    case 'Community':
      return 'bg-[#0F1A2C]/5 border-[#0F1A2C]/15 text-[#0F1A2C]';
    default:
      return 'bg-slate-50 border-slate-100 text-slate-800';
  }
};

// Additional details for interaction
const RULE_DETAILS: Record<string, { expectations: string[]; example: string }> = {
  r1: {
    expectations: [
      'Greet peers and faculty warmly when meeting on campus paths.',
      'Active listening in class—give your full attention when someone is speaking.',
      'Constructive language: No mocking, profanity, or discriminatory jokes.',
    ],
    example: 'In group projects, encourage every member to share their ideas, validating their thoughts before offering feedback.',
  },
  r2: {
    expectations: [
      'Submit only your own original research and written works.',
      'Cite all references and sources correctly (including scientific laboratory files).',
      'No sharing of quiz or test contents with other periods.',
    ],
    example: 'During lab reports, analyze raw environmental data collected personally from our pier, rather than utilizing pre-existing online templates.',
  },
  r3: {
    expectations: [
      'Dispose of organic, trash, and marine-safe recyclables in designated shoreline bins.',
      'Do not disrupt coastal wildlife, sand dunes, or nesting shorebirds.',
      'Leave public beaches cleaner than you found them during study periods.',
    ],
    example: 'Participating in the five-minute after-lunch sweep of the outdoor cafeteria to make sure no plastics blow into the ocean.',
  },
  r4: {
    expectations: [
      'Wear approved life vests and water safety gear on the docks and school research boats.',
      'Handle laboratory glassware, acids, and chemical kits strictly according to instructor guides.',
      'Sign-in and sign-out with appropriate faculty when working in the marine lab after hours.',
    ],
    example: 'During high-tide field studies, waiting for the safety whistle and keeping track of your designated laboratory buddy.',
  },
  r5: {
    expectations: [
      'Incorporate fellow students in clubs, sports practices, and study clusters.',
      'Stand up as an active ally if you notice exclusion, bullying, or unfair treatment.',
      'Engage positively in digital forums, chatrooms, and school message boards.',
    ],
    example: 'Welcoming transfer students by inviting them to join your dining table or showing them the oceanography labs.',
  },
};

export default function Rules() {
  const [expandedRuleId, setExpandedRuleId] = useState<string | null>(null);

  const toggleRule = (id: string) => {
    setExpandedRuleId(expandedRuleId === id ? null : id);
  };

  return (
    <section id="rules" className="py-20 bg-[#FAF9F6]/90 backdrop-blur-md border-y border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-extrabold text-[#E0533C] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Waves className="w-4 h-4" /> Anchoring Our Values
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F1A2C] mt-3">
            The Seaside Code of Conduct
          </h3>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Our guidelines are designed to establish an environment where physical safety, 
            academic honor, environmental appreciation, and mutual respect thrive in harmony.
          </p>
        </div>

        {/* Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {SCHOOL_RULES.map((rule) => {
            const isExpanded = expandedRuleId === rule.id;
            const bgClass = getRuleColorClass(rule.category);
            const details = RULE_DETAILS[rule.id];

            return (
              <motion.div
                key={rule.id}
                id={`rule-card-${rule.id}`}
                layout
                className={`lg:col-span-1 border rounded-2xl p-6 transition-all shadow-sm flex flex-col justify-between cursor-pointer group bg-white/80 backdrop-blur-sm ${
                  isExpanded 
                    ? 'ring-2 ring-[#E0533C]/20 border-[#E0533C]/40 md:col-span-2 lg:col-span-3' 
                    : 'border-slate-200/60 hover:border-[#E0533C]/20 hover:shadow-md'
                }`}
                onClick={() => toggleRule(rule.id)}
              >
                <div className="space-y-4">
                  {/* Category Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded-full ${bgClass}`}>
                      {rule.category}
                    </span>
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:scale-105 transition-transform">
                      {getRuleIcon(rule.iconName)}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#E0533C] transition-colors flex items-center justify-between">
                      <span>{rule.title}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform hidden md:block ${isExpanded ? 'rotate-180' : ''}`} />
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mt-2">
                      {rule.description}
                    </p>
                  </div>

                  {/* Expanded Content */}
                  <AnimatePresence>
                    {isExpanded && details && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-slate-100 pt-4 mt-4 space-y-4"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inner content
                      >
                        {/* Expectations list */}
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5 text-[#E0533C]" /> Key Expectations:
                          </h5>
                          <ul className="space-y-1.5 pl-1">
                            {details.expectations.map((exp, idx) => (
                              <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                <span className="text-[#C69223] font-bold mt-0.5">•</span>
                                <span>{exp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Practical example */}
                        <div className="bg-[#0F1A2C]/5 p-3 rounded-xl border border-slate-200/60">
                          <p className="text-[10px] font-extrabold text-[#C69223] uppercase tracking-widest">Practice in Action</p>
                          <p className="text-xs text-slate-600 italic mt-1 leading-relaxed">
                            "{details.example}"
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer/Expand Indicator for mobile/tablet */}
                <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] text-slate-400 font-medium md:hidden">
                  <span>{isExpanded ? 'Tap to close' : 'Tap to expand details'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Safe-School Pledge Banner */}
        <div className="mt-12 p-6 md:p-8 bg-[#0F1A2C] text-white rounded-3xl relative overflow-hidden shadow-xl shadow-[#0F1A2C]/10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-48 h-48 bg-[#1E2E44]/40 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h4 className="text-lg md:text-xl font-bold">The Seaside Integrity Pledge</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                "As a member of the Seaside Schools community, I pledge to honor academic honesty, 
                respect myself and my peers, protect our marine environment, and sail through my learning 
                journey with curiosity and courage."
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="px-5 py-2.5 bg-white text-[#0F1A2C] hover:bg-slate-100 text-xs font-extrabold tracking-wider uppercase rounded-xl transition-colors inline-block text-center shadow-lg shadow-[#0F1A2C]/20">
                Upholding Excellence
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
