import JSZip from 'jszip';
import type { ProcessedImage } from './ImageProcessor';

export class FileZipper {
  async zipBlobs(files: { name: string; blob: Blob }[]): Promise<Blob> {
    const zip = new JSZip();

    for (const file of files) {
      const arrayBuffer = await file.blob.arrayBuffer();
      zip.file(file.name, arrayBuffer);
    }

    const zipContent = await zip.generateAsync({ type: 'blob' });
    return zipContent;
  }

  /**
   * Zips the processed images using JSZip.
   */
  static async zipProcessedImages(images: ProcessedImage[]): Promise<Blob> {
    const zip = new JSZip();
    for (const img of images) {
      zip.file(img.path, img.blob);
    }
    return await zip.generateAsync({ type: 'blob' });
  }
}
