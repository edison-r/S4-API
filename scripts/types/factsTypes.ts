export interface MeowFactResponse {
  data: string[]
}

export interface DogFactResponse {
  data: {
    id: string
    attributes: {
      body: string
    }
  }[]
}

export interface CatImageResponse {
    url: string
}

export interface CardContent {
    fact: string
    imageUrl: string
}