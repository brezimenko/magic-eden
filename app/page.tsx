import getQueryClient from './getQueryClient'
import HomeHydrated from "@/app/components/HomeHydrated";
import {dehydrate} from "@tanstack/query-core";
import {Hydrate} from "@tanstack/react-query";
export default async function Home() {
  const queryClient = getQueryClient()
  // TODO: make sure to circumvent Cloudflare's antiscrape protection and enable SSR down the line
  // await queryClient.prefetchInfiniteQuery(['getListedNftsByCollectionSymbol', slug], fetchQuery)
  const dehydratedState = dehydrate(queryClient, {
    shouldDehydrateQuery: () => true,
  })

  return (
    <Hydrate state={dehydratedState}>
      <HomeHydrated />
    </Hydrate>
  )
}
