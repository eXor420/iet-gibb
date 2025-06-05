export interface ServerDto {
    _id: string
    name: string
    game: Game
    url: string
    userId: string
    nodePort: number
}

export enum Game {
    MINECRAFT = "MINECRAFT"
}
