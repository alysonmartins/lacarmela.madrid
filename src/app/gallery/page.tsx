"use client";
import { Gallery } from "@/app/gallery/components/Gallery";
import { Header } from "@/app/gallery/components/Layout/Header";
import { Footer } from "@/app/gallery/components/Layout/Footer";
import { siteConfig } from "@/app/gallery/lib/config";
import galleryDataApiOffline from "@/app/gallery/data/gallery-config.json";

var galleryData = galleryDataApiOffline;

async function getGalleryData() {
  const url = "https://s3.proexweb.com/lacarmelamadrid/gallery-config.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log("Lista de fotos carregada");
    return result;
  } catch (error) {
    console.error("Failed to fetch gallery data, using offline data.");
    return galleryDataApiOffline;
  }
}

export default async function Home() {
  const galleryData = await getGalleryData();

  return (
    <main className="min-h-screen bg-gray-950">
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
