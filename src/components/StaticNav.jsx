import React from 'react';
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
  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 text-white shadow-2xl">
      {({ open }) => (
        <>
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  className="h-16 w-16 rounded-full shadow-xl"
                  src="/sethu5.png"
                  alt="Your Company"
                />
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex ml-auto space-x-10">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'text-white bg-indigo-600 shadow-md'
                        : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                      'px-4 py-3 rounded-lg text-base font-semibold transition duration-300 ease-in-out transform hover:scale-105'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                    style={{
                      boxShadow: item.current
                        ? '0 4px 6px rgba(108, 59, 163, 0.5)'
                        : '0 2px 4px rgba(52, 87, 129, 0.2)',
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
          </div>

          {/* Mobile Navigation Menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
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
