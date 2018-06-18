import { Request, Response, NextFunction } from "express";
import { User } from './../../models/userModel';
import { onError } from "../onError";
import * as mongoose from "mongoose";
import { IUser } from "../../interfaces/user";


export async function searchUser(req: Request, res: Response, next: NextFunction) {
    if(!req.body.search) {
        res.status(500).json({message: 'No User ID supplied.'})
    }

    console.log(`User ID ${req.body.uid} searching for ${req.body.search}`);
    const search = regexEscape(String(req.body.search));
    const searchReg = new RegExp('.*' + search + '.*', 'i');
    try {
        const nameList:IUser[] = await User.find({
            displayName: searchReg
        });
        const emailList:IUser[] = await User.find({
            email: searchReg
        });
        if (!nameList && !emailList) {
            console.log('No Users found');
            res.status(200).json({message: 'No users found', result: []});
        } else {
            console.log('List successful');
            const finalList:IUser[] = removeDuplicates(nameList.concat(emailList));
            res.status(200).json({message: 'Users found', result: finalList})
        }

    } catch (err) {
        console.log('Error caught while searching for users');
        onError(res, 'Error during list', err);
    }
}

function regexEscape(str) {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function removeDuplicates(arr:any[]) {
    let unique_array = arr.filter((elem, index, self) => 
        index == self.findIndex( (x) => (x.uid == x.uid))
    );
    return unique_array   
}