export interface Region {
    id: number
    name: string
    aqi: number
    status: string
    color: string
    isFavorite: boolean
    }
export interface Notification {
    id: number
    title: string
    message: string
    time: string
    read: boolean,
    type: string
    }
export interface User {
    name: string
    email: string
    region: Region
    notifications: Notification[]
    }