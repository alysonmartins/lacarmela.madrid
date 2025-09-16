import { Gallery } from "@/app/gallery/components/Gallery";
import { Header } from "@/app/gallery/components/Layout/Header";
import { Footer } from "@/app/gallery/components/Layout/Footer";
import { siteConfig } from "@/app/gallery/lib/config";
import galleryDataApiOffline from "@/app/gallery/data/gallery-config.json";

// Função para buscar dados da galeria via API proxy
async function getGalleryData() {
  const url = "https://s3.proexweb.com/lacarmelamadrid/gallery-config.json";

  try {
    const response = await fetch(url, {
      // Deshabilita el cache
      cache: "no-store",
      // O usa revalidación periódica
      // next: { revalidate: 60 }, // revalida cada 60 segundos
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Lista de fotos carregada via API");
    return data;
  } catch (error) {
    console.error("Error fetching gallery data:", error);
    console.log("Using offline data as fallback.");
    return galleryDataApiOffline;
  }
}

export default async function Home() {
  // Busca dados da API primeiro, fallback para offline se falhar
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
