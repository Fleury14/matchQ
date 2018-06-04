import { Request, Response, NextFunction } from "express";

export function addTournament(req: Request, res: Response, next: NextFunction) {
    console.log('Endpoint for adding tournament hit');
}