import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import StoreMainPage from '@/components/storePage/storeMainPage'
import GamePage from '@/components/storePage/gamePage'
import ProfilePage from '@/components/profilePage/User'
import SearchResultPage from '@/components/storePage/searchResultPage'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    //<StoreMainPage/>
    <GamePage/>
    //<ProfilePage/>
    //<SearchResultPage/>
  )
}
