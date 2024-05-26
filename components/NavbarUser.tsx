"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';

function NavbarUser() {
  const { isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", urlAvatar: null });
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleHome = () => {
    router.push('/');
  }

  const handleRequest = () => {
    router.push('/form');
  }

  const handleLogout = () => {
    logout(); 
  };

  const handleProfileClick = () => {
    router.push('/user');
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const response = await fetch(`https://back-vitalfix.onrender.com/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            setUser({ name: data.name, urlAvatar: data.urlAvatar });
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="w-full h-24 absolute z-10 mb-10" style={{ backgroundColor: '#0017B2' }}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-7" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="#" onClick={handleHome} className="-m-1.5 p-1.5">
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
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className={`hidden lg:flex lg:gap-x-12 ${isMenuOpen ? 'block' : 'hidden'}`}>
          {/* Agrega aquí el contenido del menú */}
          <a href="#" onClick={handleHome}><span className="text-white">Inicio</span></a>
          <a href="#" onClick={handleRequest}><span className="text-white">Solicitud de Servicios</span></a>

        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button type="button" onClick={handleLogout} className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
            <span className="absolute -inset-1.5"></span>
            <span className="sr-only">View notifications</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
          </button>
          <div className="relative ml-3">
            <div>
              <button type="button" onClick={toggleMenu} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <div className="inline-block h-10 w-10 rounded-full ring-2 ring-white">
                  <Image
                    src={user.urlAvatar || '/mujer-sonriente.jpg'}
                    alt="User Profile"
                    width={40}
                    height={40}
                    priority
                    className="rounded-full"
                  />
                </div>
              </button>
            </div>
            <div className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isMenuOpen ? 'block' : 'hidden'}`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <a href="#" onClick={handleProfileClick} className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Tu perfil</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Settings</a>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Cerrar sesión</button>
            </div>
          </div>
        </div>
      </nav>
      <div className="lg:hidden" role="dialog" aria-modal="true">
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <span>Solicitud de Servicios</span>
          <a href="#" onClick={handleHome}><span className="text-white">Inicio</span></a>
          <a href="#" onClick={handleRequest}><span className="text-white">Solicitud de Servicios</span></a>

        </div>
      </div>
    </header>
  );
}

export default NavbarUser;