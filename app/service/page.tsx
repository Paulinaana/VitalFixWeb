"use client";

import { CustomButton, CustomFilter, SearchBar } from '@/components';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function Service() {
    const router = useRouter();
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

        const fetchRequests = async () => {
            try {
                const response = await fetch('https://back-vitalfix.onrender.com/api/v1/requests', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setRequests(data);
                } else {
                    console.error('Failed to fetch requests');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchUserData();
        fetchRequests();
    }, []);

    return (
        <div className="flex">
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

            <section className="container px-4 mx-20 mt-40">
                <h2 className="text-lg font-medium text-gray-800">Servicios</h2>
                <p className="mt-1 text-sm text-gray-500">Podras ver la información y estatus de tus servicios pedidos.</p>
                <div className="flex flex-col p-2 md:p-4">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                <div className="flex items-center gap-x-3">
                                                    <input type="checkbox" className="text-blue-500 border-gray-300 rounded "/>
                                                    <button className="flex items-center gap-x-2">
                                                        <span>Servicio</span>
                                                        <svg className="h-3" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z" fill="currentColor" stroke="currentColor" stroke-width="0.1" />
                                                            <path d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44263 5.82019 7.4326C5.81989 7.42991 5.81987 7.42805 5.81994 7.42688C5.82468 7.42271 5.84654 7.40664 5.9107 7.40664H6.96578H7.11578V7.25664V4.47836V4.32836H6.96578H6.04021C5.97606 4.32836 5.95421 4.31226 5.94948 4.30809C5.94941 4.30692 5.94943 4.30507 5.94973 4.30238C5.95088 4.29235 5.95631 4.27196 5.97562 4.24186C5.97565 4.2418 5.97569 4.24174 5.97573 4.24168L7.83128 1.38207L7.83163 1.38155C7.8686 1.32407 7.90224 1.317 7.91519 1.317C7.92815 1.317 7.96179 1.32407 7.99876 1.38155L7.99911 1.38207L9.85466 4.24168C9.8547 4.24174 9.85474 4.2418 9.85477 4.24186C9.87408 4.27196 9.87951 4.29235 9.88066 4.30238C9.88096 4.30507 9.88094 4.30692 9.88087 4.30809C9.87614 4.31226 9.85428 4.32836 9.79013 4.32836H8.86456H8.71456V4.47836V7.25664Z" fill="currentColor" stroke="currentColor" stroke-width="0.3" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                Tipo de Servicio
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                Fecha de Solicitud
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500">
                                                Estado
                                            </th>
                                            <th scope="col" className="relative py-3.5 px-4">
                                                <span className="sr-only">Acciones</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {requests.map((request) => (
                                            <tr key={request.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    <div className="inline-flex items-center gap-x-3">
                                                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded "/>
                                                        <span>{request.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{request.service.name}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(request.createdAt).toLocaleDateString()}</td>
                                                <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">{request.status}</td>
                                                <td className="px-4 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                    <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-blue-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                                                        Visualizar Servicio
                                                    </button>
                                                    {/* <a href="#" className="text-blue-500 hover:text-blue-700">Ver</a> */}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Service;