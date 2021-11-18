
export interface Hamster {
    id: string,
    name: string,
    age: number,
    favFood: string,
    loves: string,
    imgName: string,
    wins: number,
    defeats: number,
    games: number,
}

export interface HamsterUpdate {
    id: string
    hamster: Hamster
}