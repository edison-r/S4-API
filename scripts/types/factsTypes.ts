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
