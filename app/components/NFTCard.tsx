import Image from 'next/image'
import {NFT} from "@/app/types/types";
import MediaLoader, {PlaceHolder} from "@/app/components/MediaLoader";

type Props = {
  nft: NFT
}

function NFTCard({nft}: Props) {
  return (
    <div className="flex flex-col items-center justify-center relative gap-4">
      <div className="relative aspect-square w-full">
        <MediaLoader src={nft.img} alt={nft.title} />
      </div>
      <div className="flex justify-between w-full overflow-hidden">
        <h1 className="text-xl font-bold truncate">{nft.title}</h1>
        <p className="text-xl">{nft.price} ETH</p>
      </div>
    </div>
  )
}

NFTCard.Skeleton = function NFTCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center relative gap-4">
      <div className="relative aspect-square w-full">
        <PlaceHolder isLoaded={false} />
      </div>
      <div className="flex justify-between w-full">
        <div className="h-7 w-1/2 animate-pulse rounded-lg bg-gray-900"></div>
        <div className="h-7 w-1/4 animate-pulse rounded-lg bg-gray-900"></div>
      </div>
    </div>
  )
}

export default NFTCard
