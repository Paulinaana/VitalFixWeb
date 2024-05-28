"use client"
import { CustomButton, CustomFilter, SearchBar } from '@/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function serviceInfo(){
    const userId = localStorage.getItem('userId');
    const router = useRouter();
    const searchParams = useSearchParams();
    const request_id = searchParams.get('id');
    console.log("eeee", request_id)
    const [user, setUser] = useState({
        name: "",
        email: "",
        urlAvatar: "",
    });

    const [requests, setRequests] = useState([]);

    const handleProfile = () => {
        router.push('/user');
    }
    
    const handleService = () => {
        router.push('/service');
    }

    const handleReclaim = () => {
        router.push('/reclaim');
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');
            console.log(userId)
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

        const fetchRequests = async () => {
            console.log(localStorage.getItem('token'))
            try {
                const response = await fetch(`https://back-vitalfix.onrender.com/api/v1/requests/${request_id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log("ejele el data")
                    console.log(data)
                    setRequests(data);
                    console.log(setRequests)
                    console.log(requests)

                } else {
                    console.error('Failed to fetch requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        console.log(requests)
        fetchUserData();
        fetchRequests();
    }, []);

  return (
    <div className="flex">
        <aside className="flex flex-col w-64 px-5 py-20 bg-gray-100 border-r h-screen">
                <div className="flex flex-col items-center mt-16 -mx-2">
                    <Image
                        className="object-cover w-24 h-24 mx-2 rounded-full"
                        src={user.urlAvatar || '/profile.png'}
                        alt="User Avatar"
                        width={96}
                        height={96}
                    />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800">{user.name}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-800">{user.email}</p>
                </div>
                <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-lg hover:bg-blue-700 hover:text-gray-100" href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="mx-4 font-medium" onClick={handleProfile}>Perfil</span>
                    </a>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-100 bg-blue-700 rounded-lg" href="#">
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

        

    <div className="bg-white">
    
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
    
        <div className="fixed inset-0 bg-black bg-opacity-25"></div>

        <div className="fixed inset-0 z-40 flex">
        
        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
            <button type="button" className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>

            {/* <!-- Links --> */}
            <div className="mt-2">
            <div className="border-b border-gray-200">
                <div className="-mb-px flex space-x-8 px-4" aria-orientation="horizontal" role="tablist">
                {/* <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" --> */}
                <button id="tabs-1-tab-1" className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium" aria-controls="tabs-1-panel-1" role="tab" type="button">Women</button>
                {/* <!-- Selected: "border-indigo-600 text-indigo-600", Not Selected: "border-transparent text-gray-900" --> */}
                <button id="tabs-1-tab-2" className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium" aria-controls="tabs-1-panel-2" role="tab" type="button">Men</button>
                </div>
            </div>

            {/* <!-- 'Women' tab panel, show/hide based on tab state. --> */}
            <div id="tabs-1-panel-1" className="space-y-12 px-4 pb-6 pt-10" aria-labelledby="tabs-1-tab-1" role="tabpanel">
                <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                    <div>
                    <p id="mobile-featured-heading-0" className="font-medium text-gray-900">Featured</p>
                    <ul role="list" aria-labelledby="mobile-featured-heading-0" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Sleep</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Swimwear</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Underwear</a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <p id="mobile-categories-heading" className="font-medium text-gray-900">Categories</p>
                    <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Basic Tees</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Artwork Tees</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Bottoms</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Underwear</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Accessories</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                    <div>
                    <p id="mobile-collection-heading" className="font-medium text-gray-900">Collection</p>
                    <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Everything</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Core</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">New Arrivals</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Sale</a>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <p id="mobile-brand-heading" className="font-medium text-gray-900">Brands</p>
                    <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Full Nelson</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">My Way</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Re-Arranged</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Counterfeit</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Significant Other</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            {/* <!-- 'Men' tab panel, show/hide based on tab state. --> */}
            <div id="tabs-1-panel-2" className="space-y-12 px-4 pb-6 pt-10" aria-labelledby="tabs-1-tab-2" role="tabpanel">
                <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                    <div>
                    <p id="mobile-featured-heading-1" className="font-medium text-gray-900">Featured</p>
                    <ul role="list" aria-labelledby="mobile-featured-heading-1" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Casual</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Boxers</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Outdoor</a>
                        </li>
                    </ul>
                    </div>
                    <div>
                    <p id="mobile-categories-heading" className="font-medium text-gray-900">Categories</p>
                    <ul role="list" aria-labelledby="mobile-categories-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Artwork Tees</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Pants</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Accessories</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Boxers</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Basic Tees</a>
                        </li>
                    </ul>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                    <div>
                    <p id="mobile-collection-heading" className="font-medium text-gray-900">Collection</p>
                    <ul role="list" aria-labelledby="mobile-collection-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Everything</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Core</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">New Arrivals</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Sale</a>
                        </li>
                    </ul>
                    </div>

                    <div>
                    <p id="mobile-brand-heading" className="font-medium text-gray-900">Brands</p>
                    <ul role="list" aria-labelledby="mobile-brand-heading" className="mt-6 space-y-6">
                        <li className="flex">
                        <a href="#" className="text-gray-500">Significant Other</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">My Way</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Counterfeit</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Re-Arranged</a>
                        </li>
                        <li className="flex">
                        <a href="#" className="text-gray-500">Full Nelson</a>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Company</a>
            </div>
            <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Stores</a>
            </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Create an account</a>
            </div>
            <div className="flow-root">
                <a href="#" className="-m-2 block p-2 font-medium text-gray-900">Sign in</a>
            </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            {/* <!-- Currency selector --> */}
            <form>
                <div className="inline-block">
                <label htmlFor="mobile-currency" className="sr-only">Currency</label>
                <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                    <select id="mobile-currency" name="currency" className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800">
                    <option>CAD</option>
                    <option>USD</option>
                    <option>AUD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                    </svg>
                    </div>
                </div>
                </div>
            </form>
            </div>
        </div>
        </div>
    </div>

    
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 mt-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ordenes</h1>

        <div className="mt-2 border-b border-gray-200 pb-5 text-sm sm:flex sm:justify-between">
        <dl className="flex">
            <dt className="text-gray-500">Orden&nbsp;</dt>
            <dd className="font-medium text-gray-900">W086438695</dd>
            <dt>
            <span className="sr-only">Fecha</span>
            <span className="mx-2 text-gray-400" aria-hidden="true">&middot;</span>
            </dt>
            <dd className="font-medium text-gray-900"><time dateTime="2021-03-22">{requests.createdAt}</time></dd>
        </dl>
        <div className="mt-4 sm:mt-0">
            {/* <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            View invoice
            <span aria-hidden="true"> &rarr;</span>
            </a> */}

            <div>
            <span className="py-1 px-2 inline-flex text-sm items-center gap-x-1 font-medium bg-teal-100 text-teal-800 rounded-full dark:bg-teal-500/10 dark:text-teal-500">
                <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
                </svg>
                {requests.status}
            </span>
            </div>
        </div>
        </div>

        <section aria-labelledby="products-heading" className="mt-8">
        <h2 id="products-heading" className="sr-only">Products purchased</h2>

        <div className="space-y-24">
            <div className="grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            <div className="sm:col-span-4 md:col-span-5 md:row-span-2 md:row-end-2">
                <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-50">
                {/* <img src="https://tailwindui.com/img/ecommerce-images/confirmation-page-04-product-01.jpg" alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade." className="object-cover object-center"> */}
                    <div>
                        <Image 
                        width={335}
                        height={93} 
                        src="/monitor.jpg" 
                        alt="Off-white t-shirt with circular dot illustration on the front of mountain ridges that fade." 
                        className="object-cover object-center" />
                    </div>
                </div>
            </div>
            <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                <h3 className="text-lg font-bold text-gray-900">
                <a href="#">Monitor Vital</a>
                </h3>
                <p className="mt-1 font-medium text-blue-600">Mantenimiento</p>
                <p className="mt-1 font-medium text-gray-900">$66</p>
                <p className="mt-3 text-gray-500">{requests.details}</p>
            </div>
            <div className="sm:col-span-12 md:col-span-7">
                <dl className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                <div>
                    <dt className="font-medium text-gray-900">Direccion del servicio</dt>
                    <dd className="mt-3 text-gray-500">
                    <span className="block">{requests.address}</span>
                    
                    </dd>
                </div>
                <div>
                    <dt className="font-medium text-gray-900">Datos del cliente</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                    <p>{requests.email}</p>
                    <p>{requests.phone}</p>
                    </dd>
                </div>
                </dl>
                <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900">Total de la orden</dt>
                <dd className="font-medium text-indigo-600">$46.75</dd>
                </div>                
                {/* <div className="mt-6">
                <div className="overflow-hidden rounded-full bg-gray-200">
                    <div className="h-2 rounded-full bg-indigo-600"></div>
                </div>
                <div className="mt-6 hidden grid-cols-4 font-medium text-gray-600 sm:grid">
                    <div className="text-indigo-600">Order placed</div>
                    <div className="text-center text-indigo-600">Processing</div>
                    <div className="text-center">Shipped</div>
                    <div className="text-right">Delivered</div>
                </div>
                </div> */}
            </div>
            </div>

            {/* <!-- More products... --> */}
        </div>
        </section>

        {/* <!-- Billing --> */}
        <section aria-labelledby="summary-heading" className="mt-10">
        {/* <h2 id="summary-heading" className="sr-only">Billing Summary</h2> */}

        <div className="rounded-lg bg-gray-50 px-6 py-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-0 lg:py-8">
            <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-5 lg:pl-8">
            <div>
                <dt className="font-medium text-gray-900">Garantia</dt>
                <dd className="mt-3 text-gray-500">
                <span className="block">6 meses</span>
                <span className="block">25 de Octubre de 2024</span>
                <span className="py-1 px-2 inline-flex items-center gap-x-1 text-xs bg-gray-300 text-gray-800 rounded-full">
                        <svg className="flex-shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
                        <line x1="12" x2="12" y1="2" y2="12"></line>
                        </svg>
                        Sin garantia
                </span>
                </dd>
            </div>
            <div>
                <dt className="font-medium text-gray-900">Informacion de Pago</dt>
                <dd className="mt-3 flex">
                <div>
                    {/* <svg aria-hidden="true" width="36" height="24" viewBox="0 0 36 24" className="h-6 w-auto">
                    <rect width="36" height="24" rx="4" fill="#224DBA" />
                    <path d="M10.925 15.673H8.874l-1.538-6c-.073-.276-.228-.52-.456-.635A6.575 6.575 0 005 8.403v-.231h3.304c.456 0 .798.347.855.75l.798 4.328 2.05-5.078h1.994l-3.076 7.5zm4.216 0h-1.937L14.8 8.172h1.937l-1.595 7.5zm4.101-5.422c.057-.404.399-.635.798-.635a3.54 3.54 0 011.88.346l.342-1.615A4.808 4.808 0 0020.496 8c-1.88 0-3.248 1.039-3.248 2.481 0 1.097.969 1.673 1.653 2.02.74.346 1.025.577.968.923 0 .519-.57.75-1.139.75a4.795 4.795 0 01-1.994-.462l-.342 1.616a5.48 5.48 0 002.108.404c2.108.057 3.418-.981 3.418-2.539 0-1.962-2.678-2.077-2.678-2.942zm9.457 5.422L27.16 8.172h-1.652a.858.858 0 00-.798.577l-2.848 6.924h1.994l.398-1.096h2.45l.228 1.096h1.766zm-2.905-5.482l.57 2.827h-1.596l1.026-2.827z" fill="#fff" />
                    </svg>
                    <p className="sr-only">Visa</p> */}
                </div>
                <div className="ml-4">
                    <p className="text-gray-600">Tipo de Pago:</p>
                    <p className="text-gray-600">34467577</p>
                    
                </div>
                </dd>
            </div>
            </dl>

            <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-7 lg:mt-0 lg:pr-8">
            
            <div className="flex items-center justify-between pt-4">
                <dt className="font-medium text-gray-900"></dt>
                <dd className="font-medium text-indigo-600"></dd>
            </div>
            </dl>
        </div>
        </section>
    </main>


    </div>


 </div>

  )
}

export default serviceInfo
