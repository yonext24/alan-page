import Head from 'next/head'
import styles from '@/styles/search.module.css'
import Image from 'next/image'
import Filter from '../../public/icons/filter.svg'
import { useEffect, useState } from 'react'
import { getTattoos } from '../../firebase/client'
import { useSearch } from 'src/hooks/useSearch'
import { useTattoosFilter } from 'src/hooks/useTattosSearch'
import { FilterContainer } from 'src/components/FilterContainer'
import { TattooSearchCard } from 'src/components/TattooSearchCard'
import { useRouter } from 'next/router'
import useUser from 'hooks/useUser'

export default function Search ({ data }) {
  const [filters, setFilters] = useState({
    nombre: '',
    lugar: '',
    estilo: '',
    tags: ''
  })
  const [areFiltersOpen, setAreFiltersOpen] = useState(false)

  const router = useRouter()
  const user = useUser()

  const { keyword, setKeyword, warning } = useSearch({ filters })
  const { filteredTattoos } = useTattoosFilter({ data, search: keyword, filters })

  useEffect(() => {
    const { estilo, nombre, tags, lugar, search } = router.query
    if (estilo !== undefined && nombre !== undefined && tags !== undefined && lugar !== undefined) {
      setFilters({ estilo, nombre, tags, lugar })
    }
    if (search) {
      setKeyword(search)
    }
  }, [router.query])

  const handleChange = e => {
    const newQuery = e.target.value
    if (newQuery.startsWith(' ')) return
    setKeyword(newQuery)
  }
  const handleGenerateLink = () => {
    const { estilo, nombre, lugar, tags } = filters
    const pageHref = process.env.NODE_ENV === 'development' ? 'localhost:3000' : 'alan-page.vercel.app'
    const filtersValues = Object.values(filters)
    const arrayOfBooleans = filtersValues.map(el => el !== '')
    if (arrayOfBooleans.includes(true)) {
      navigator.clipboard.writeText(`${pageHref}/search?estilo=${estilo}&nombre=${nombre}&tags=${tags}&lugar=${lugar}`)
      return
    }
    if (keyword) {
      navigator.clipboard.writeText(`${pageHref}/search?search=${keyword}`)
    }
  }

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
      <div className={styles.warningContainer}>
          {
            warning && <div className={styles.warning}>{warning}</div>
          }
      </div>
      <section className={styles.tattooContainer}>
          {
            filteredTattoos.map((tattoo, index) => <TattooSearchCard key={tattoo.id} {...tattoo} index={index} />)
          }
          {
            user && <button className={styles.generateBtn} name='Generate link' onClick={handleGenerateLink}>Generar Link</button>
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
