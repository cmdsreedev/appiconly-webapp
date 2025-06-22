import { useState } from 'react';
import type { ImageDimension } from '../../service/ImageProcessor';
import styles from './IconSelect.module.css';
import { getAndroidDimensions, getIOSDimensions } from '../../utils/dimensions.util';

function IconSelect({
  onChangeSelection,
}: {
  onChangeSelection: (selected: ImageDimension[]) => void;
}) {
  const [selection, setSelection] = useState([] as ImageDimension[]);

  const handleChange = (dimension: ImageDimension, checked: boolean) => {
    if (checked) {
      setSelection((prev) => [...prev, dimension]);
      onChangeSelection([...selection, dimension]);
    } else {
      setSelection((prev) => prev.filter((d) => d.name !== dimension.name));
      onChangeSelection(selection.filter((d) => d.name !== dimension.name));
    }
  };

  return (
    <div className="grid">
      <div className={styles.dimensions}>
        <h4 className={styles.heading}>IOS Icons</h4>
        <p>Select the dimensions you want to generate:</p>
        <p className={styles.dimensionsInfo}>
          {/* <div>
            <input
              type="checkbox"
              id="check-all-ios"
              onChange={(e) =>
                e.target.checked
                  ? setSelection(getIOSDimensions())
                  : selection.filter((d) => !getIOSDimensions().some((dim) => dim.name === d.name))
              }
            />
            <label htmlFor={'check-all-ios'} className={styles.label}>
              Check All iOS Icons
            </label>
          </div> */}
          {getIOSDimensions().map((dimension) => (
            <div>
              <input
                type="checkbox"
                key={dimension.name}
                id={dimension.name}
                onChange={(e) => handleChange(dimension, e.target.checked)}
                checked={selection.some((d) => d.name === dimension.name)}
              />
              <label htmlFor={dimension.name} className={styles.label}>
                {dimension.name} ({dimension.width}x{dimension.height})
              </label>
            </div>
          ))}
        </p>
      </div>
      <div className={styles.dimensions}>
        <h4 className={styles.heading}>Android Icons</h4>
        <p>Select the dimensions you want to generate:</p>
        <p className={styles.dimensionsInfo}>
          {/* <div>
            <input
              type="checkbox"
              id="check-all-android"
              onChange={(e) =>
                e.target.checked
                  ? setSelection(getAndroidDimensions())
                  : setSelection(
                      selection.filter(
                        (d) => !getAndroidDimensions().some((dim) => dim.name === d.name)
                      )
                    )
              }
            />
            <label htmlFor={'check-all-android'} className={styles.label}>
              Check All Android Icons
            </label>
          </div> */}
          {getAndroidDimensions().map((dimension) => (
            <div>
              <input
                type="checkbox"
                key={dimension.name}
                id={dimension.name}
                onChange={(e) => handleChange(dimension, e.target.checked)}
                checked={selection.some((d) => d.name === dimension.name)}
              />
              <label htmlFor={dimension.name} className={styles.label}>
                {dimension.name} ({dimension.width}x{dimension.height})
              </label>
            </div>
          ))}
        </p>
      </div>
    </div>
  );
}

export default IconSelect;
