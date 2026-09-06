import { ImageResponse } from 'next/og'

export const alt = 'L’Écrin — Institut de beauté à Paris 11e'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#FBF8F3', color: '#2B2522', fontFamily: 'serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64, width: 760 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', width: 56, height: 56, borderRadius: 999, background: '#2E3F36', marginRight: 16 }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', fontSize: 34, fontWeight: 500 }}>L’Écrin</div>
              <div style={{ display: 'flex', fontSize: 14, letterSpacing: 5, color: '#C4715A', fontFamily: 'sans-serif' }}>INSTITUT DE BEAUTÉ · PARIS 11E</div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.05, fontWeight: 400 }}>Prenez soin de vous,</div>
            <div style={{ display: 'flex', fontSize: 68, lineHeight: 1.05, fontStyle: 'italic', color: '#C4715A' }}>vraiment.</div>
            <div style={{ display: 'flex', fontSize: 22, marginTop: 22, color: '#7A6E68', fontFamily: 'sans-serif' }}>Réservation en ligne · Cartes cadeaux · Soins visage, corps, regard</div>
          </div>
        </div>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', background: '#F3ECE2' }}>
          <div style={{ display: 'flex', width: 300, height: 420, borderRadius: '150px 150px 24px 24px', background: '#E6D3C5', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 30, fontSize: 20, color: '#2E3F36', fontFamily: 'sans-serif', letterSpacing: 4 }}>DEPUIS 2015</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
