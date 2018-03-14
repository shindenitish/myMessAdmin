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

export interface Menu {
    menuId: string,
    menutype: string,
    menuCategory: string,
    timeFrom: Date,
    timeTo: Date,
    description: string,
    rate: number
}