function Testimonials() {
    return (
      <section className="relative isolate overflow-hidden bg-white px-6 pt-20 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" />
          <figure className="mt-10">
            <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
              <p>
              "Como profesional del sector de la salud, valoro enormemente el servicio de reparación y mantenimiento de equipos médicos que ofrece esta empresa. 
              La tranquilidad de saber que mis dispositivos están en manos de técnicos altamente capacitados y especializados, me brinda la confianza necesaria para centrarme en brindar la mejor atención a mis pacientes. 
              La atención personalizada, la eficiencia en las reparaciones y la profesionalidad en cada paso del proceso hacen que recomiende sin dudarlo este servicio a mis colegas de la industria médica. ¡Gracias por su excelente trabajo y compromiso con la calidad!"
              </p>
            </blockquote>
            <figcaption className="mt-10">
              <img
                className="mx-auto h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">Judith Black</div>
                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                  <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">CEO de Workcation</div>
              </div>
            </figcaption>
          </figure>
        </div>
      </section>
    )
  }
  
  export default Testimonials