import Image from 'next/image'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import StoreMainPage from '@/components/storePage/storeMainPage'
import GamePage from '@/components/storePage/gamePage'
import useAuthStore from '@/store/useAuthStore'
import Loading from '@/components/Loading'
import withAuth from '@/components/hoc/withAuth'

const inter = Inter({ subsets: ['latin'] })


export default withAuth(Home, true)
function Home() {
  const { user, isLoading, isAuthenticated} = useAuthStore()
  return (
    <>
      <StoreMainPage/>
    </>
    // <GamePage/>
  )
}
