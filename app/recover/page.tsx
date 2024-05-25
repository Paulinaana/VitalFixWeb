'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

const Recover = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    username: '',
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
    setFormData({ ...formData, [name]: value });
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Cambia esto por tu preset de Cloudinary

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setFormData({ ...formData, urlAvatar: data.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, lastname, email, password, urlAvatar } = formData;

    const requestBody = {
      role: 'user',
      name,
      lastname,
      email,
      password,
      urlAvatar
    };

    try {
      const response = await fetch('https://back-vitalfix.onrender.com/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

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
    <div className='w-full h-screen flex items-start flex-1 pt-36 padding-x'>
      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20'>
        <h1 className='text-xl text-[#060606] font-semibold'>Vitalfix</h1>

        <form onSubmit={handleSubmit} className='w-full flex flex-col max-w-[650px] pt-20'>
          {/* <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2'>Crear una cuenta</h3>
            <p className='text-base mb-2'>Bienvenido</p>
          </div>

          <div className='w-full flex flex-col'>
            <input
              type="text"
              name="name"
              placeholder='Nombres'
              value={formData.name}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
            />
            <input
              type="text"
              name="lastname"
              placeholder='Apellidos'
              value={formData.lastname}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
            />
            <input
              type="text"
              name="username"
              placeholder='Nombre de Usuario'
              value={formData.username}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
            />
            <input
              type="email"
              name="email"
              placeholder='Correo electrónico'
              value={formData.email}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Contraseña'
              value={formData.password}
              onChange={handleChange}
              className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
            />
          </div>

          <div {...getRootProps()} className='w-full border-dashed border-2 border-gray-300 p-4 mt-4 cursor-pointer'>
            <input {...getInputProps()} />
            {formData.urlAvatar ? (
              <p className='text-center'>Imagen seleccionada</p>
            ) : (
              <p className='text-center'>Arrastra y suelta una imagen, o haz clic para seleccionar una</p>
            )}
          </div>

          <div className='w-full flex items-center justify-between'>
            <div className='w-full flex items-center'>
              <input
                type="checkbox"
                className='w-4 h-4 mr-2'
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <p className='text-sm'>Visualizar Contraseña</p>
            </div>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button type="submit" className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
              Registrarse
            </button>
            <button type="button" onClick={() => router.push('/login')} className='w-full text-[#060606] my-2 font-semibold bg-white border-black rounded-md p-4 text-center flex items-center justify-center'>
              Ingresar
            </button>
          </div>

          <div className='w-full'>
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
          )} */}


        <div className="rounded-xl border border-gray-200 bg-white shadow-sm w-full flex flex-col mb-20">
            <div className="p-9 sm:p-9">
              <div className="text-center">
                <div className="mb-4 inline-block rounded-full bg-blue-200 p-2 text-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                </div>
                <h1 className="block text-2xl font-bold text-gray-800">¿Olvido la contraseña?</h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Remember your password?
                  <a className="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                     Inicia sesión aquí
                  </a>
                </p>              </div>

              <div className="mt-6">
                
                  <div className="grid gap-y-4">
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm text-gray-600">Email address</label>
                      <div className="relative">
                        <input value="invalidemail" type="email" id="email" name="email" className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500" required aria-describedby="email-error" />
                        <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                          <svg className="h-5 w-5 text-rose-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                          </svg>
                        </div>
                        <p className="mt-2 hidden text-xs text-rose-600 peer-invalid:block" id="email-error">Valid email address required for the account recovery process</p>
                      </div>
                    </div>

                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-blue-500 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Cambiar contraseña</button>
                  </div>
                
              </div>
            </div>
          </div>

        </form>
      </div>
      <div className='relative w-1/2 h-full flex flex-col'>
        <div>
          <Image src="/registe.jpg" alt="Login" layout='fill' />
        </div>
      </div>
    </div>
  );
}

export default Recover;