"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Photo } from "@/app/gallery/types/gallery";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PhotoModalProps {
  photo: Photo | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export function PhotoModal({
  photo,
  onClose,
  onPrev,
  onNext,
}: PhotoModalProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const handleKeyboardNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      }
    };

    const handleScroll = () => onClose();

    const handlePopState = () => {
      history.pushState(null, "", location.href);
    };

    // Assegura que o modal está aberto antes de adicionar os listeners
    if (photo) {
      document.addEventListener("keydown", handleEsc);
      document.addEventListener("keydown", handleKeyboardNavigation);
      document.addEventListener("scroll", handleScroll);
      document.body.style.overflow = "hidden";
      history.pushState(null, "", location.href);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.removeEventListener("keydown", handleKeyboardNavigation);
      document.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
      window.removeEventListener("popstate", handlePopState);
    };
  }, [photo, onClose, onPrev, onNext]);

  useEffect(() => {
    if (photo) {
      setIsLoaded(false);
    }
  }, [photo]);

  if (!photo) {
    return null;
  }

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      touchStartRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartRef.current !== null && e.changedTouches.length === 1) {
      const touchEnd = e.changedTouches[0].clientX;
      const swipeDistance = touchEnd - touchStartRef.current;
      const minSwipeDistance = 50;

      if (swipeDistance > minSwipeDistance) {
        onPrev();
      } else if (swipeDistance < -minSwipeDistance) {
        onNext();
      }
    }
    touchStartRef.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-90 flex items-center justify-center p-4"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="relative max-w-full max-h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        <Image
          src={photo.originalSrc()}
          alt=""
          width={photo._width}
          height={photo._height}
          className={`md:max-w-5xl md:max-h-5xl min-w-1xl rounded object-contain transition-opacity duration-300 bg-black ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setIsLoaded(true)}
          priority
        />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="max-sm:hidden absolute left-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2 rounded-full backdrop-blur-md"
        >
          <ArrowLeft className="size-10" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="max-sm:hidden absolute right-4 top-1/2 -translate-y-1/2 text-white text-3xl p-2 rounded-full backdrop-blur-md"
        >
          <ArrowRight className="size-10" />
        </button>
      </div>
      <div className="centered-text absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center backdrop-blur-2xl p-2.5 rounded-full">
        <p className="text-shadow-lg">
          Swipe, use arrow keys, or click arrows to navigate, tap image to close
        </p>
      </div>
    </div>
  );
}
