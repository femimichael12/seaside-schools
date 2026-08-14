/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Anchor, Waves, Mail, Phone, MapPin, Send, CheckCircle, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSent(true);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setIsSent(false);
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-section" className="bg-[#0F1A2C] text-white pt-16 pb-12 relative overflow-hidden">
      {/* Decorative ocean wave on dark backdrop */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C69223] via-[#E0533C] to-[#0F1A2C]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-12 border-b border-slate-800">
          
          {/* Brand & Info column */}
          <div className="lg:col-span-4 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-left focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#E0533C] text-white shadow-lg shadow-[#E0533C]/20">
                <Anchor className="w-5 h-5" />
                <Waves className="w-3.5 h-3.5 absolute bottom-1 right-1 text-[#C69223]" />
              </div>
              <div>
                <span className="block text-lg font-extrabold tracking-wider uppercase font-display leading-none text-white">
                  Seaside
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-[#C69223] leading-none mt-1">
                  Schools
                </span>
              </div>
            </button>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Seaside Schools provides pre-collegiate education for students in grades 6-12. 
              Our unique maritime curriculum unites high academic benchmarks with coastal conservation stewardship.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#C69223] flex-shrink-0" />
                <span>100 Anchor Bay Road, Shoreline Marina, CA 90210</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C69223] flex-shrink-0" />
                <span>+1 (555) OCEAN-EDU</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C69223] flex-shrink-0" />
                <a href="mailto:admissions@seasideschools.edu" className="hover:text-[#E0533C] transition-colors">
                  admissions@seasideschools.edu
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C69223]">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Campus Overview (Home)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Principal’s Welcome
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rules')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Code of Conduct & Rules
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('directory')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Faculty & Student Directories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('events')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Upcoming Campus Events
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Inquiry Form Column */}
          <div className="lg:col-span-5 bg-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#C69223]">Admissions & Contact Inquiry</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Have questions about registration or our coastal program? Send our administrative team a direct message.
            </p>

            <AnimatePresence mode="wait">
              {!isSent ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="px-4 py-2 bg-[#0F1A2C] border border-slate-800 focus:border-[#E0533C] rounded-xl text-xs focus:outline-none transition-colors text-white placeholder-slate-500 w-full"
                    />
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="px-4 py-2 bg-[#0F1A2C] border border-slate-800 focus:border-[#E0533C] rounded-xl text-xs focus:outline-none transition-colors text-white placeholder-slate-500 w-full"
                    />
                  </div>
                  <textarea
                    id="contact-message"
                    required
                    rows={3}
                    placeholder="Inquiry or Message (e.g. Seeking Grade 9 registration info...)"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2 bg-[#0F1A2C] border border-slate-800 focus:border-[#E0533C] rounded-xl text-xs focus:outline-none transition-colors text-white placeholder-slate-500 resize-none"
                  />
                  <button
                    type="submit"
                    id="btn-send-message"
                    className="w-full py-2.5 bg-[#E0533C] hover:bg-[#C8432E] text-white font-extrabold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Submit Inquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="p-4 bg-[#E0533C]/10 border border-[#E0533C]/20 rounded-2xl flex flex-col items-center text-center space-y-2"
                >
                  <CheckCircle className="w-8 h-8 text-[#E0533C]" />
                  <p className="text-xs font-bold text-[#C69223]">Message Received!</p>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    Thank you, {formData.name}. Our Seaside Admissions office will reply to **{formData.email}** within 24 business hours.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom footer bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Seaside Schools. All rights reserved. Licensed under Apache-2.0.</p>
          <div className="flex items-center space-x-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 bg-slate-900 hover:bg-[#C69223] hover:text-[#0F1A2C] text-slate-300 rounded-xl transition-all cursor-pointer flex items-center gap-1 focus:outline-none"
              aria-label="Scroll to top"
            >
              <span className="hidden sm:inline">Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
