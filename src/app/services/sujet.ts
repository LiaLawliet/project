export interface Sujet {
    id: number,
    sujet_name: string,
    theme_name: string,
    resolu: number,
    creator: number,
    username: string,
    hidden:number,
    image:string
}

export interface PutSujet {
    id: number,
    sujet_name: string,
    theme_id: string,
    theme_name: string,
    resolu: number,
    username: string,
    hidden:number,
    image : string
}

export interface CreatedSujet {
    id: number,
    sujet_name: string,
    theme_name: string,
    resolu: number,
    hidden:number
}