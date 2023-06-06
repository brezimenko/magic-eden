'use client'
import useNfts from "@/app/hooks/useNfts";
import {useRef, useState} from "react";
import useDebounce from "@/app/hooks/useDebounce";
import SimpleIntersectionObserver from "@/app/components/SimpleIntersectionObserver";
import IconSpinner from "@/app/components/IconSpinner";
import NFTCard from "@/app/components/NFTCard";
import Image from "next/image";
import VirtualScroller from "virtual-scroller/react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const debouncedSearchQuery = useDebounce(searchQuery)
  const {filteredNfts, hasNextPage, fetchNextPage, isFetching, isLoading} = useNfts('okay_bears', debouncedSearchQuery)
  const parentRef = useRef<HTMLDivElement>(null)

  return (
    <div className="flex flex-col pb-8 gap-8">
      <div className="sticky top-0 z-30 py-6 bg-black border-b-2">
        <div className="container-body flex flex-1 items-center gap-8">
          <div className="h-10 relative flex items-center flex-shrink-0">
            <Image alt="sticky brand-logo" src="/logo_main.png" priority={true} height="50" width="150" className="max-md:hidden" />
            <Image alt="sticky brand-logo" src="/short-logo.png" priority={true} height="40" width="40" className="md:hidden" />
          </div>
          <input type="text" className="h-full max-w-lg p-4 border-2 rounded-lg w-full bg-transparent text-sm outline-none"
                 placeholder="Search tha bears"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}/>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 container-body" ref={parentRef}>
        {!filteredNfts?.length ?
          [...Array(20).keys()].map((index) => (<NFTCard.Skeleton key={index}/>)) :
          // <VirtualScroller
          //   items={filteredNfts}
          //   getColumnsCount={(container) => {
          //     return 3
          //   }}
          //   getScrollableContainer={() => parentRef.current as HTMLElement}
          //   itemComponent={({ item: nft }) => (
          //     <NFTCard nft={nft} key={nft.id} />
          //   )}
          // />
          filteredNfts.map((nft) => <NFTCard nft={nft} key={nft.id} />)
        }
      </div>
      {isFetching && (
        <div className="flex w-full justify-center">
          <IconSpinner />
        </div>
      )}
      {hasNextPage && (
        <SimpleIntersectionObserver
          onIntersection={(observerEntry) => {
            if (observerEntry.isIntersecting && !searchQuery) {
              fetchNextPage()
            }
          }}
          className="flex justify-center"
        />
      )}
    </div>
  )
}
