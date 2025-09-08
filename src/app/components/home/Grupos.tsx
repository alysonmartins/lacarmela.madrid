export default function Grupos() {
  return (
    <div className="relative mx-auto max-w-[620px] pt-2 text-center max-md:pt-15 md:pt-15 lg:pt-16">
      <span className="title text-5xl max-md:text-4xl w-full">LA CARMELA</span>
      <h2 className="font-heading text-dark text-3xl font-semibold sm:text-4xl md:text-[50px] md:leading-[60px] dark:text-white">
        Eventos de Grupos
      </h2>
      <p className="text-base">
        Transforma tus celebraciones en experiencias legendarias. En La Carmela
        creamos el marco perfecto para que cada momento especial se viva con la
        intensidad que merece.
      </p>
      <a
        href="/reservas"
        target="_blank"
        className="text-center w-full text-zinc-400 hover:text-zinc-100"
      >
        {" >> "}Reservas{" << "}
      </a>
    </div>
  );
}
