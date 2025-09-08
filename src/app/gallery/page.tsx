import { Gallery } from "@/app/gallery/components/Gallery";
import { Header } from "@/app/gallery/components/Layout/Header";
import { Footer } from "@/app/gallery/components/Layout/Footer";
import { siteConfig } from "@/app/gallery/lib/config";
import galleryData from "@/app/gallery/data/gallery-config.json";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 ">
      <Header title={siteConfig.full_name} />
      <div className="">
        <Gallery
          data={galleryData}
          layoutStyle={siteConfig.layout_style}
          spacing={siteConfig.spacing}
          shuffle={siteConfig.shuffle}
          columns={siteConfig.columns}
          maxHeight={siteConfig.maxHeight}
        />
      </div>

      <Footer
        fullName={siteConfig.full_name}
        instagram={siteConfig.instagram}
      />
    </main>
  );
}
