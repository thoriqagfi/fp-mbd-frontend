import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import StoreMainPage from '@/components/storePage/storeMainPage'
import GamePage from '@/components/storePage/gamePage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    //<StoreMainPage/>
    <GamePage/>
  )
}
