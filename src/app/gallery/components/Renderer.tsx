"use client";

import { useState, useMemo } from "react";
import { Config } from "@/app/gallery/lib/config";
import { Photo } from "@/app/gallery/types/gallery";
import { LazyImage } from "@/app/gallery/components/ui/LazyImage";
import { PhotoModal } from "./PhotoModal";
import { shuffleArray, px } from "@/app/gallery/lib/utils";

interface VerticalRendererProps {
  config: Config;
  containerWidth: number;
}

export function Renderer({ config, containerWidth }: VerticalRendererProps) {
  // Estado para rastrear a foto atualmente selecionada
  // const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Combina todas as fotos de todas as seções em um único array.
  const allPhotos = useMemo(() => {
    if (!config || !config.data) {
      return [];
    }
    const photos = Object.values(config.data).flatMap((photoData) =>
      photoData.map((p) => new Photo(p))
    );
    return config.shuffle ? shuffleArray([...photos]) : photos;
  }, [config.data, config.shuffle]);

  // Função utilitária para encontrar a pilha com a menor altura
  const getSmallestStackIndex = (heights: number[]): number => {
    let smallestIndex = 0;
    let minHeight = Number.MAX_VALUE;

    for (let i = 0; i < heights.length; i++) {
      if (heights[i] === 0) return i;
      if (heights[i] < minHeight) {
        smallestIndex = i;
        minHeight = heights[i];
      }
    }
    return smallestIndex;
  };

  const createSection = (sectionName: string, photos: Photo[]) => {
    const processedPhotos = config.shuffle ? shuffleArray([...photos]) : photos;
    const width =
      (containerWidth - config.spacing * (config.columns - 1)) / config.columns;

    const stacks: Photo[][] = Array.from({ length: config.columns }, () => []);
    const heights = new Array(config.columns).fill(0);

    processedPhotos.forEach((photo) => {
      const index = getSmallestStackIndex(heights);
      stacks[index].push(photo);
      heights[index] += photo.height(width);
    });

    return { stacks, width };
  };

  // Funções de navegação do modal
  const handlePrev = () => {
    if (selectedIndex !== null) {
      const prevIndex =
        (selectedIndex - 1 + allPhotos.length) % allPhotos.length;
      setSelectedIndex(prevIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      const nextIndex = (selectedIndex + 1) % allPhotos.length;
      setSelectedIndex(nextIndex);
    }
  };

  const handleOpenModal = (photoToOpen: Photo) => {
    const index = allPhotos.findIndex((p) => p.path === photoToOpen.path);
    if (index !== -1) {
      setSelectedIndex(index);
    }
  };

  const handleCloseModal = () => {
    setSelectedIndex(null);
  };

  const currentPhoto = selectedIndex !== null ? allPhotos[selectedIndex] : null;

  return (
    <div className="w-full">
      {Object.entries(config.data)
        .sort(([b], [a]) => a.localeCompare(b)) // Ordenação alfabética
        .map(([sectionName, photoData]) => {
          const photos = photoData.map((p) => new Photo(p));
          const { stacks, width } = createSection(sectionName, photos);

          return (
            <section key={sectionName} className="mb-10">
              <h3 className="text-2xl font-bold mb-6 text-gray-300 text-center">
                - {sectionName} -
              </h3>

              <div className="flex" style={{ gap: px(config.spacing) }}>
                {stacks.map((stack, stackIndex) => (
                  <div
                    key={stackIndex}
                    className="flex flex-col"
                    style={{ width: px(width) }}
                  >
                    {stack.map((photo, photoIndex) => (
                      <LazyImage
                        key={`${photo.path}-${photoIndex}`}
                        photo={photo}
                        width={width}
                        height={photo.height(width)}
                        className={photoIndex > 0 ? "mt-2" : ""}
                        onClick={() => handleOpenModal(photo)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      {currentPhoto && (
        <PhotoModal
          photo={currentPhoto}
          onClose={handleCloseModal}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
