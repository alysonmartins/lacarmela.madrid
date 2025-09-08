import Navigation from "./components/Navigation";
import HomeFooter from "./components/HomeFooter";
import HomeContent from "./components/HomeContent";
import HomeHeader from "./components/HomeHeader";

export default function Home() {
  return (
    <>
      <Navigation />

      <HomeHeader />

      <HomeContent />

      {/* FOOTER */}
      <HomeFooter />
    </>
  );
}
