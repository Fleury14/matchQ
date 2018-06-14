export interface IUser {
    displayName: string,
    email: string,
    subscriptions: string[],
    uid: string,
    invites: [{
        tournId: string,
        tournName: string
    }]
}