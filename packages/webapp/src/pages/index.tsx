import Head from 'next/head'

import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import Layout, { siteName } from '../components/layout'
import TagList from '../components/tag'

// import { getSortedPostsData } from '../lib/posts'
import { getTopTags } from '../api'
// import { TagDto } from '../api/dto'
// import utilStyles from '../styles/utils.module.css'
// import Link from 'next/link'
// import Date from '../components/date'

export default function Home({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) {
  console.info('home page')
  const {data, error} = useQuery('topTags', () => getTopTags(25))

  if (error) {
    console.warn('get top tags failed:', error)
  }
  console.info('tags:', data?.length)
  return (
    <Layout home='home'>
      <Head>
        <title>{siteName}</title>
      </Head>

      <div className="row">
      <div className="col"><TagList tags={data ? data: []} /></div>
        <div className="col-10">This is main section</div>
        {/* <div className="col">This is right section</div> */}
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  console.info('home getStaticProps')
  const queryClient = new QueryClient()
 
   await queryClient.prefetchQuery('topTags', () => getTopTags(25))

  // const allPostsData = getSortedPostsData()
  return {
    props: {
      // allPostsData
      dehydratedState: dehydrate(queryClient),
    }
  }
}
