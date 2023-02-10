import Head from 'next/head'
import { Header } from '@/components/Header'
import { DesignsSection } from 'src/components/DesignsSection'
import { TattoosSection } from 'src/components/TattoosSection'

export default function Home () {
  return (
      <>
          <Head>
              <title>Neptuno Black Tatuajes</title>
              <meta name="description" content="Somos un estudio de tatuajes ubicado en la estación de Lanús" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <DesignsSection />
          <TattoosSection />
      </>
  )
}
