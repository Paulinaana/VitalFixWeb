'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    urlAvatar: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange =  (e) => {
      setFormData({ ...formData, urlAvatar: e.target.files[0] });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, urlAvatar } = formData;

    const requestBody = {
      role: 'user',
      name,
      lastname,
      email,
      password,
      urlAvatar: undefined
    };
    console.log(requestBody)
    try {
      console.log(requestBody)
      const response = await fetch('https://back-vitalfix.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      console.log(response)
      if (response.ok) {
        
        setSuccessMessage('¡Registro exitoso!');
        setErrorMessage('');
        router.push('/login');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Se produjo un error al procesar la solicitud.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='w-full min-h-screen flex items-center justify-center pt-24 pb-10 px-5'>
      <div className='w-full max-w-6xl flex flex-col sm:flex-row bg-[#f5f5f5] p-5 sm:p-0'>
        <div className='w-full sm:w-1/2 flex flex-col justify-center p-5 sm:p-10'>
          <h1 className='text-xl text-[#060606] font-semibold'>Vitalfix</h1>

          <form onSubmit={handleSubmit} className='w-full flex flex-col mt-8'>
            <div className='w-full flex flex-col mb-6'>
              <h3 className='text-3xl font-semibold mb-2'>Crear una cuenta</h3>
              <p className='text-base mb-4'>Bienvenido</p>
            </div>

            <div className='w-full flex flex-col space-y-4'>
              <input
                type="text"
                name="name"
                placeholder='Nombres'
                value={formData.name}
                onChange={handleChange}
                className='w-full text-black py-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <input
                type="text"
                name="lastname"
                placeholder='Apellidos'
                value={formData.lastname}
                onChange={handleChange}
                className='w-full text-black py-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <input
                type="email"
                name="email"
                placeholder='Correo electrónico'
                value={formData.email}
                onChange={handleChange}
                className='w-full text-black py-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
              />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder='Contraseña'
                value={formData.password}
                onChange={handleChange}
                className='w-full text-black py-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
              />
            </div>

            {/* <div className='mt-6'>
              <label htmlFor="file-upload" className='block text-sm font-medium text-gray-700'>
                Selecciona una imagen de avatar
              </label>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                onChange={handleFileChange}
                className='mt-1'
              />
              {formData.urlAvatar && (
                <p className='mt-2 text-sm text-gray-600'>Imagen seleccionada</p>
              )}
            </div> */}

            <div className='w-full flex items-center justify-between mt-6'>
              <div className='flex items-center'>
                <input
                  type="checkbox"
                  className='w-4 h-4 mr-2'
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <p className='text-sm'>Visualizar Contraseña</p>
              </div>
            </div>

            <div className='w-full flex flex-col mt-8 space-y-4'>
              <button type="submit" className='w-full text-white font-semibold bg-[#060606] rounded-md py-4 text-center flex items-center justify-center'>
                Registrarse
              </button>
              <button type="button" onClick={() => router.push('/login')} className='w-full text-[#060606] font-semibold bg-white border border-black rounded-md py-4 text-center flex items-center justify-center'>
                Ingresar
              </button>
            </div>

            <div className='w-full mt-6'>
              <p className='text-sm font-normal text-[#060606]'>¿Tienes cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer' onClick={() => router.push('/login')}>Inicia Sesión</span></p>
            </div>

            {successMessage && (
              <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mt-4" role="alert">
                <p>{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
                <p>{errorMessage}</p>
              </div>
            )}
          </form>
        </div>
        <div className='relative w-full sm:w-1/2 h-64 sm:h-auto'>
          <Image src="/registe.jpg" alt="Register Image" layout='fill' objectFit='cover' />
        </div>
      </div>
    </div>
  );
}

export default Register;
