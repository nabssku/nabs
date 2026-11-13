import { ImageResponse } from 'next/og';

export const alt = 'Nabil Sahsada Suratno (@nabssku) — Full-Stack Web & AI Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#FFFDF7',
          padding: '56px',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '64px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FDE047',
                border: '4px solid #000000',
                borderRadius: '18px',
                fontSize: '36px',
                fontWeight: 900,
                color: '#18181B',
              }}
            >
              N
            </div>
            <span
              style={{
                fontSize: '32px',
                fontWeight: 900,
                color: '#18181B',
              }}
            >
              nabssku.dev
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              backgroundColor: '#86EFAC',
              border: '4px solid #000000',
              borderRadius: '16px',
              padding: '10px 22px',
              fontSize: '22px',
              fontWeight: 800,
              color: '#18181B',
            }}
          >
            Available for Projects
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            backgroundColor: '#FDE047',
            border: '5px solid #000000',
            borderRadius: '32px',
            padding: '48px',
            boxShadow: '12px 12px 0px #000000',
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: '60px',
              fontWeight: 900,
              lineHeight: 1.1,
              color: '#18181B',
            }}
          >
            Nabil Sahsada Suratno
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: '32px',
              fontWeight: 700,
              color: '#18181B',
            }}
          >
            Full-Stack Web, SaaS &amp; AI Developer — Malang, Indonesia
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              display: 'flex',
              backgroundColor: '#FB923C',
              border: '3px solid #000000',
              borderRadius: '14px',
              padding: '10px 20px',
              fontSize: '22px',
              fontWeight: 800,
            }}
          >
            Next.js &amp; TypeScript
          </div>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#93C5FD',
              border: '3px solid #000000',
              borderRadius: '14px',
              padding: '10px 20px',
              fontSize: '22px',
              fontWeight: 800,
            }}
          >
            PostgreSQL &amp; SaaS
          </div>
          <div
            style={{
              display: 'flex',
              backgroundColor: '#F472B6',
              border: '3px solid #000000',
              borderRadius: '14px',
              padding: '10px 20px',
              fontSize: '22px',
              fontWeight: 800,
            }}
          >
            AI Agents
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
