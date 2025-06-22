import React from 'react';

type PreviewProps = {
  iconUrl: string; // URL of the icon to preview
  iconSize?: number; // base icon size in px (default 128)
};

const ICON_SIZES = [32, 64, 128];

export const Preview: React.FC<PreviewProps> = ({ iconUrl }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      {/* First row: icon previews */}
      <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
        {/* Rounded square */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: ICON_SIZES[2],
              height: ICON_SIZES[2],
              borderRadius: 24,
              overflow: 'hidden',
              background: '#f0f0f0',
              margin: '0 auto',
            }}
          >
            <img
              src={iconUrl}
              alt="Rounded Icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 24,
              }}
            />
          </div>
          <div style={{ fontSize: 12, marginTop: 8 }}>Rounded Square</div>
        </div>
        {/* Circle */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: ICON_SIZES[2],
              height: ICON_SIZES[2],
              borderRadius: '50%',
              overflow: 'hidden',
              background: '#f0f0f0',
              margin: '0 auto',
            }}
          >
            <img
              src={iconUrl}
              alt="Circular Icon"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            />
          </div>
          <div style={{ fontSize: 12, marginTop: 8 }}>Circle</div>
        </div>
      </div>
    </div>
  );
};

export default Preview;
