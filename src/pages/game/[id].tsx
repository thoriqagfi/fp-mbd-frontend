import withAuth from "@/components/hoc/withAuth";
import GamePage from "@/components/storePage/gamePage";
import StoreMainPage from "@/components/storePage/storeMainPage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default withAuth(GameDetail, "auth");
function GameDetail() {
  const {id} = useRouter().query
  const url = `/game/${id}`
  const {data, refetch} = useQuery([url])
  return(
    <>
      <GamePage/>
    </>
  )
}