"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Photo } from "@/app/gallery/types/gallery";

interface LazyImageProps {
  photo: Photo;
  width: number;
  height: number;
  className?: string;
  onLoad?: () => void;
  onClick?: () => void;
}

export function LazyImage({
  photo,
  width,
  height,
  className = "",
  onLoad,
  onClick,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
      onClick={onClick}
    >
      {/* Placeholder */}
      <div
        className={`absolute inset-0 bg-gray-200 transition-opacity duration-300 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      >
        {isInView && (
          <Image
            src={photo.src()}
            alt=""
            fill
            sizes="20"
            priority={false}
            className="object-cover filter blur-sm"
            quality={10}
          />
        )}
      </div>

      {/* Main Image */}
      {isInView && (
        <Image
          src={photo.src()}
          alt=""
          fill
          sizes="20"
          priority
          className={`object-cover transition-opacity duration-300 cursor-pointer hover:opacity-95 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={handleLoad}
          quality={20}
        />
      )}
    </div>
  );
}
