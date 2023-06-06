export interface NFT {
  mintAddress: string
  supply: number
  title: string
  content: string
  primarySaleHappened: boolean
  updateAuthority: string
  onChainCollection: OnChainCollection
  sellerFeeBasisPoints: number
  creators: Creator[]
  price: number
  escrowPubkey: string
  owner: string
  v2: V2
  id: string
  tokenDelegateValid: boolean
  isFrozen: boolean
  tokenStandard: number
  img: string
  attributes: Attribute[]
  externalURL: string
  collectionName: string
  collectionTitle: string
  isTradeable: boolean
  rarity: Rarity
  listingType: string
  createdAt: string
  updatedAt: string
}

export interface OnChainCollection {
  key: string
  verified: number
  data: Data
}

export interface Data {
  name: string
  image: string
  description: string
}

export interface Creator {
  address: string
  verified: number
  share: number
}

export interface V2 {
  auctionHouseKey: string
  sellerReferral: string
  expiry: number
}

export interface Attribute {
  trait_type: string
  value: string
}

export interface Rarity {
  moonrank: Moonrank
  merarity: Merarity
}

export interface Moonrank {
  rank: number
  absolute_rarity: number
  crawl: Crawl
}

export interface Crawl {}

export interface Merarity {
  rank: number
  tokenKey: string
  score: number
}
