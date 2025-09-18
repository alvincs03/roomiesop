'use client'

import { useState } from 'react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-gray-800 shadow-sm border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                Roomies<span className="text-primary-500">Op</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              Home
            </a>
            <a href="#listings" className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              Chores
            </a>
            <a href="#about" className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              About
            </a>
            <a href="#contact" className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-300 hover:text-primary-400 px-3 py-2 text-sm font-medium transition-colors">
              Sign In
            </button>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-primary-400 focus:outline-none focus:text-primary-400"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 border-t border-gray-700">
              <a href="#home" className="text-gray-300 hover:text-primary-400 block px-3 py-2 text-base font-medium">
                Home
              </a>
              <a href="#listings" className="text-gray-300 hover:text-primary-400 block px-3 py-2 text-base font-medium">
                Chores
              </a>
              <a href="#about" className="text-gray-300 hover:text-primary-400 block px-3 py-2 text-base font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-300 hover:text-primary-400 block px-3 py-2 text-base font-medium">
                Contact
              </a>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <button className="text-gray-300 hover:text-primary-400 block px-3 py-2 text-base font-medium w-full text-left">
                  Sign In
                </button>
                <button className="bg-primary-600 text-white block px-3 py-2 text-base font-medium w-full text-center rounded-lg mt-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
