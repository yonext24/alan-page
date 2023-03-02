import Head from 'next/head'
import { Header } from '@/components/Header'
import { DesignsSection } from 'src/components/DesignsSection'
import { TattoosSection } from 'src/components/TattoosSection'
import { getDesigns } from '../../firebase/client'

export default function Home ({ designs, error }) {
  return (
      <>
          <Head>
              <title>Neptuno Black Tatuajes</title>
              <meta name="description" content="Somos un estudio de tatuajes ubicado en la estación de Lanús" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <DesignsSection serverDesigns={designs} error={error} />
          <TattoosSection />
      </>
  )
}

export async function getServerSideProps () {
  try {
    const designs = await getDesigns()
    console.log(designs, 'ERROR EN EL TRY')

    return {
      props: {
        designs
      }
    }
  } catch (error) {
    return {
      props: {
        error: true
      }
    }
  }
}
