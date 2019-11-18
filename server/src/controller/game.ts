import { Request, Response } from "express";
import mongoose from "mongoose";
import passportJWT from "passport-jwt";
import config from "../config/config";
import { Game, GameDocument } from "../model/game";

export class GameController {
    public addNewGame(req: Request, res: Response) {
        const newGame = new Game(req.body);
        console.log(req.body);
        newGame.save((err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public getGames(req: Request, res: Response) {
        Game.find({}, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public getGameByTitle(req: Request, res: Response) {
        Game.findOne({ _id: req.params.title }, req.body, { new: true }, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public updateGame(req: Request, res: Response) {
        Game.findOneAndUpdate({ _id: req.params.title }, req.body, { new: true }, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public deleteGame(req: Request, res: Response) {
        Game.remove({ _id: req.params.gameId }, (err) => {
            if (err) {
                res.json({ message: "Unsuccessfully Delete Game!"});
            }
            res.json({ message: "Successfully Deleted Game!"});
        });
    }
}
