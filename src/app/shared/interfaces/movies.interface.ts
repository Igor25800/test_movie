export interface movies {
  total: number;
  entries: Array<MoviesInterface>
}


export interface MoviesInterface {
  "title": string;
  "description": string;
  "programType": string;
  "images": posterArt;
  "releaseYear": number;
}

interface posterArt {
  posterArt: {url: string}
}
