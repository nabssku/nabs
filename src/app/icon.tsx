import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#FDE047',
          border: '6px solid #000000',
          borderRadius: '18px',
          fontSize: 38,
          fontWeight: 900,
          color: '#18181B',
        }}
      >
        N
      </div>
    ),
    {
      ...size,
    }
  );
}
