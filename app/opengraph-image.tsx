import { ImageResponse } from 'next/og'

export const alt = 'L’Écrin — Institut de beauté au Raincy (93)'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#FAF6F0',
          backgroundImage:
            'radial-gradient(circle at 88% 12%, rgba(201,138,125,0.22), transparent 42%)',
          padding: 70,
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
              fontSize: 44,
              fontWeight: 600,
              color: '#4A3B36',
              letterSpacing: 1,
            }}
          >
            L’Écrin
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 18,
              color: '#FAF6F0',
              background: '#C98A7D',
              borderRadius: 999,
              padding: '10px 20px',
              fontWeight: 600,
            }}
          >
            SITE DE DÉMONSTRATION
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              color: '#C98A7D',
              letterSpacing: 6,
              marginBottom: 22,
            }}
          >
            INSTITUT DE BEAUTÉ · LE RAINCY
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
              fontWeight: 600,
              color: '#4A3B36',
              lineHeight: 1.05,
            }}
          >
            Prenez soin de vous,
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 78,
              fontWeight: 600,
              color: '#C98A7D',
              lineHeight: 1.05,
              fontStyle: 'italic',
            }}
          >
            vraiment.
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          {['Soins visage', 'Épilation', 'Manucure', 'Massages'].map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                fontSize: 22,
                color: '#4A3B36',
                background: '#FFFFFF',
                border: '1px solid rgba(201,138,125,0.35)',
                borderRadius: 999,
                padding: '12px 26px',
                marginRight: 14,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  )
}
