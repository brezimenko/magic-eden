import getQueryClient from './getQueryClient'
import {dehydrate, Hydrate} from "react-query";
import {fetchQuery} from "@/app/hooks/useNfts";
import {slug} from "@/app/config";
import HomeLayout from "@/app/components/HomeLayout";
import HydrateClient from "@/app/components/HydrateClient";
export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchInfiniteQuery(['getListedNftsByCollectionSymbol', slug], fetchQuery)
  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  })

  return (
    <HydrateClient state={dehydratedState}>
      <HomeLayout />
    </HydrateClient>
  )
}
