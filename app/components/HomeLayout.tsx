'use client'
import {RefObject, useMemo, useRef, useState} from "react";
import Image from "next/image";
import SearchIcon from '@mui/icons-material/Search';
import VirtualScroller from "virtual-scroller/react";
import useDebounce from "@/app/hooks/useDebounce";
import IconSpinner from "@/app/components/IconSpinner";
import {NFT} from "@/app/types/types";
import NFTCard from "@/app/components/NFTCard";
import SimpleIntersectionObserver from "@/app/components/SimpleIntersectionObserver";
import {slug} from "@/app/config";
import useNfts from "@/app/hooks/useNfts";

const gridClasses = "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8"

export default function HomeLayout() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery)
  const {nfts, isError, refetch, filteredNfts, hasNextPage, fetchNextPage, isFetching, isLoading} = useNfts(slug, debouncedSearchQuery)
  const parentRef = useRef<HTMLDivElement>(null)
  const grid = useMemo(() => {
    return nfts?.length && filteredNfts?.length ?
      <NFTList nfts={filteredNfts} parentRef={parentRef} /> :
      <NoResults />
  }, [nfts, filteredNfts])

  return (
    <div className="flex flex-col pb-8 gap-8">
      <div className="sticky top-0 z-30 py-6 bg-black border-b-2">
        <div className="container-body flex flex-1 items-center gap-8">
          <div className="h-10 relative flex items-center flex-shrink-0">
            <Image alt="sticky brand-logo" src="/logo_main.png" priority={true} height="50" width="150" className="max-md:hidden" />
            <Image alt="sticky brand-logo" src="/short-logo.png" priority={true} height="40" width="40" className="md:hidden" />
          </div>
          <input type="text" className="h-full max-w-lg p-4 border-2 rounded-lg w-full bg-transparent text-sm outline-none"
                 placeholder="Search the bears"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
      </div>
      {isError ?
        <ErrorWhileFetching onClick={refetch} /> :
        (<div className="container-body" ref={parentRef}>
          {(isFetching && !nfts?.length) ?
            (
              <div className={gridClasses}>
                {[...Array(20).keys()].map((index) => (<NFTCard.Skeleton key={index}/>))}
              </div>
            ) : grid
          }
        </div>)}

      {isFetching && (
        <div className="flex w-full justify-center">
          <IconSpinner />
        </div>
      )}
      {hasNextPage && (
        <SimpleIntersectionObserver
          onIntersection={(observerEntry: IntersectionObserverEntry) => {
            if (observerEntry.isIntersecting && !searchQuery && !debouncedSearchQuery) {
              fetchNextPage()
            }
          }}
          className="flex justify-center"
        />
      )}
    </div>
  )
}

function NoResults() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 col-span-4 mt-8">
      <SearchIcon className="!w-10 !h-10" />
      <p className="text-3xl font-bold">No results</p>
    </div>
  )
}


function ErrorWhileFetching({onClick}: {onClick: () => void}) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 col-span-4">
      <p className="text-3xl font-bold">Could not fetch data</p>
      <button onClick={onClick}>Retry</button>
    </div>
  )
}

function NFTList({ nfts, parentRef }: { nfts: NFT[], parentRef: RefObject<HTMLDivElement> }) {
  return nfts.length > 20 ? <VirtualScroller
    items={nfts}
    getColumnsCount={(container) => {
      const width = container.getWidth()
      if (width < 640) return 1
      if (width < 768) return 2
      if (width < 1024) return 3
      return 4
    }}
    getItemId={(nft) => nft.id}
    className={gridClasses}
    getScrollableContainer={() => parentRef.current as HTMLElement}
    itemComponent={({ item: nft }) => (
      <NFTCard nft={nft} key={nft.id} />
    )}
  /> : (
    <div className={gridClasses}>
      {nfts.map((nft) => <NFTCard nft={nft} key={nft.id} />)}
    </div>
  )
}
