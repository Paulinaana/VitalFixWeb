"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Reclaim() {
    const router = useRouter();
    const [user, setUser] = useState({
        name: "",
        email: "",
        urlAvatar: "",
    });
    const [requests, setRequests] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        fecha: "",
        description: "",
        request_id: "",
        status: ""
    });
    const [message, setMessage] = useState('');

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://back-vitalfix.onrender.com/api/v1/claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                setMessage('Reclamo enviado exitosamente.');
                setTimeout(() => {
                    setMessage('');
                    router.push('/reclaim');
                }, 3000);
            } else {
                setMessage('Error al enviar el reclamo.');
            }
        } catch (error) {
            setMessage('Error al enviar el reclamo.');
            console.error('Error creating claim:', error);
        }
    };

    const handleProfile = () => {
        router.push('/user');
    };

    const handleService = () => {
        router.push('/service');
    };

    const handleReclaim = () => {
        router.push('/reclaim');
    };

    return (
        <div className="flex h-screen">
            <aside className="flex flex-col w-64 px-5 py-20 bg-gray-100 border-r h-screen overflow-y-auto">
                <div className="flex flex-col items-center mt-16 -mx-2 ">
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
            <main className='w-full min-h-screen py-5 bg-gray-50 overflow-auto'>
                <div className="p-4">
                    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                        {/* <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true"> */}
                            {/* <div className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2"></div> */}
                        {/* </div> */}
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reclamos</h2>
                            <p className="mt-2 text-lg leading-8 text-gray-600">Deja tu comentario sobre el servicio donde tengas problema.</p>
                        </div>
                        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="request_id" className="block text-sm font-semibold leading-6 text-gray-900">Solicitud</label>
                                    <div className="mt-2.5">
                                        <select
                                            name="request_id"
                                            id="request_id"
                                            value={formData.request_id}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        >
                                            <option value="">Seleccionar solicitud</option>
                                            {requests.map(request => (
                                                <option key={request.id} value={request.id}>{request.description}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="title" className="block text-sm font-semibold leading-6 text-gray-900">Título</label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={formData.title}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="fecha" className="block text-sm font-semibold leading-6 text-gray-900">Fecha</label>
                                    <div className="mt-2.5">
                                        <input
                                            type="date"
                                            name="fecha"
                                            id="fecha"
                                            value={formData.fecha}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">Descripción</label>
                                    <div className="mt-2.5">
                                        <textarea
                                            name="description"
                                            id="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        ></textarea>
                                    </div>
                                </div>
                                
                                <div className="sm:col-span-2">
                                    <label htmlFor="status" className="block text-sm font-semibold leading-6 text-gray-900">Estado</label>
                                    <div className="mt-2.5">
                                        <input
                                            type="text"
                                            name="status"
                                            id="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                            className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Enviar reclamo
                                </button>
                            </div>
                            {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Reclaim;
