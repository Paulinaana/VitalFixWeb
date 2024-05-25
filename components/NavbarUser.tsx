"use client"

import { useState } from "react";
import Image from "next/image";
import CustomButton from "./CustomButton";
import { useAuth } from "@/context/AuthContext";


function NavbarUser() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // localStorage.removeItem('token'); // Eliminar el token de localStorage
    // router.push('/login');

  };

  return (
    <header className="w-full h-24 absolute z-10" style={{ backgroundColor: '#0017B2' }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-7" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <Image 
              src="/Logo2.png"
              alt="Stickerly-logo"
              width={90}
              height={8}
              className="object-contain"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button type="button" onClick={toggleMenu} className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className={`hidden lg:flex lg:gap-x-12 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {/* Agrega aquí el contenido del menú */}
          <span>a</span>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" onClick={handleLogout} className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <div className="relative ml-3">
            <div>
              <button type="button" onClick={toggleMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <div className=" inline-block h-10 w-10 rounded-full ring-2 ring-white">
                  <Image
                    src="/mujer-sonriente.jpg"
                    alt="Prueba"
                    width={135}
                    height={33}
                    priority
                    className="rounded-full"
                  />
                </div>          
              </button>
            </div>
            <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMenuOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Your Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</a>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Sign out</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          
          <span>e</span>
          {/* Agrega aquí el contenido del menú desplegable para dispositivos móviles */}
        </div>
      </div>
    </header>
  );
}

export default NavbarUser;