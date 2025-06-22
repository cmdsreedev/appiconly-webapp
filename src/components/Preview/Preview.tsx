import React, { useRef, useEffect } from 'react';
import phoneImage from '../../assets/phone-image.png';
type PreviewProps = {
  iconUrl: string; // URL of the icon to preview
  iconSize?: number; // base icon size in px (default 128)
};

const ICON_SIZES = [32, 64, 128];

function drawIconOnPhone(
  canvas: HTMLCanvasElement,
  phoneImgUrl: string,
  iconUrl: string,
  iconShape: 'rounded' | 'circle',
  iconSize: number
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const phoneImg = new window.Image();
  const iconImg = new window.Image();

  let loaded = 0;
  const onLoad = () => {
    loaded++;
    if (loaded < 2) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw phone image
    ctx.drawImage(phoneImg, 0, 0, canvas.width, canvas.height);

    // Calculate icon position (centered, 20% from top)
    const iconX = (canvas.width - iconSize) / 2;
    const iconY = canvas.height * 0.2;

    // Draw icon with shape
    ctx.save();
    if (iconShape === 'circle') {
      ctx.beginPath();
      ctx.arc(iconX + iconSize / 2, iconY + iconSize / 2, iconSize / 2, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.clip();
    } else if (iconShape === 'rounded') {
      const radius = iconSize * 0.2;
      ctx.beginPath();
      ctx.moveTo(iconX + radius, iconY);
      ctx.lineTo(iconX + iconSize - radius, iconY);
      ctx.quadraticCurveTo(iconX + iconSize, iconY, iconX + iconSize, iconY + radius);
      ctx.lineTo(iconX + iconSize, iconY + iconSize - radius);
      ctx.quadraticCurveTo(
        iconX + iconSize,
        iconY + iconSize,
        iconX + iconSize - radius,
        iconY + iconSize
      );
      ctx.lineTo(iconX + radius, iconY + iconSize);
      ctx.quadraticCurveTo(iconX, iconY + iconSize, iconX, iconY + iconSize - radius);
      ctx.lineTo(iconX, iconY + radius);
      ctx.quadraticCurveTo(iconX, iconY, iconX + radius, iconY);
      ctx.closePath();
      ctx.clip();
    }
    ctx.drawImage(iconImg, iconX, iconY, iconSize, iconSize);
    ctx.restore();
  };

  phoneImg.onload = onLoad;
  iconImg.onload = onLoad;
  phoneImg.src = phoneImgUrl;
  iconImg.src = iconUrl;
}

export const Preview: React.FC<PreviewProps> = ({ iconUrl, iconSize = 128 }) => {
  const phoneCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (phoneCanvasRef.current) {
      drawIconOnPhone(phoneCanvasRef.current, phoneImage, iconUrl, 'rounded', iconSize);
    }
  }, [iconUrl, iconSize]);

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
