/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Waves, GraduationCap, Heart, Leaf, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

export default function Welcome() {
  const pillars = [
    {
      icon: <GraduationCap className="w-6 h-6 text-[#0F1A2C]" />,
      title: 'Academic Excellence',
      desc: 'Rigorous preparatory curricula integrated with marine biology, coastal science, and classical humanities.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-[#C69223]" />,
      title: 'Ecological Stewardship',
      desc: 'Hands-on ocean exploration, conservation initiatives, and a deep respect for our maritime community.',
    },
    {
      icon: <Heart className="w-6 h-6 text-[#E0533C]" />,
      title: 'Mindful Character',
      desc: 'Developing empathy, social awareness, and ethical integrity to anchor personal choices and relationships.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-white/90 backdrop-blur-md relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-extrabold text-[#E0533C] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Waves className="w-4 h-4 animate-pulse" /> Welcome to Our Shore
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F1A2C] mt-3">
            Principal’s Message & Philosophy
          </h3>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Welcome to **Seaside Schools**, where we combine comprehensive academic prep with 
            the restorative and analytical nature of our coastal home.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Principal Welcome Card */}
          <div className="lg:col-span-7 bg-slate-50/70 p-8 md:p-10 rounded-3xl border border-slate-200/60 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C69223]/10 rounded-full blur-2xl -z-10" />
            
            <div className="flex items-center space-x-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
                alt="Principal Dr. Arthur Sterling"
                referrerPolicy="no-referrer"
                className="w-16 h-16 rounded-full border-2 border-[#E0533C] object-cover"
              />
              <div>
                <h4 className="text-lg font-bold text-slate-900">Dr. Arthur Sterling</h4>
                <p className="text-xs font-semibold text-[#0F1A2C]">Principal, Seaside Schools</p>
              </div>
            </div>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm md:text-base">
              <p>
                Dear Students, Parents, and Visitors,
              </p>
              <p>
                It is my privilege to welcome you to **Seaside Schools**. Nestled directly on the ocean shore, 
                our unique campus is far more than a backdrop—it is a live, dynamic classroom that fosters 
                scientific inquiry, artistic inspiration, and physical resilience.
              </p>
              <p>
                We believe that learning is an adventure. Our curriculum blends highly rigorous college-prep standards 
                with oceanography, maritime history, and sustainable stewardship. In our classrooms and 
                along our tide pools, we guide students to navigate complexities with a sharp mind, a compass of integrity, 
                and an open, compassionate heart.
              </p>
              <p>
                Whether you are a prospective family looking for a nurturing academic haven, or a member of our 
                esteemed alumni community, we welcome you to our shores. Join us in cultivating curiosity, responsibility, 
                and lifelong achievement.
              </p>
              <p className="font-semibold text-slate-900 pt-2">
                Warm regards,
              </p>
              <p className="font-display italic text-[#E0533C] font-extrabold">
                Dr. Arthur Sterling
              </p>
            </div>
          </div>

          {/* Pillars List */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="text-xl font-bold text-slate-900 tracking-tight">Our Educational Anchors</h4>
            <p className="text-sm text-slate-500 leading-relaxed">
              Every student at Seaside is guided by three core anchors, structuring their educational progress and personal conduct:
            </p>

            <div className="space-y-4 pt-2">
              {pillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="p-5 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl shadow-sm hover:border-[#E0533C]/20 transition-all flex items-start space-x-4"
                >
                  <div className="p-3 bg-slate-50 rounded-xl flex-shrink-0">
                    {pillar.icon}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-slate-900">{pillar.title}</h5>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Warning Message about Rules */}
            <div className="p-4 bg-[#0F1A2C]/5 border border-[#0F1A2C]/10 rounded-2xl flex items-start space-x-3">
              <ShieldAlert className="w-5 h-5 text-[#E0533C] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#0F1A2C]">Important Note</p>
                <p className="text-[11px] text-slate-700 leading-relaxed mt-0.5">
                  All students are expected to uphold the **Seaside Code of Conduct**. Review our core guidelines below to help keep our coastal community respectful, safe, and academically honest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
