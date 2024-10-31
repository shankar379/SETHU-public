import React, { useState, useEffect } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'About', href: '#about', current: false },
  { name: 'Achievements', href: '#achievements', current: false },
  { name: 'Colleges', href: '#colleges', current: false },
  { name: 'Review', href: '#StaticReviews', current: false },
  { name: 'Contact Us', href: '#contact', current: false },
  { name: 'Admin Login', href: '/login', current: false },
  { name: 'Employee Login', href: '/employee-login', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EnhancedNav() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState(navigation[0]);

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Disclosure as="nav" className={`fixed w-full top-0 z-50 text-white transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      {({ open }) => (
        <>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0a0b1e] via-[#1c0f2e] to-[#0a0b1e] backdrop-blur-md bg-opacity-50 shadow-lg">
            <div className="flex items-center">
              <img
                className="h-16 w-16 rounded-full shadow-xl"
                src="/sethu5.png"
                alt="Your Company"
              />
            </div>

            <div className="hidden sm:flex ml-auto space-x-10">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleLinkClick(item)}
                  className={classNames(
                    item === activeLink
                      ? 'text-white bg-indigo-600 shadow-md'
                      : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                    'px-6 py-3 rounded-lg text-base font-semibold transition duration-300 ease-in-out transform hover:scale-105 relative'
                  )}
                  aria-current={item === activeLink ? 'page' : undefined}
                  style={{
                    boxShadow: item === activeLink
                      ? '0 4px 20px rgba(10, 132, 255, 0.5), 0 8px 40px rgba(10, 132, 255, 0.5)'
                      : '0 2px 10px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
              <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-indigo-200 hover:text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-900">
                <span className="sr-only">Open main menu</span>
                {open ? (
                  <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                )}
              </Disclosure.Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 bg-gradient-to-r from-[#0a0b1e] via-[#1c0f2e] to-[#0a0b1e] bg-opacity-50">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  onClick={() => handleLinkClick(item)}
                  className={classNames(
                    item === activeLink
                    ? 'bg-[#1c0e4e] text-white' // Dark blue on active
                    : 'text-gray-300 hover:bg-[#1c0e4e] hover:text-white', // Darker blue on hover
                  'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item === activeLink ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
