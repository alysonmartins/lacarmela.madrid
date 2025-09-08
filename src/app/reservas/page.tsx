import Navigation from "@/app/components/Navigation";
import HomeFooter from "@/app/components/HomeFooter";
import FourvenuesContent from "../components/FourvenuesContent";

export default function Reservas() {
  return (
    <>
      <Navigation />

      <div className="min-h-screen">
        <iframe
          src="https://www.fourvenues.com/iframe/la-carmela/events/?theme=dark&amp;backarrow=hide"
          width="100%"
          className="pt-15"
        ></iframe>
      </div>
    </>
  );
}
