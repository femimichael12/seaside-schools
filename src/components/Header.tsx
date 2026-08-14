/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Waves, Menu, X, Anchor, ArrowRight, LogIn, LogOut, User as UserIcon, Check, HelpCircle, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  auth, 
  signInWithGoogle, 
  logoutUser, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  User 
} from '../lib/firebase';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [sandboxUser, setSandboxUser] = useState<{ displayName: string; email: string; photoURL: string | null } | null>(null);
  const activeUser = user || sandboxUser;
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Email and Password Credentials States
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [displayNameInput, setDisplayNameInput] = useState('');
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Welcome' },
    { id: 'rules', label: 'Code of Conduct' },
    { id: 'directory', label: 'Faculty & Students' },
    { id: 'events', label: 'Campus Life' },
  ];

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setIsMobileMenuOpen(false);
  };

  const handleGoogleSignIn = async () => {
    setIsSigningIn(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
      setIsLoginModalOpen(false);
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'auth/unauthorized-domain') {
        setAuthError(
          'Unauthorized Domain Error: The current domain is not authorized in your Firebase console. Please add this URL to your Firebase Authentication -> Settings -> Authorized Domains list.'
        );
      } else {
        setAuthError('Authentication with Google failed. Please try again.');
      }
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      setSandboxUser(null);
      setIsUserMenuOpen(false);
    } catch (err: any) {
      console.error(err);
    }
  };

  const handleEmailPasswordAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setAuthError('Please fill in all credentials fields.');
      return;
    }

    setIsSigningIn(true);
    setAuthError(null);

    // Intelligently build the email address if user types a pure username
    let email = usernameInput.trim();
    if (!email.includes('@')) {
      email = `${email.toLowerCase().replace(/\s+/g, '')}@seasideschools.edu`;
    }

    try {
      if (isSignUpMode) {
        if (!displayNameInput.trim()) {
          setAuthError('Please enter your display name to register.');
          setIsSigningIn(false);
          return;
        }
        // Create user
        const result = await createUserWithEmailAndPassword(auth, email, passwordInput);
        // Set display name
        await updateProfile(result.user, {
          displayName: displayNameInput.trim()
        });
      } else {
        // Sign in user
        await signInWithEmailAndPassword(auth, email, passwordInput);
      }

      // Reset inputs & close modal
      setUsernameInput('');
      setPasswordInput('');
      setDisplayNameInput('');
      setIsLoginModalOpen(false);
    } catch (err: any) {
      console.error(err);
      let readableError = 'Authentication failed. Please verify credentials.';
      if (err.code === 'auth/wrong-password') {
        readableError = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/user-not-found') {
        readableError = 'No account found with this username or email.';
      } else if (err.code === 'auth/email-already-in-use') {
        readableError = 'This username or email is already registered.';
      } else if (err.code === 'auth/invalid-email') {
        readableError = 'Please enter a valid username or email.';
      } else if (err.code === 'auth/weak-password') {
        readableError = 'Password is too weak. Please use at least 6 characters.';
      }
      setAuthError(readableError);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF9F6]/95 backdrop-blur-md shadow-sm border-b border-[#0F1A2C]/10 py-3'
            : 'bg-[#FAF9F6]/30 backdrop-blur-xs py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo Brand */}
            <button
              id="brand-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#0F1A2C] text-white transition-all duration-300 group-hover:scale-105 shadow-md shadow-[#0F1A2C]/15">
                <Anchor className="w-5 h-5 text-white" />
                <Waves className="w-3.5 h-3.5 absolute bottom-1 right-1 text-[#E0533C]" />
              </div>
              <div className="text-left">
                <span className="block text-lg font-extrabold tracking-wider text-[#0F1A2C] group-hover:text-[#E0533C] transition-colors uppercase font-display leading-none">
                  Seaside
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-[#C69223] leading-none mt-1">
                  Schools
                </span>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'text-[#0F1A2C] font-bold'
                        : 'text-slate-600 hover:text-[#0F1A2C] hover:bg-slate-100/50'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#E0533C]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Call to Action & Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                id="cta-admission"
                onClick={() => handleNavClick('events')}
                className="px-4 py-2 bg-[#0F1A2C] hover:bg-[#1E2E44] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-1"
              >
                <span>Join Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {activeUser ? (
                /* Authenticated User Menu */
                <div className="relative">
                  <button
                    id="user-profile-menu-btn"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-[#E0533C]/40 p-1.5 pr-3.5 rounded-full transition-all focus:outline-none cursor-pointer"
                  >
                    {activeUser.photoURL ? (
                      <img
                        src={activeUser.photoURL}
                        alt={activeUser.displayName || 'User'}
                        className="w-7 h-7 rounded-full object-cover border border-slate-100"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 bg-[#E0533C] text-white text-xs font-bold rounded-full flex items-center justify-center">
                        {activeUser.displayName ? activeUser.displayName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <span className="text-xs font-bold text-slate-700 max-w-[100px] truncate">
                      {activeUser.displayName || 'Account'}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        id="user-menu-dropdown"
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2.5 w-64 bg-white border border-slate-200/80 rounded-2xl shadow-xl overflow-hidden py-2.5 z-50"
                      >
                        <div className="px-4 py-3 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {activeUser.displayName || 'Seaside Member'}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate mt-0.5">
                            {activeUser.email || ''}
                          </p>
                        </div>
                        <div className="p-1">
                          <button
                            id="logout-btn"
                            onClick={handleLogout}
                            className="w-full text-left px-3.5 py-2 hover:bg-slate-50 text-xs font-semibold text-rose-600 rounded-xl transition-colors cursor-pointer flex items-center gap-2"
                          >
                            <LogOut className="w-3.5 h-3.5" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                /* Unauthenticated Sign In Button */
                <button
                  id="header-signin-btn"
                  onClick={() => setIsLoginModalOpen(true)}
                  className="px-4 py-2 bg-[#E0533C] hover:bg-[#C8432E] text-white text-xs font-semibold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              {activeUser && (
                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                  {activeUser.photoURL ? (
                    <img
                      src={activeUser.photoURL}
                      alt={activeUser.displayName || 'User'}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E0533C] text-white text-xs font-bold flex items-center justify-center">
                      {activeUser.displayName ? activeUser.displayName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
              )}
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-nav-container"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-[#FAF9F6] border-b border-slate-200 shadow-lg overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => handleNavClick(item.id)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-[#0F1A2C]/5 text-[#0F1A2C] font-bold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-[#0F1A2C]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
                <div className="pt-4 border-t border-slate-200 space-y-2.5">
                  <button
                    id="mobile-cta-admission"
                    onClick={() => handleNavClick('events')}
                    className="w-full py-3 bg-[#0F1A2C] hover:bg-[#1E2E44] text-white font-semibold rounded-xl text-center shadow-md transition-colors block"
                  >
                    Admissions Information
                  </button>
                  {activeUser ? (
                    <button
                      id="mobile-logout-btn"
                      onClick={handleLogout}
                      className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl text-center transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  ) : (
                    <button
                      id="mobile-signin-btn"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setIsLoginModalOpen(true);
                      }}
                      className="w-full py-3 bg-[#E0533C] hover:bg-[#C8432E] text-white font-semibold rounded-xl text-center shadow-md transition-colors flex items-center justify-center gap-1.5"
                    >
                      <LogIn className="w-4 h-4" /> Sign In with Gmail
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* LOGIN MODAL OVERLAY */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="absolute inset-0 bg-[#0F1A2C]/60 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-slate-200/60 shadow-2xl p-6 md:p-8 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Decorative wave background */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-50/40 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-50/40 rounded-full blur-3xl pointer-events-none" />

              <div className="relative text-left space-y-6">
                {/* Brand Logo & Title */}
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-[#0F1A2C] text-white shadow-lg">
                      <Anchor className="w-6 h-6 text-white" />
                      <Waves className="w-3.5 h-3.5 absolute bottom-1 right-1 text-[#E0533C]" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0F1A2C]">
                      {isSignUpMode ? 'Create Seaside Account' : 'Welcome to Seaside Portal'}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                      {isSignUpMode 
                        ? 'Join our coastal academy network of educators and alumni.' 
                        : 'Sign in to access student reports, course schedules, and academy info.'}
                    </p>
                  </div>
                </div>

                {/* Auth Mode Tabs */}
                <div className="flex border-b border-slate-100 p-0.5 bg-slate-50 rounded-xl">
                  <button
                    onClick={() => { setIsSignUpMode(false); setAuthError(null); }}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                      !isSignUpMode 
                        ? 'bg-white text-[#0F1A2C] shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => { setIsSignUpMode(true); setAuthError(null); }}
                    className={`flex-1 py-2 text-center text-xs font-bold rounded-lg transition-all ${
                      isSignUpMode 
                        ? 'bg-white text-[#0F1A2C] shadow-sm' 
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    Register
                  </button>
                </div>

                {authError && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 text-xs text-left font-medium space-y-3">
                    <p>{authError}</p>
                    {authError.includes('Unauthorized Domain') && (
                      <div className="pt-2 border-t border-rose-200/50 space-y-2">
                        <p className="font-bold text-[10px] text-slate-500 uppercase tracking-wider">💡 Quick Bypasses for Preview/Testing:</p>
                        <ol className="list-decimal pl-4 space-y-1 text-slate-600 text-[11px]">
                          <li>Click the <strong className="text-slate-800">Register</strong> tab right above to sign up with any custom username/password. Credential logins bypass domain checks entirely!</li>
                          <li>Tap the bypass button below to immediately sign in as a simulated Google/Gmail user.</li>
                        </ol>
                        <button
                          type="button"
                          id="sandbox-bypass-btn"
                          onClick={() => {
                            setSandboxUser({
                              displayName: 'Demo Scholar',
                              email: 'scholar@seasideschools.edu',
                              photoURL: null
                            });
                            setAuthError(null);
                            setIsLoginModalOpen(false);
                          }}
                          className="w-full mt-2 py-2.5 px-3 bg-[#E0533C] hover:bg-[#C8432E] text-white text-[11px] font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                        >
                          ⚡ Bypass & Sign in with Sandbox Mode (Demo)
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Email / Username and Password Form */}
                <form onSubmit={handleEmailPasswordAuth} className="space-y-4">
                  {isSignUpMode && (
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          id="signup-fullname-input"
                          type="text"
                          required
                          placeholder="E.g. Michael Ademusiwa"
                          value={displayNameInput}
                          onChange={(e) => setDisplayNameInput(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E0533C]/40 focus:bg-white rounded-xl text-xs font-medium text-slate-800 transition-colors focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Username or Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-username-input"
                        type="text"
                        required
                        placeholder="E.g. michael or name@example.com"
                        value={usernameInput}
                        onChange={(e) => setUsernameInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E0533C]/40 focus:bg-white rounded-xl text-xs font-medium text-slate-800 transition-colors focus:outline-none"
                      />
                    </div>
                    {!usernameInput.includes('@') && usernameInput.trim() && (
                      <p className="text-[10px] text-slate-400 italic">
                        Signing in as: <strong className="text-slate-600">{usernameInput.trim().toLowerCase()}@seasideschools.edu</strong>
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Password</label>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        id="signin-password-input"
                        type="password"
                        required
                        placeholder="••••••••"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 focus:border-[#E0533C]/40 focus:bg-white rounded-xl text-xs font-medium text-slate-800 transition-colors focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    id="credentials-auth-submit-btn"
                    type="submit"
                    disabled={isSigningIn}
                    className="w-full py-3 bg-[#0F1A2C] hover:bg-[#1E2E44] text-white text-xs font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-[#0F1A2C]/10"
                  >
                    {isSigningIn ? (
                      <div className="w-4 h-4 border-2 border-white/35 border-t-white rounded-full animate-spin" />
                    ) : (
                      <LogIn className="w-3.5 h-3.5" />
                    )}
                    <span>{isSigningIn ? 'Processing...' : isSignUpMode ? 'Register Account' : 'Sign In to Portal'}</span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">Or</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                {/* Google Sign-In Button */}
                <button
                  id="google-signin-action-btn"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="w-full py-3 px-4 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2.5 transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69c-.29 1.5-.14 3.01-1.3 4a12.21 12.21 0 0 1-5.39 1.48C6.3 19.6 1.8 15.1 1.8 9.5S6.3-.6 12-.6c2.72 0 5.17.97 7.07 2.76l3-3C19.24-3.5 15.82-4.8 12-4.8c-7.73 0-14 6.27-14 14s6.27 14 14 14c7.32 0 13.74-5.3 13.74-14z"
                      transform="matrix(.85714 0 0 .85714 1.714 1.714)"
                    />
                  </svg>
                  <span>Sign in with Gmail / Google</span>
                </button>

                {/* Toggle sign in/up link */}
                <p className="text-center text-[11px] text-slate-500">
                  {isSignUpMode ? 'Already have a portal credentials account? ' : "Don't have a credentials account? "}
                  <button
                    onClick={() => { setIsSignUpMode(!isSignUpMode); setAuthError(null); }}
                    className="text-[#E0533C] font-bold hover:underline focus:outline-none cursor-pointer"
                  >
                    {isSignUpMode ? 'Sign In' : 'Register Here'}
                  </button>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
