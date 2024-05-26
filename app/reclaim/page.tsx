"use client"
import { CustomButton, CustomFilter, SearchBar } from '@/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Reclaim() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        urlAvatar: "",
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
                            email: data.email,
                            urlAvatar: data.urlAvatar || "/mujer-sonriente.jpg"
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
    
    return (
        <div className="flex">
            <aside className="flex flex-col w-64 px-5 py-20 bg-gray-100 border-r h-screen">
                <div className="flex flex-col items-center mt-16 -mx-2">
                    <Image
                        className="object-cover w-24 h-24 mx-2 rounded-full"
                        src={user.urlAvatar}
                        alt="User Avatar"
                        width={96}
                        height={96}
                    />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800">{user.name}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-800">{user.email}</p>
                </div>
                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        <a className="flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 00-8 0 4 4 0 008 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l7 7m-7-7l-7 7" />
                            </svg>
                            <span className="mx-4 font-medium" onClick={handleProfile}>Perfil</span>
                        </a>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M12 3.54l.01-.01" />
                            </svg>
                            <span className="mx-4 font-medium" onClick={handleService}>Servicios</span>
                        </a>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v14m-6-6h12" />
                            </svg>
                            <span className="mx-4 font-medium" onClick={handleReclaim}>Reclamos</span>
                        </a>
                    </nav>
                </div>
            </aside>

            <div className="flex-1 p-6 bg-gray-50">
                <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                        <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"></div>
                    </div>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reclamos</h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">Deja tu comentario sobre el servicio donde tengas problema.</p>
                    </div>
                    <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div>
                                <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">First name</label>
                                <div className="mt-2.5">
                                    <input type="text" name="first-name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">Last name</label>
                                <div className="mt-2.5">
                                    <input type="text" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="company" className="block text-sm font-semibold leading-6 text-gray-900">Company</label>
                                <div className="mt-2.5">
                                    <input type="text" name="company" id="company" autoComplete="organization" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">Email</label>
                                <div className="mt-2.5">
                                    <input type="email" name="email" id="email" autoComplete="email" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">Phone number</label>
                                <div className="relative mt-2.5">
                                    <div className="absolute inset-y-0 left-0 flex items-center">
                                        <label htmlFor="country" className="sr-only">Country</label>
                                        <select id="country" name="country" className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm">
                                            <option>US</option>
                                            <option>CA</option>
                                            <option>EU</option>
                                        </select>
                                        <svg className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <input type="tel" name="phone-number" id="phone-number" autoComplete="tel" className="block w-full rounded-md border-0 px-3.5 py-2 pl-20 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-semibold leading-6 text-gray-900">Message</label>
                                <div className="mt-2.5">
                                    <textarea name="message" id="message" className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                </div>
                            </div>
                            <div className="flex gap-x-4 sm:col-span-2">
                                <div className="flex h-6 items-center">
                                    <button type="button" className="bg-gray-200 flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" role="switch" aria-checked="false" aria-labelledby="switch-1-label">
                                        <span className="sr-only">Agree to policies</span>
                                        <span aria-hidden="true" className="translate-x-0 h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"></span>
                                    </button>
                                </div>
                                <label className="text-sm leading-6 text-gray-600" id="switch-1-label">
                                    By selecting this, you agree to our
                                    <a href="#" className="font-semibold text-indigo-600">privacy&nbsp;policy</a>.
                                </label>
                            </div>
                        </div>
                        <div className="mt-10">
                            <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Let's talk</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Reclaim;
