import {
  GalleryConfig,
  GallerySettings,
  PhotoData,
  SiteConfig,
} from "@/app/gallery/types/gallery";

export class Config {
  public data: GalleryConfig;
  public maxHeight: number;
  public spacing: number;
  public shuffle: boolean;
  public columns: number;

  constructor(config: GalleryConfig, opts: GallerySettings) {
    this.data = config;
    this.maxHeight = opts.maxHeight || 400;
    this.spacing = opts.spacing || 10;
    this.shuffle = opts.shuffle || false;
    this.columns = opts.columns || 3;
  }

  photos(album: string): PhotoData[] {
    return this.data[album] || [];
  }
}

export const siteConfig: SiteConfig = {
  title: "Album La Carmela",
  description: "Photography Portfolio",
  full_name: "Gallery",
  layout_style: "COLUMNS", // ROWS | COLUMNS | SQUARES
  spacing: 15,
  shuffle: false,
  columns: 4,
  maxHeight: 100,
  instagram: "lacarmela.madrid",
};
