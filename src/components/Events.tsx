/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Calendar, MapPin, Clock, Waves, ChevronRight, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UPCOMING_EVENTS } from '../data';

export default function Events() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Academic', 'Sports', 'Community', 'Arts'];

  const filteredEvents = UPCOMING_EVENTS.filter((e) => {
    return selectedCategory === 'All' || e.category === selectedCategory;
  });

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Academic': return 'bg-[#0F1A2C]/5 text-[#0F1A2C] border-[#0F1A2C]/15';
      case 'Sports': return 'bg-[#E0533C]/5 text-[#E0533C] border-[#E0533C]/15';
      case 'Community': return 'bg-[#C69223]/5 text-[#C69223] border-[#C69223]/15';
      case 'Arts': return 'bg-[#E0533C]/5 text-[#E0533C] border-[#E0533C]/15';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <section id="events" className="py-20 bg-[#FAF9F6]/90 backdrop-blur-md border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-sm font-extrabold text-[#E0533C] uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Waves className="w-4 h-4" /> Campus Horizon
          </h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-[#0F1A2C] mt-3">
            Campus Life & Events
          </h3>
          <p className="text-lg text-slate-500 mt-4 leading-relaxed">
            Keep pace with our active tide-pool explorations, varsity sailing regattas, 
            academic workshops, and beach clean-up assemblies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline of Events */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4 mb-2">
              <h4 className="text-lg font-bold text-slate-900">Upcoming Calendar</h4>
              {/* Filter Row */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    id={`filter-event-cat-${cat}`}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0F1A2C] text-white'
                        : 'bg-white hover:bg-slate-50 text-slate-500 border border-slate-200/60'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    id={`event-row-${event.id}`}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="p-5 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#E0533C]/20 transition-colors"
                  >
                    {/* Left: Date Badge & Title Info */}
                    <div className="flex items-start gap-4">
                      {/* Calendar Icon styled as dynamic calendar page */}
                      <div className="flex-shrink-0 w-14 h-14 bg-[#0F1A2C]/5 border border-[#0F1A2C]/10 rounded-xl flex flex-col items-center justify-center text-center shadow-sm">
                        <span className="text-[10px] font-extrabold text-[#C69223] uppercase tracking-widest">{event.month}</span>
                        <span className="text-xl font-black text-slate-800 leading-tight">{event.day}</span>
                      </div>
                      <div>
                        <span className={`inline-block text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border mb-1 ${getCategoryColor(event.category)}`}>
                          {event.category}
                        </span>
                        <h5 className="text-base font-bold text-slate-900">{event.title}</h5>
                        {/* Time & Location subheadings */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" /> {event.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {event.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex-shrink-0 flex items-center justify-end border-t border-slate-50 pt-3 sm:pt-0 sm:border-none">
                      <button className="text-xs font-bold text-[#E0533C] hover:text-[#C8432E] flex items-center gap-1 cursor-pointer">
                        Add to Calendar <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* School Announcements & Newsletter Card */}
          <div className="lg:col-span-4 space-y-6">
            {/* Announcements Card */}
            <div className="bg-[#0F1A2C] text-white p-6 md:p-8 rounded-3xl shadow-lg border border-white/5">
              <h4 className="text-lg font-bold flex items-center gap-1.5"><MessageSquare className="w-5 h-5 text-[#E0533C]" /> Shoreline Notes</h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-2">
                Stay updated with live school announcements directly from the academic board.
              </p>

              <div className="space-y-4 mt-6">
                <div className="border-l-2 border-[#E0533C] pl-3">
                  <p className="text-[10px] font-bold text-[#C69223] uppercase tracking-widest">Enrollment Open</p>
                  <p className="text-xs font-semibold mt-0.5 leading-relaxed text-slate-200">Applications for Fall Term are accepted through October 1st.</p>
                </div>
                <div className="border-l-2 border-[#E0533C] pl-3">
                  <p className="text-[10px] font-bold text-[#C69223] uppercase tracking-widest">Sailing Team</p>
                  <p className="text-xs font-semibold mt-0.5 leading-relaxed text-slate-200">Varsity registration and physical exams begin next Monday at the boathouse.</p>
                </div>
              </div>
            </div>

            {/* Newsletter form Card */}
            <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-slate-200/60 shadow-sm">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-1.5"><Calendar className="w-4.5 h-4.5 text-[#0F1A2C]" /> Parent Newsletter</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1.5">
                Subscribe to **The Seaside Beacon**, our weekly newsletter detailing achievements, schedules, and tide-pool insights.
              </p>

              <AnimatePresence mode="wait">
                {!isSubscribed ? (
                  <motion.form
                    key="sub-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubscribe}
                    className="mt-4 space-y-3"
                  >
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 focus:border-[#0F1A2C] rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#0F1A2C]/10 transition-all text-slate-800"
                    />
                    <button
                      type="submit"
                      id="btn-subscribe"
                      className="w-full py-2.5 bg-[#E0533C] hover:bg-[#C8432E] text-white text-xs font-extrabold tracking-wider uppercase rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Subscribe Now</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="sub-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="mt-6 p-4 bg-[#0F1A2C]/5 border border-[#0F1A2C]/10 rounded-2xl flex flex-col items-center text-center space-y-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-[#E0533C] animate-bounce" />
                    <p className="text-xs font-bold text-[#0F1A2C]">Successfully Subscribed!</p>
                    <p className="text-[10px] text-slate-700 leading-relaxed">
                      Thank you! You have been added to **The Seaside Beacon** directory list. Expect our next issue soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
