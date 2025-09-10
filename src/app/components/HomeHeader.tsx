export default function HomeHeader() {
  return (
    <>
      <div className="bg-zinc-800 h-32 sm:h-72  ">
        <div className="absolute w-full z-10 overflow-hidden ">
          <div className="clear h-32 sm:h-72 " />
          <div className="absolute top-0 w-full h-full cover z-10 bg-cover bg-center bg-no-repeat bg-[url('/bg.jpg')] " />
          <div className="absolute top-0 w-full h-full z-20 opacity-40 bg-gray-900 " />
          <div className="absolute bottom-0 w-full h-full z-20 opacity-100 bg-gradient-to-b from-85% to-gray-950" />
        </div>
      </div>
    </>
  );
}
