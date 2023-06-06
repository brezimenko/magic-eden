import axios from "axios";
import {useInfiniteQuery} from "react-query";
import {NFT} from "@/app/types/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api-mainnet.magiceden.io/idxv2'

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


export default function useNfts(slug: string, searchQuery?: string, initialData?: ListedNftsResponse | null) {
  console.log(slug != null && !searchQuery)
  const query = useInfiniteQuery({
    queryKey: ['getListedNftsByCollectionSymbol', slug],
    enabled: slug != null,
    getNextPageParam: (lastPage) => lastPage.offset || 0,
    queryFn: async (params) => {
      const offset = params.pageParam || 0
      const res = await apiClient.get<ListedNftsResponse>("/getListedNftsByCollectionSymbol", {
        params: {
          collectionSymbol: slug,
          limit: 20,
          offset
        }
      })
      return {data: res.data.results, offset: offset + 20}
    },
    initialData: () => {
      if (initialData) {
        return {
          pageParams: [],
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
