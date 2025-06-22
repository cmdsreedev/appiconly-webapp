import { useState } from 'react';
import styles from './App.module.css';
import { FileUploader } from './components/FileUpload/FileUpload';
import IconSelect from './components/IconSelect/IconSelect';
import { ImageProcessor, type ImageDimension } from './service/ImageProcessor';
import { FileZipper } from './service/FileZipper';
import Preview from './components/Preview/Preview';
import { getAllDimensions } from './utils/dimensions.util';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDimensions, setSelectedDimensions] = useState<Array<ImageDimension>>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIcons = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }
    if (!selectedDimensions.length) {
      setError('Please select at least one icon dimension.');
      return;
    }
    setError(null);
    generateIcons(selectedFile, selectedDimensions);
  };

  const handleGenerateAllIcons = async () => {
    if (!selectedFile) {
      setError('Please select an image file.');
      return;
    }
    setError(null);
    const allDimensions = getAllDimensions();
    generateIcons(selectedFile, allDimensions);
  };

  const generateIcons = async (selectedFile: File, selectedDimensions: ImageDimension[]) => {
    try {
      const processedImages = await ImageProcessor.processImageToDimensions(
        selectedFile,
        selectedDimensions
      );

      const zipBlob = await FileZipper.zipProcessedImages(processedImages);

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'icons.zip';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError('Failed to generate icons. Please try again.');
    }
  };

  return (
    <div className={styles.app}>
      <div className="center">
        <h2>AppIcon Generator</h2>
        <p>Generate Android & IOS Icons instantly</p>
      </div>
      <div className={styles.fileUploader}>
        <FileUploader
          onUpload={(file) => {
            setSelectedFile(file);
          }}
          onError={() => {}}
        />
      </div>
      <IconSelect
        onChangeSelection={(selected) => {
          setSelectedDimensions(selected);
        }}
      />
      {error && (
        <div style={{ color: 'red', marginTop: '1rem', marginBottom: '1rem' }}>{error}</div>
      )}
      <div className={styles.buttonGroup}>
        <button
          className={styles.button}
          onClick={handleGenerateIcons}
          data-testid="generate-icons"
        >
          Generate Icons
        </button>
        <button className={styles.button} onClick={handleGenerateAllIcons}>
          Generate All Icons
        </button>
      </div>
      {selectedFile && (
        <div className={styles.previewContainer}>
          <h3>Preview</h3>
          <Preview iconUrl={URL.createObjectURL(selectedFile)} />
        </div>
      )}
      <p className={styles.footer}>
        Made with ❤️ by{' '}
        <a href="https://github.com/cmdsree/appiconly" target="_blank" rel="noopener noreferrer">
          cmdsree
        </a>
      </p>
      <p className={styles.footer}>
        <a
          href="https://github.com/cmdsree/appoiconly/issues/new?template=feedback.md"
          target="_blank"
        >
          Submit Feedback on GitHub
        </a>
      </p>
    </div>
  );
}

export default App;
