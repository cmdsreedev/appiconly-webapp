import { useState, useMemo } from 'react';
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
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Read query params and detect 'compact'
  const isCompact = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return params.has('compact');
  }, []);

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
    <div className={styles.app} style={isCompact ? { padding: '0.5rem' } : undefined}>
      <div className="center" style={isCompact ? { marginBottom: 0 } : undefined}>
        {!isCompact && (
          <>
            <h2>AppIcon Generator</h2>
            <p>Generate Android & IOS Icons instantly</p>
          </>
        )}
      </div>
      <div className={styles.fileUploader} style={isCompact ? { margin: 0 } : undefined}>
        <FileUploader
          onUpload={(file) => {
            setSelectedFile(file);
          }}
          onError={() => {}}
        />
      </div>
      {error && (
        <div style={{ color: 'red', marginTop: '1rem', marginBottom: '1rem' }}>{error}</div>
      )}
      {/* Only show IconSelect outside compact mode or in advanced section */}
      {!isCompact && (
        <>
          <IconSelect
            onChangeSelection={(selected) => {
              setSelectedDimensions(selected);
            }}
          />
          <div className={styles.buttonGroup} style={{ flexDirection: 'row', gap: 20 }}>
            <div className={styles.buttonRow} style={{ marginTop: 0, marginRight: 10 }}>
              <button
                className={styles.button}
                onClick={handleGenerateIcons}
                data-testid="generate-icons"
              >
                Generate Icons
              </button>
            </div>
            <div className={styles.buttonRow} style={{ marginTop: 0 }}>
              <button className={styles.button} onClick={handleGenerateAllIcons}>
                Generate All Icons
              </button>
            </div>
          </div>
        </>
      )}
      {isCompact && (
        <div
          className={styles.buttonGroup}
          style={{ marginTop: '0.5rem', flexDirection: 'column', gap: 0 }}
        >
          <>
            <div className={styles.buttonRow}>
              <button
                className={styles.button}
                onClick={handleGenerateAllIcons}
                data-testid="generate-icons"
              >
                Generate All Icons
              </button>
            </div>
            {showAdvanced && (
              <div
                style={{
                  marginTop: '0.5rem',
                  border: '1px solid #eee',
                  borderRadius: 4,
                  padding: '0.5rem',
                }}
              >
                <IconSelect
                  onChangeSelection={(selected) => {
                    setSelectedDimensions(selected);
                  }}
                />
                <button
                  className={styles.button}
                  style={{ marginTop: '0.5rem' }}
                  onClick={handleGenerateIcons}
                >
                  Generate Icons (Custom)
                </button>
              </div>
            )}
            <div className={styles.buttonRow}>
              <button
                className={styles.linkButton}
                onClick={() => setShowAdvanced((v) => !v)}
                aria-expanded={showAdvanced}
              >
                {showAdvanced ? 'Hide Advanced' : 'Show Advanced'}
              </button>
            </div>
          </>
        </div>
      )}
      {selectedFile && (
        <div className={styles.previewContainer}>
          {!isCompact && <h3>Preview</h3>}
          <Preview iconUrl={URL.createObjectURL(selectedFile)} />
        </div>
      )}
      {!isCompact && (
        <>
          <p className={styles.footer}>
            Made with ❤️ by{' '}
            <a href="https://cmdsree.dev" target="_blank" rel="noopener noreferrer">
              cmdsree.dev
            </a>
          </p>
          <p className={styles.footer}>
            <a
              href="https://github.com/cmdsreedev/appiconly-webapp/issues/new?template=feedback.md"
              target="_blank"
            >
              Submit Feedback on GitHub
            </a>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
