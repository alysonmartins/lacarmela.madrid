"use client";
import { Gallery } from "@/app/gallery/components/Gallery";
import { Header } from "@/app/gallery/components/Layout/Header";
import { Footer } from "@/app/gallery/components/Layout/Footer";
import { siteConfig } from "@/app/gallery/lib/config";
import galleryDataApiOffline from "@/app/gallery/data/gallery-config.json";
import axios from "axios";

var galleryData = galleryDataApiOffline;

// async function getGalleryData() {
//   const url = "https://s3.proexweb.com/lacarmelamadrid/gallery-config.json";
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const result = await response.json();
//     console.log("Lista de fotos carregada");
//     return result;
//   } catch (error) {
//     console.error("Failed to fetch gallery data, using offline data.");
//     return galleryDataApiOffline;
//   }
// }

// Versão alternativa com mais controle de erro
async function getGalleryData() {
  const url = "https://s3.proexweb.com/lacarmelamadrid/gallery-config.json";

  try {
    const response = await axios.get(url, {
      timeout: 10000, // 10 segundos de timeout
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    console.log("Lista de fotos carregada");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Servidor respondeu com erro
      console.error(
        `Failed to fetch gallery data. Status: ${error.response.status}`,
        error.response.data
      );
    } else if (error.request) {
      // Requisição foi feita mas não houve resposta
      console.error(
        "Failed to fetch gallery data. No response received:",
        error.request
      );
    } else {
      // Erro na configuração da requisição
      console.error(
        "Failed to fetch gallery data. Request setup error:",
        error.message
      );
    }

    console.log("Using offline data as fallback.");
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
