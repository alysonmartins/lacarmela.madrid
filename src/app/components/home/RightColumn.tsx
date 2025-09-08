import Image from "next/image";

export default function RightColumn() {
  return (
    <div className="space-y-2 mb-20">
      <h2 className="text-xl text-nowrap">Otras Experiencias</h2>
      <div className="flex flex-col max-md:flex-row gap-4 text-slate-400">
        <div className="flex flex-1">
          <a
            href="https://www.tabernalacarmela.com"
            target="_blank"
            className="hover:text-slate-200"
          >
            <Image
              src={"/home/restaurant.jpg"}
              width={150}
              height={50}
              alt="El Restaurante"
              loading="lazy"
              className="max-w-70 max-md:min-w-3/6 w-full rounded"
            />
            El Restaurante
          </a>
        </div>

        <div className="flex flex-1">
          <a
            href="https://www.tablaolacarmela.com"
            target="_blank"
            className="hover:text-slate-200"
          >
            <Image
              src={"/home/tablao.jpg"}
              width={150}
              height={50}
              alt="El Tablao"
              loading="lazy"
              className="max-w-70 max-md:min-w-3/6 w-full rounded"
            />
            El Tablao
          </a>
        </div>
      </div>
    </div>
  );
}
