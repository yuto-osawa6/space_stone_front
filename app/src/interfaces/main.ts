export interface search {
  title_or_titleKa_or_titleEn_or_titleRo_cont:string
}
// export const arrayGenres:string[] =[]

export interface genres{
  janls_id_in:string[]
}

export interface styles{
  styles_id_eq:string
}

export interface news{
  id:number
  title:string
  description:string
  information:string
  judge:number
  date:string
}

export interface tags {
  yearId:number
  year:string
  seasonId:number
  season:string
  tagId:number
  tag:string
  seasonNumber:number
  month:Date
  kisetsu:Kisetsu
}

type Kisetsu = {
  id:number
  name:string
}
// export interface search {
//   q:{title_cont: string}
//   // tia :1
// }