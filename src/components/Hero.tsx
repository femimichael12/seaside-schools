/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BookOpen, Award, Compass, School } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onLearnMore: () => void;
}

export default function Hero({ onLearnMore }: HeroProps) {
  // Path to the image we generated with generate_image
  const heroImagePath = '/src/assets/images/seaside_school_hero_1786703419703.jpg';

  const stats = [
    {
      id: 'stat-ratio',
      icon: <School className="w-5 h-5 text-[#0F1A2C]" />,
      value: '12:1',
      label: 'Student-Teacher Ratio',
    },
    {
      id: 'stat-placement',
      icon: <Award className="w-5 h-5 text-[#E0533C]" />,
      value: '100%',
      label: 'College Placement',
    },
    {
      id: 'stat-eco',
      icon: <Compass className="w-5 h-5 text-[#C69223]" />,
      value: '25+',
      label: 'Coastal Field Programs',
    },
    {
      id: 'stat-classes',
      icon: <BookOpen className="w-5 h-5 text-[#E0533C]" />,
      value: '100%',
      label: 'Academic Integrity',
    },
  ];

  return (
    <section 
      id="home-section" 
      className="relative pt-28 pb-20 md:py-36 bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/image.png')" }}
    >
      {/* Premium Dark and Sophisticated Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1A2C]/95 via-[#0F1A2C]/85 to-[#0F1A2C]/60 z-0" />

      {/* Decorative Wave Graphics */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-24 text-[#FAF9F6] fill-current"
          viewBox="0 0 1440 74"
          preserveAspectRatio="none"
        >
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-[#E0533C] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Enrollment Open 2026 / 2027
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Where Learning Meets the{' '}
              <span className="text-[#E0533C] relative inline-block">
                Horizon
                <svg className="absolute -bottom-2 left-0 w-full h-2.5 text-[#E0533C]/40 fill-current" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,0 Q50,10 100,0 L100,10 L0,10 Z" />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-200/95 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Nurturing minds, inspiring hearts, and building futures. At **Seaside Schools**, 
              we combine academic excellence with coastal discovery to cultivate the leaders of tomorrow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                id="hero-explore-btn"
                onClick={onLearnMore}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#E0533C] hover:bg-[#C8432E] text-white font-semibold rounded-xl shadow-lg shadow-[#E0533C]/20 transition-all text-center cursor-pointer"
              >
                Welcome Message
              </button>
              <a
                href="#rules"
                id="hero-rules-link"
                className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 border border-white/35 text-white font-semibold rounded-xl transition-all text-center"
              >
                School Rules
              </a>
            </motion.div>
          </div>

          {/* Premium Glassmorphic Academy Card (Image is in Section Background) */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl p-8 bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl space-y-6"
            >
              <div className="inline-flex p-3 bg-white/10 rounded-2xl border border-white/20">
                <School className="w-8 h-8 text-[#C69223]" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">A Heritage of Maritime Excellence</h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                Our beautiful multi-story academy offers students an inspiring environment where academic rigor meets coastal discovery, fully integrated with state-of-the-art facilities.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0533C]" />
                  <span>Ranked Top 10 Coastal Academies in the State</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C69223]" />
                  <span>Fully Accredited Western Maritime Program</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E0533C]" />
                  <span>Comprehensive Oceanographic Research Labs</span>
                </div>
              </div>
            </motion.div>

            {/* Decorative background shape */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#C69223]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#E0533C]/10 rounded-full blur-3xl -z-10" />
          </div>
        </div>

        {/* Stats Section */}
        <div id="stats-container" className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              id={stat.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 shadow-xl hover:bg-white/15 hover:border-white/25 transition-all flex flex-col items-center text-center"
            >
              <div className="p-3 bg-white/10 rounded-xl mb-3">{stat.icon}</div>
              <p className="text-2xl md:text-3xl font-extrabold text-white">{stat.value}</p>
              <p className="text-xs font-medium text-slate-300 mt-1 uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
