import Link from 'next/link'

export default function CuatroCeroCuatro () {
  return <div style={{ width: '100%', height: '100%', display: 'grid', placeContent: 'center', rowGap: '10px' }}>
      <h1>Esta página no existe.</h1>
      <Link href='/' style={{ textAlign: 'center' }}><span style={{ textDecoration: 'underline', color: '#09f' }}>Volver a la home</span></Link>
  </div>
}
