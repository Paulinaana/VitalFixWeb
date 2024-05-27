"use client";

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("entro")
    const requestBody = {
      email,
      password
    };

    try {
      const response = await fetch('https://back-vitalfix.onrender.com/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Guarda el token en localStorage
        login(data.id); // Usa el método login del contexto para establecer la autenticación
        setErrorMessage('');
        router.push('/'); // Redirige a la página principal
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Se produjo un error al procesar la solicitud.');
    }
  };

  return (
    <div className='w-full h-screen flex items-start flex-1 pt-36 padding-x'>
      <div className='relative w-1/2 h-full flex flex-col'>
        <div>
          <Image src="/Login.jpg" alt="Login" layout='fill' />
        </div>
      </div>

      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#060606] font-semibold'>Vitalfix</h1>

        <form onSubmit={handleSubmit} className='w-full flex flex-col max-w-[550px]'>
          <div className='w-full flex flex-col mb-2'>
            <h3 className='text-3xl font-semibold mb-2'>Ingresar</h3>
            <p className='text-base mb-2'>Bienvenido de vuelta, por favor ingresa tus datos</p>
          </div>

          <div className='w-full flex flex-col'>
            <input
              type="email"
              name="email"
              placeholder='Correo electrónico'
              value={email}
              onChange={handleChangeEmail}
              className='w-full text-black py-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
              />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder='Contraseña'
              value={password}
              onChange={handleChangePassword}
              className='w-full text-black py-2 my-2 px-4 bg-transparent border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500'
            />
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

            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline-offset-2'>¿Olvidó su contraseña?</p>
          </div>

          <div className='w-full flex flex-col my-4'>
            <button type="submit" className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
              Ingresar
            </button>
            <button type="button" onClick={() => router.push('/register')} className='w-full text-[#060606] my-2 font-semibold bg-white border-black rounded-md p-4 text-center flex items-center justify-center'>
              Registrarse
            </button>
          </div>

          <div className='w-full'>
            <p className='text-sm font-normal text-[#060606]'>¿No tienes cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer' onClick={() => router.push('/register')}>Regístrate</span></p>
          </div>

          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;