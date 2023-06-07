import StoreMainPage from '@/components/storePage/storeMainPage'
import useAuthStore from '@/store/useAuthStore'
import withAuth from '@/components/hoc/withAuth'

export default withAuth(Home, 'auth')
function Home() {
  const { user, isLoading, isAuthenticated} = useAuthStore()
  return (
    <>
      <StoreMainPage/>
    </>
  )
}
