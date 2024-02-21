import { CustomButton, CustomFilter, SearchBar } from '@/components'
import Image from 'next/image'
import React from 'react'

function catalog(){
  return (
    <div className='w-full h-screen flex items-start flex-1 pt-36 '>
        <div className='mt-12 padding-x padding-y max-width' id="discover">
            <div className='home__text-container'>
                <h1 className='text-4xl font-extrabold'>Mantenimiento y reparacion</h1>
                {/* <p>Detalles y revisión</p> */}

                <div className='home__filters'>
                    <SearchBar />
                
                <div className='flex flex-row'>
                    <input type='text' placeholder='Escribe ' className='w-80 border-r-2' />
                    <CustomButton
                        title='Buscar'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue' 
                        />

                    {/* <CustomFilter title="fuel" />
                    <CustomFilter title="year" /> */}
                </div>
                </div>

                <section>
                    <div className='home__cars-wrapper'>
                        <div className="car-card group">
                            <div className="car-card__content">
                                <h2 className="car-card__content-title">
                                Ultrasonido
                                </h2>
                            </div>

                            {/* <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                                {carRent}
                                <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                            </p> */}

                            <div className='relative w-full h-40 my-3 object-contain'>
                                <Image src="/ultrasonido.jpg" alt='ultrasonido' fill priority className='object-contain' />
                            </div>

                            <div className='relative flex w-full mt-2'>
                                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    {/* <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' /> */}
                                    <p className='text-[14px] leading-[17px]'>
                                    Detalles y revisión


                                    {/* {transmission === "a" ? "Automatic" : "Manual"} */}
                                    </p>
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/tire.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{drive.toUpperCase()}</p> */}
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/gas.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{city_mpg} MPG</p> */}
                                </div>
                                </div>

                                <div className="car-card__btn-container">
                                <CustomButton
                                    title='Ver mas'
                                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                    // textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    // rightIcon='/right-arrow.svg'
                                
                                />
                                </div>
                            </div>

                        </div>
                        <div className="car-card group">
                            <div className="car-card__content">
                                <h2 className="car-card__content-title">
                                Monitor de Paciente
                                </h2>
                            </div>

                            {/* <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                                {carRent}
                                <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                            </p> */}

                            <div className='relative w-full h-40 my-3 object-contain'>
                                <Image src="/monitor.jpg" alt='ultrasonido' fill priority className='object-contain' />
                            </div>

                            <div className='relative flex w-full mt-2'>
                                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    {/* <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' /> */}
                                    <p className='text-[14px] leading-[17px]'>
                                    Detalles y revisión
                                    {/* {transmission === "a" ? "Automatic" : "Manual"} */}
                                    </p>
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/tire.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{drive.toUpperCase()}</p> */}
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/gas.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{city_mpg} MPG</p> */}
                                </div>
                                </div>

                                <div className="car-card__btn-container">
                                <CustomButton
                                    title='Ver mas'
                                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                    // textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    // rightIcon='/right-arrow.svg'
                                
                                />
                                </div>
                            </div>

                        </div>
                        <div className="car-card group">
                            <div className="car-card__content">
                                <h2 className="car-card__content-title">
                                Incubadora neonatal
                                </h2>
                            </div>

                            {/* <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                                {carRent}
                                <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                            </p> */}

                            <div className='relative w-full h-40 my-3 object-contain'>
                                <Image src="/incubadora.jpg" alt='ultrasonido' fill priority className='object-contain' />
                            </div>

                            <div className='relative flex w-full mt-2'>
                                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    {/* <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' /> */}
                                    <p className='text-[14px] leading-[17px]'>
                                    Detalles y revisión
                                    {/* {transmission === "a" ? "Automatic" : "Manual"} */}
                                    </p>
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/tire.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{drive.toUpperCase()}</p> */}
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/gas.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{city_mpg} MPG</p> */}
                                </div>
                                </div>

                                <div className="car-card__btn-container">
                                <CustomButton
                                    title='Ver mas'
                                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                    // textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    // rightIcon='/right-arrow.svg'
                                
                                />
                                </div>
                            </div>

                        </div>
                        <div className="car-card group">
                            <div className="car-card__content">
                                <h2 className="car-card__content-title">
                                Ultrasonido
                                </h2>
                            </div>

                            {/* <p className='flex mt-6 text-[32px] leading-[38px] font-extrabold'>
                                <span className='self-start text-[14px] leading-[17px] font-semibold'>$</span>
                                {carRent}
                                <span className='self-end text-[14px] leading-[17px] font-medium'>/day</span>
                            </p> */}

                            <div className='relative w-full h-40 my-3 object-contain'>
                                <Image src="/ultrasonido.jpg" alt='ultrasonido' fill priority className='object-contain' />
                            </div>

                            <div className='relative flex w-full mt-2'>
                                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                                <div className='flex flex-col justify-center items-center gap-2'>
                                    {/* <Image src='/steering-wheel.svg' width={20} height={20} alt='steering wheel' /> */}
                                    <p className='text-[14px] leading-[17px]'>
                                    Detalles y revisión
                                    {/* {transmission === "a" ? "Automatic" : "Manual"} */}
                                    </p>
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/tire.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{drive.toUpperCase()}</p> */}
                                </div>
                                <div className="car-card__icon">
                                    {/* <Image src="/gas.svg" width={20} height={20} alt="seat" /> */}
                                    {/* <p className="car-card__icon-text">{city_mpg} MPG</p> */}
                                </div>
                                </div>

                                <div className="car-card__btn-container">
                                <CustomButton
                                    title='Ver mas'
                                    containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                                    // textStyles='text-white text-[14px] leading-[17px] font-bold'
                                    // rightIcon='/right-arrow.svg'
                                
                                />
                                </div>
                            </div>

                        </div>
                        

                    </div>
                </section>

            </div>
        </div>
    </div>
  )
}

export default catalog
