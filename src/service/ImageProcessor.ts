export interface ImageDimension {
  width: number;
  height: number;
  name: string;
  os: 'iOS' | 'Android';
  path: string;
}

export interface ProcessedImage {
  name: string;
  blob: Blob;
  path: string;
}

export class ImageProcessor {
  /**
   * Resizes an image to the given dimensions and returns a Blob.
   */
  static async resizeImage(
    file: File | Blob,
    width: number,
    height: number,
    type: string = 'image/png',
    quality?: number
  ): Promise<Blob> {
    const img = await ImageProcessor.loadImage(file);
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas context not available');
    ctx.drawImage(img, 0, 0, width, height);
    return await new Promise<Blob>((resolve) =>
      canvas.toBlob((blob) => resolve(blob as Blob), type, quality)
    );
  }

  /**
   * Loads an image from a File or Blob.
   */
  static loadImage(file: File | Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = reject;
      img.src = url;
    });
  }

  /**
   * Processes the image into all given dimensions.
   */
  static async processImageToDimensions(
    file: File | Blob,
    dimensions: ImageDimension[],
    type: string = 'image/png',
    quality?: number
  ): Promise<ProcessedImage[]> {
    const results: ProcessedImage[] = [];
    for (const dim of dimensions) {
      const blob = await ImageProcessor.resizeImage(file, dim.width, dim.height, type, quality);
      results.push({ name: dim.name, blob, path: dim.path });
    }
    return results;
  }
}
