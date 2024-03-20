import { CustomButton, Hero } from '@/components'
import Testimonials from '@/components/Testimonials'
import Image from 'next/image'
import React from 'react'

function login() {
  return (

    <div className='w-full h-screen flex items-start flex-1 pt-36 padding-x'>
      

      <div className='w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between'>
        <h1 className='text-xl text-[#060606] font-semibold'>Vitalfix</h1>


        <div className='w-full flex flex-col max-w-[550px]'>
        <div className='w-full flex flex-col mb-2'>
          <h3 className='text-3xl font-semibold mb-2'>Crear una cuenta</h3>
          <p className='text-base mb-2'>Bienvenido</p>
        </div>

        <div className='w-full flex flex-col'>
        <input
            type="text"
            placeholder='Nombres'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
        <input
            type="text"
            placeholder='Apellidos'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
        <input
            type="text"
            placeholder='Nombre de Usuario'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
          <input
            type="email"
            placeholder='Correo electrónico'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
          <input
            type="password"
            placeholder='Contraseña'
            className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
          />
        </div>

        <div className='w-full flex items-center justify-between'>
          <div className='w-full flex items-center'>
            <input type="checkbox" className='w-4 h-4 mr-2' />
            <p className='text-sm'>Visualizar Contraseña</p>
          </div>
        </div>

        <div className='w-full flex flex-col my-4'>
          <button className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
            Registrarse
          </button>
          <button className='w-full text-[#060606] my-2 font-semibold bg-white border-black rounded-md p-4 text-center flex items-center justify-center'>
            Ingresar
          </button>
        </div>


        <div className='w-full'>
          <p className='text-sm font-normal text-[#060606]'>¿Tienes cuenta? <span className='font-semibold underline underline-offset-2 cursor-pointer'>Inicia Sesión</span></p>
        </div>

      </div>
      </div>
      <div className='relative w-1/2 h-full flex flex-col'>
        {/* <div className='absolute top-[20px] left-[10%] flex flex-col mt-10 z-30'>
          <h1 className='login__title'>Consigue la mejor asistencia</h1>
          <p className='login__subtitle'>Registrate y consigue los mejores precios</p>
        </div> */}
        <div >
          <Image src="/registe.jpg" alt="Login" layout='fill'  />
        </div>
      </div>
    </div>
    

  )
}

export default login