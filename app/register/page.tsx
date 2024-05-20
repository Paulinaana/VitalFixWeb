'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

const Register = () => {
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
      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#060606] font-semibold'>Vitalfix</h1>

        <form onSubmit={handleSubmit} className='w-full flex flex-col max-w-[550px]'>
          <div className='w-full flex flex-col mb-2'>
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
          )}

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

export default Register;