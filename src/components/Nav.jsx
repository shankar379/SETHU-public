import React from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '#home', current: true },
  { name: 'About', href: '#about', current: false },
  { name: 'Curriculums', href: '#curriculums', current: false },
  { name: 'Employees', href: '#employee', current: false },
  { name: 'Achievements', href: '#achievements', current: false },
  { name: 'Colleges', href: '#colleges', current: false },
  { name: 'Contact Us', href: '#contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EnhancedNav() {
  return (
    <Disclosure as="nav" className="fixed w-full top-0 z-50 bg-gray-900 bg-opacity-95 text-white shadow-2xl">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between"> {/* Increased nav height */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-16 w-16 rounded-full shadow-lg" // Increased logo size and added shadow
                    src="/sethu5.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-8 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'text-white bg-indigo-600'
                            : 'text-gray-300 hover:bg-indigo-500 hover:text-white',
                          'px-4 py-3 rounded-md text-base font-semibold transition duration-300 ease-in-out transform hover:scale-110' // Modified padding, text size, and hover effect
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
