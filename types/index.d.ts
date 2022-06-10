declare interface PageConfig {
  title?: string
  meta?: DocumentMetaTag[]
  noHeader?: boolean
  noSidebar?: boolean
  loggedInOnly?: {
    redirectTo: string
  }
  notLoggedInOnly?: {
    redirectTo: string
  }
}

declare type DocumentMetaTag = {
  name?: string
  property?: string
  content?: string
}

declare type User = {
  id: string
  email: string
  username: string
}

declare type Item = {
  id: string
  category: ItemCategory
  name: string
  image: string
  price: string
  description: string
  cookingTime: number
}

declare type ItemCategory = {
  id: string
  name: string
  icon: string
}

declare type Order = {
  id: string
  table: Table
  items: Item[]
  status: "none" | "sent" | "processing" | "awaitPayment" | "completed"
  dateCreated: string
}

declare type Table = {
  id: string
  number: number
  status: "none" | "occupied"
}
