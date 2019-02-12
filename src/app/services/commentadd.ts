export interface CommentAdd {
    id: number,
    sender_id: number,
    sujet_id: number,
    message: string,
    date: Date,
    username: string,
    image: string
}