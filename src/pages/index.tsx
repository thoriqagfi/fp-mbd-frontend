import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Layout
      title='Home'
    >
      <div className=' justify-between'>
        <div>
          This is header
        </div>
        <div>
          this is contents
        </div>
      </div>
    </Layout>
  )
}
