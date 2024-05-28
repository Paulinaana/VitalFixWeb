"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function User() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    country: "Venezuela",
    address: "",
    references: "",
    city: "",
    state: "",
    zipCode: "",
    urlAvatar: "/profile.png"
  });

  const [passwordData, setPasswordData] = useState({
    password: "",
    newPassword: ""
  });

  const handleProfile = () => {
    router.push('/user');
  };

  const handleService = () => {
    router.push('/service');
  };

  const handleReclaim = () => {
    router.push('/reclaim');
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
            setUser({
              name: data.name,
              lastname: data.lastname,
              username: data.username,
              email: data.email,
              phone: data.phone,
              country: data.country,
              address: data.address,
              references: data.references,
              city: data.city,
              state: data.state,
              zipCode: data.zipCode,
              urlAvatar: data.urlAvatar || "/profile.png"
            });
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

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.id]: e.target.value });
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`https://back-vitalfix.onrender.com/api/v1/users/updatePassword/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(passwordData)
        });
        if (response.ok) {
          alert('Password updated successfully');
        } else {
          console.error('Failed to update password');
          alert('Failed to update password');
        }
      } catch (error) {
        console.error('Error updating password:', error);
        alert('Error updating password');
      }
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (userId) {
      try {
        const response = await fetch(`https://back-vitalfix.onrender.com/api/v1/users/${userId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(user)
        });
        if (response.ok) {
          alert('Profile updated successfully');
        } else {
          console.error('Failed to update profile');
          alert('Failed to update profile');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
      }
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="flex flex-col w-64 px-5 py-20 bg-gray-100 border-r h-screen">
        <div className="flex flex-col items-center mt-16 -mx-2">
          <Image
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={user.urlAvatar || '/mujer-sonriente.jpg'}
            alt="User Avatar"
            width={96}
            height={96}
          />
          <h4 className="mx-2 mt-2 font-medium text-gray-800">{user.name}</h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-800">{user.email}</p>
        </div>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            <a className="flex items-center px-4 py-2 mt-5 text-gray-100 bg-blue-700 rounded-lg" href="#">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
              <span className="mx-4 font-medium" onClick={handleProfile}>Perfil</span>
            </a>
            <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
              <span className="mx-4 font-medium" onClick={handleService}>Servicios</span>
            </a>
            <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
              <span className="mx-4 font-medium" onClick={handleReclaim}>Reclamos</span>
            </a>
          </nav>
        </div>
      </aside>
      <main className="w-full min-h-screen py-5 bg-gray-50 overflow-auto">
        <div className="p-4 md:p-8">
          <div className="w-full px-6 pb-8 bg-white rounded-lg shadow sm:max-w-2xl sm:mx-auto">
            <h2 className="text-2xl font-bold sm:text-3xl text-indigo-900">Perfil</h2>
            <div className="flex flex-col items-center mt-8 space-y-5 sm:flex-row sm:space-y-0 sm:space-x-8">
              <div className="object-cover w-40 h-40 rounded-full ring-2 ring-indigo-300">
                <Image
                  src={user.urlAvatar}
                  alt="Bordered avatar"
                  width={160}
                  height={160}
                  priority
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-3">
                <button type="button" className="px-4 py-2 text-base font-medium text-indigo-100 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Cambiar foto
                </button>
                <button type="button" className="px-4 py-2 text-base font-medium text-indigo-900 bg-white border border-indigo-200 rounded-lg hover:bg-indigo-100">
                  Eliminar foto
                </button>
              </div>
            </div>
            <form className="mt-8" onSubmit={handleSaveProfile}>
              <h3 className="text-lg font-semibold text-indigo-900">Información Personal</h3>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="names" className="block text-sm font-medium text-gray-700">Nombres</label>
                  <input type="text" id="names" value={user.name} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div>
                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Apellidos</label>
                  <input type="text" id="lastname" value={user.lastname} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div>
                {/* <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700">Usuario</label>
                  <input type="text" id="user" value={user.username} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div> */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo</label>
                  <input readonly type="email" id="email" value={user.email} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-indigo-900">Información Adicional</h3>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
                    <input type="text" id="phone" value={user.phone} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                  </div>
                  {/* <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700">País</label>
                    <select id="country" value={user.country} className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
                      <option>Venezuela</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div> */}
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
                    <input type="text" id="address" value={user.address} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                  </div>
                  <div>
                    <label htmlFor="references" className="block text-sm font-medium text-gray-700">Referencias</label>
                    <input type="text" id="references" value={user.references} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                  </div>
                  {/* <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">Ciudad</label>
                    <input type="text" id="city" value={user.city} className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div> */}
                  {/* <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">Estado</label>
                    <input type="text" id="state" value={user.state} className="block w-full px-4 py-2 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
                  </div> */}
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" className="px-4 py-2 text-base font-medium text-indigo-100 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Guardar
                </button>
              </div>
            </form>
            <form className="mt-12" onSubmit={handleUpdatePassword}>
              <h3 className="text-lg font-semibold text-indigo-900">Cambiar Contraseña</h3>
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña Actual</label>
                  <input type="password" id="password" value={passwordData.password} onChange={handlePasswordChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">Nueva Contraseña</label>
                  <input type="password" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500' />
                </div>
              </div>
              <div className="mt-8">
                <button type="submit" className="px-4 py-2 text-base font-medium text-indigo-100 bg-indigo-600 rounded-lg hover:bg-indigo-700">
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default User;
