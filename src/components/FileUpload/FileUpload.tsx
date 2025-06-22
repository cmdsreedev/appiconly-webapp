import { useRef, useState } from 'react';
import styles from './Fileupload.module.css';
import classNames from 'classnames';

export type FileUploaderProps = {
  onUpload: (file: File) => void;
  onError: (error: string) => void;
};

export function FileUploader({ onUpload, onError }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragLeave = () => {
    console.log('Drag leave');
    setIsDragging(false);
  };
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('Drag over');
    setIsDragging(true);
    event.preventDefault();
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    console.log('Drop');
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      } else {
        onError('Please upload an image file');
      }
    }
  };

  const handleInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      }
    } else {
      onError('Please upload an image file');
    }
  };

  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <div
        className={classNames(styles.dropAreaContainer, {
          [styles.active]: isDragging,
        })}
      >
        {!isDragging && (
          <>
            <button className={styles.button} onClick={handleInputClick}>
              Upload Icon Image
            </button>
            <input
              data-testid="file-input"
              ref={fileInputRef}
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </>
        )}
        {isDragging && <div className={styles.draggingText}>Drop your image file here</div>}
      </div>
    </div>
  );
}
