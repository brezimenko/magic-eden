import axios from "axios";
import {QueryFunctionContext, useInfiniteQuery} from "react-query";
import {NFT} from "@/app/types/types";
import {API_URL} from "@/app/config";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export type ListedNftsResponse = {
  results: NFT[]
}

export type ListedNfts = {
  data: NFT[]
  offset: number
}

export const fetchQuery = async (params: QueryFunctionContext<string[], any>) => {
  const offset = params.pageParam || 0
  const collectionSymbol = params.queryKey[1]
  const res = await apiClient.get<ListedNftsResponse>("/getListedNftsByCollectionSymbol", {
    params: {
      collectionSymbol,
      limit: 20,
      offset
    }
  })
  return {data: res.data.results, offset: offset + 20}
}

export default function useNfts(slug: string, searchQuery?: string, initialData?: ListedNftsResponse | null) {
  const query = useInfiniteQuery({
    queryKey: ['getListedNftsByCollectionSymbol', slug],
    enabled: slug != null,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => lastPage.offset || 0,
    queryFn: fetchQuery,
    initialData: () => {
      if (initialData) {
        return {
          pageParams: [20],
          pages: [{data: initialData.results, offset: 0}]
        }
      }
    }
  })

  const mergedData = query.data?.pages.flatMap((datum) => datum.data ?? [])

  return {
    ...query,
    nfts: mergedData,
    filteredNfts: mergedData?.filter((nft) => nft.title.toLowerCase().includes(searchQuery?.toLowerCase() ?? ''))
  }
}
