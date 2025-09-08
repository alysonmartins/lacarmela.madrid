"use client";

import { useEffect, useState, useRef } from "react";
import { Config, siteConfig } from "@/app/gallery/lib/config";
import {
  GalleryConfig,
  LayoutStyle,
  type SiteConfig,
} from "@/app/gallery/types/gallery";

import { Renderer } from "./Renderer";

interface GalleryProps {
  data: GalleryConfig;
  layoutStyle: LayoutStyle;
  spacing?: SiteConfig["spacing"]; // Espaçamento entre fotos em pixels
  shuffle?: SiteConfig["shuffle"]; // Indica se as fotos devem ser embaralhadas
  columns?: SiteConfig["columns"]; // Número de colunas para layout em grade
  maxHeight?: SiteConfig["maxHeight"]; // Altura máxima para fotos em pixels
}

export function Gallery({
  data,
  layoutStyle,
  spacing = siteConfig.spacing,
  shuffle = siteConfig.shuffle,
  columns = siteConfig.columns,
  maxHeight = siteConfig.maxHeight,
}: GalleryProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const config = new Config(data, { spacing, shuffle, columns, maxHeight });

  const renderGallery = () => {
    if (containerWidth === 0)
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      );

    switch (layoutStyle) {
      default:
        return <Renderer config={config} containerWidth={containerWidth} />;
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-7xl self-center items-center mx-auto"
    >
      {renderGallery()}
    </div>
  );
}
