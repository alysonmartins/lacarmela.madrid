import { HomeIcon, AlbumIcon, Star, LucideHome } from "lucide-react";

export default function Navigation() {
  return (
    <>
      <div className="w-full">
        <div className="fixed w-full top-0 h-14 z-50 backdrop-blur-sm">
          <div className="flex flex-1 justify-between max-w-7xl mx-auto h-full ">
            <div className="flex flex-1 h-full mx-4">
              <a href="/" className="flex gap-2 cursor-pointer items-center">
                <div
                  role="img"
                  className="border-2 border-gray-100 dark:border-gray-800 size-[40] rounded-full bg-cover bg-center bg-[url('/logo.jpg')]"
                />
                <div
                  id="header-title"
                  className="flex-grow font-semibold text-xl animated fadeIn flex"
                >
                  La Carmela
                </div>
              </a>
            </div>

            <div className="hidden sm:flex items-center gap-2 h-full">
              <div className="flex flex-1 py-">
                <a
                  id="home"
                  className="flex gap-2 items-center p-2 whitespace-nowrap  text-gray-200 hover:text-black hover:bg-zinc-500 cursor-pointer bg-transparent rounded"
                  href="/"
                >
                  <HomeIcon className="text-xs" />
                  Inicio
                </a>
              </div>

              <div className="flex flex-1 py-1">
                <a
                  id="my-tickets"
                  className="flex gap-2 items-center p-2 whitespace-nowrap text-gray-200 hover:text-black hover:bg-zinc-500 cursor-pointer bg-transparent rounded"
                  href="/gallery"
                >
                  <AlbumIcon className="text-xs" />
                  Gallery
                </a>
              </div>

              <div className="flex flex-1 py-1">
                <a
                  id="my-account"
                  className="flex gap-2 items-center p-2 whitespace-nowrap text-gray-200 hover:text-black hover:bg-zinc-500 cursor-pointer bg-transparent rounded"
                  href="/reservas"
                >
                  <Star className="text-xs" />
                  Tickets / VIP
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="sm:hidden fixed bottom-0 w-full z-20 text-gray-800 dark:text-gray-200 backdrop-blur-sm">
          <div className="flex h-full py-2 mx-2">
            <div className="flex-1">
              <div id="home">
                <a
                  className="text-xs flex flex-col gap-2 items-center justify-center"
                  href="/"
                >
                  <LucideHome className="text-xs" />
                  Inicio
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div id="my-gallery">
                <a
                  href="/gallery"
                  className="text-xs flex flex-col gap-2 items-center justify-center"
                >
                  <AlbumIcon className="text-xs" />
                  Gallery
                </a>
              </div>
            </div>

            <div className="flex-1">
              <div id="my-tickets">
                <a
                  href="/reservas"
                  className="text-xs flex flex-col gap-2 items-center justify-center"
                >
                  <Star className="text-xs" />
                  Tickets / VIP
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
