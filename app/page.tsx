import { CustomButton, Hero } from "@/components";
import Testimonials from "@/components/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='about'>
        <div className='about__image-container'>
              <div className='about__image'>
                  <Image src="/about.jpg" alt="about" fill className='object-contain'/>
              </div>
              {/* <div className='hero__image-overlay' /> */}
          </div>

          <div className='flex-1 pt-36 padding-x'>
              <h1 className='about__title'>
                  Sobre Nosotros
              </h1>
              <p className='about__subtitle'>
              Somos una empresa especializada en la reparación y mantenimiento de equipos de medicina, 
              comprometidos con la excelencia y la satisfacción del cliente. Con años de experiencia en el sector, 
              donde nuestro equipo de técnicos altamente capacitados y certificados se encarga de garantizar que sus equipos funcionen de manera óptima y segura.
              </p>
          </div>
      </div>

      <div className="mb-36">
        <h1 className='text-center 2xl:text-[65px] sm:text-[58px] text-[50px] font-extrabold mb-9'>Servicios</h1>
          <div className="flex flex-rowflex xl:flex-row flex-col gap-36 relative z-0 max-w-[1440px] mx-auto justify-center">
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image src="/Maquina.jpg" alt="card" width={580} height={480} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Mantenimiento</div>
              <p className="text-gray-700 text-base">
                El mantenimiento de equipos garantiza el correcto funcionamiento, la seguridad y la fiabilidad de los dispositivos y maquinaria utilizados en entornos médicos.
              </p>
            </div>
            <a className="text-primary-blue ml-10 rounded-full bg-white min-w-[130px]" href="/maintenanceCatalog">Ingresar</a>

            {/* <CustomButton
            title="Ingresar"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]" 
            /> */}
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image src="/Reparacion.jpeg" alt="card" width={480} height={180} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Reparación</div>
              <p className="text-gray-700 text-base">
                La reparación de equipos médicos permite identificar, diagnosticar y corregir los problemas o averías que puedan surgir en los dispositivos y maquinaria utilizados en entornos médicos.
              </p>
            </div>
            <a className="text-primary-blue ml-10 rounded-full bg-white min-w-[130px]" href="/repairCatalog">Ingresar</a>
            {/* <CustomButton
            title="Ingresar"
            btnType="button"
            redirectPath="/catalo"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            /> */}
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image src="/instalacion.jpg" alt="card" width={480} height={180} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Instalación</div>
              <p className="text-gray-700 text-base">
              La instalación de equipos médicos permite poner en funcionamiento los equipos utilizados en entornos médicos. Se realiza siguiendo protocolos específicos y normas de seguridad garantizando que los equipos operen de manera eficiente y segura.</p>
            </div>
            <a className="text-primary-blue ml-10 rounded-full bg-white min-w-[130px]" href="/installationCatalog">Ingresar</a>

            {/* <CustomButton
            title="Ingresar"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
            /> */}
          </div>
        </div>
      </div>
      
      
      <Testimonials />

    
    </main>
  );
}
