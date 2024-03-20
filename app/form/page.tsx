import { CustomButton, CustomFilter, SearchBar } from '@/components'
import Image from 'next/image'
import React from 'react'

function form(){
    return (
        <div className='w-full h-screen flex items-start flex-1 pt-36 '>
            <div className='relative h-full flex flex-col '>
                <div className='flex-1 pt-10 padding-x'>
                    <h1 className='about__title'>
                        Solicitud de Servicio
                    </h1>
                    <p className='about__subtitle text-[20px]'>
                    Entendemos que su tiempo es valioso. Este sistema ha sido creado para hacer la experiencia lo más fácil posible, así como para ahorrarle tiempo y dinero. 
                    Si tiene un equipo que necesita reparación, instalacion o mantenimiento, rellene el siguiente formulario. Evaluaremos su solicitud y determinaremos la opción más rápida y económica para su equipo.
                    </p>
                </div>
            <form className='mt-2 padding-x padding-y w-auto'>
                <div className="shadow-lg rounded p-10 flex w-auto h-full flex-row">
                    <div className="border-b border-gray-900/10 pb-12 w-auto">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Información del Producto</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Esta información es útil para la estimación.</p>

                        <div className="sm:col-span-3 mt-8">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Detalles del Equipo</label>
                        <div className="mt-2">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Fabricante</label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm"></span>
                            <input type="text" name="username" id="username" className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                            </div>
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Modelo</label>
                        <div className="mt-2">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Número de Serial</label>
                        <div className="mt-2">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="mt-6 col-span-full">
                        <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Descripción del Equipo</label>
                        <div className="mt-2">
                            <textarea id="about" name="about" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                        </div>
                        <p className="mt-3 text-sm leading-6 text-gray-600">Escribe los detalles del la situacion del equipo.</p>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">Fotos</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                            </svg>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span>Subir un archivo</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">o arrastra y suelta</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div className="border-b border-gray-900/10 pb-12 ml-72">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Información Personal</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Utilice una dirección permanente en la que pueda recibir el servicio.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                        <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">Nombres</label>
                        <div className="mt-2">
                            <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Apellidos</label>
                        <div className="mt-2">
                            <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Correo Electronico</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Teléfono</label>
                        <div className="mt-2">
                            <input type="text" name="last-name" id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-3">
                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">País</label>
                        <div className="mt-2">
                            <select id="country" name="country" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                            <option>Venezuela</option>
                            <option>Canada</option>
                            <option>Mexico</option>
                            </select>
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Dirección</label>
                        <div className="mt-2">
                            <input type="text" name="street-address" id="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">Referencias</label>
                        <div className="mt-2">
                            <input type="text" name="street-address" id="street-address" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Ciudad</label>
                        <div className="mt-2">
                            <input type="text" name="city" id="city"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">Estado</label>
                        <div className="mt-2">
                            <input type="text" name="region" id="region" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>

                        <div className="sm:col-span-2">
                        <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">ZIP / Codigo Postal</label>
                        <div className="mt-2">
                            <input type="text" name="postal-code" id="postal-code"  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6" />
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div className=" flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancelar</button>
                    <a href='/payment' className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">Enviar</a>
                </div>
            </form>
            </div>
        </div>

    )
}

export default form