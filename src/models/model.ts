export interface Mess {
    messId: string,
    ownerName: string,
    messName: string,
    email: string,
    contact: number,
    address: {
        address: string,
        city: string
    }
}