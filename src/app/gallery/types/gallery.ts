export interface PhotoData {
  width: number;
  height: number;
  path: string;
  compressed_path: string;
  compressed: boolean;
  placeholder_path: string;
}

export interface GalleryConfig {
  [albumName: string]: PhotoData[];
}

export interface GallerySettings {
  spacing: number;
  shuffle: boolean;
  columns: number;
  maxHeight: number;
}

export type LayoutStyle = "ROWS" | "COLUMNS" | "SQUARES";

export interface SiteConfig {
  title: string;
  full_name: string;
  layout_style: LayoutStyle;
  spacing: number;
  shuffle: boolean;
  columns: number;
  maxHeight: number;
  instagram: string;
  description: string;
}

export class Photo {
  public path: string;
  public _width: number;
  public _height: number;
  public _is_compressed: boolean;
  public placeholder_path: string;
  public compressed_path: string;
  public aspectRatio: number;

  constructor(p: PhotoData) {
    this.path = p.path;
    this._width = p.width;
    this._height = p.height;
    this._is_compressed = p.compressed;
    this.placeholder_path = p.placeholder_path;
    this.compressed_path = p.compressed_path;
    this.aspectRatio = this._width / this._height;
  }

  src(): string {
    return this.path;
  }

  isCompressed(): boolean {
    return this._is_compressed;
  }

  originalSrc(): string {
    return this.path;
  }

  compressedSrc(): string {
    return this.compressed_path;
  }

  placeholderSrc(): string {
    return this.placeholder_path;
  }

  width(height: number): number {
    return height * this.aspectRatio;
  }

  height(width: number): number {
    return width / this.aspectRatio;
  }
}
