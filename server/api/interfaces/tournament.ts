import { IMatch } from "./match";

export interface ITournament {
    name: string;
    belongsTo: string;
    belongsName: string;
    active: boolean;
    subscribers: string[];
    createdAt: Date;
    access: string[];
    matches: IMatch[];
}