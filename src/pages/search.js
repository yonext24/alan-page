import Head from 'next/head'
import styles from '@/styles/search.module.css'
import Image from 'next/image'
import Filter from '../../public/icons/filter.svg'
import { getTattoos } from '../../firebase/client'
import { FilterContainer } from 'src/components/FilterContainer'
import { TattooSearchCard } from 'src/components/TattooSearchCard'
import useUser from 'hooks/useUser'
import { useSearchPage } from 'src/hooks/useSearchPage'
import { useRecommendations } from 'src/hooks/useRecommendations'
import { RecommendationsSection } from 'src/components/RecommendationsSection'

export default function Search ({ data }) {
  const user = useUser()

  const {
    handleGenerateLink,
    filteredTattoos,
    areFiltersOpen,
    setAreFiltersOpen,
    handleChange,
    keyword,
    filters,
    setFilters
  } = useSearchPage({ data })
  console.log(filters)

  const { recommendations } = useRecommendations({ data: data.slice(0, 10) })

  return <>
      <Head>
          <title>Search | Neptuno Black</title>
      </Head>
      <header className={styles.header}>
          <Image
          src='/header-image.webp'
          width={115}
          height={38}
          className={styles.logo}
          alt='Logo'
          priority={true}
          />
          <div className={styles.inputContainer}>
              <input type='text' className={styles.input} placeholder='Buscar aquí...' value={keyword} onChange={handleChange} />
              <button type='button' onClick={() => setAreFiltersOpen(prev => !prev)}><Filter className={styles.icon} /></button>
              <div className={styles.inputSibling}></div>
          </div>
          {
            areFiltersOpen && <FilterContainer filters={filters} setFilters={setFilters} data={data} />
          }
      </header>
      <RecommendationsSection filters={filters} recommendations={recommendations} setFilters={setFilters} />
      <section className={styles.tattooContainer}>
          {
            filteredTattoos.map((tattoo, index) => <TattooSearchCard key={tattoo.id} {...tattoo} index={index} />)
          }
          {
            user && <button className={styles.generateBtn} name='Generate link' onClick={() => handleGenerateLink(filters)}>Generar Link</button>
          }
      </section>
  </>
}

export async function getServerSideProps () {
  const data = await getTattoos()

  return {
    props: {
      data
    }
  }
}
