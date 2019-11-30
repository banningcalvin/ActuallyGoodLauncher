import { NextFunction, Request, Response } from "express";
import { User } from "../model/user";
import { Game } from "../model/game";

export class GameController {
    
    public addNewGame(req: Request, res: Response, next: NextFunction) {

        const title = req.body.title;
        const description = req.body.description;
        const icon = req.body.icon;
        const background = req.body.background;

        if (!title) {
            return res.status(422).send({ error: "You must enter game title." });
        }
        if (!description) {
            return res.status(422).send({ error: "You must enter game description." });
        }
        if (!icon) {
            return res.status(422).send({ error: "You must enter game icon." });
        }
        if (!background) {
            return res.status(422).send({ error: "You must enter game background." });
        }

        const currentUser = new User(req.user);

        const game = new Game({
            developer: currentUser._id,
            title: title,
            description: description,
            data: {
                times_played: 0,
                icon: icon,
                background: background
            }
        });
        game.save(function (err, newGame) {
            if (err) { return next(err); }
            res.json(newGame);
        });
    }

    public getGames(req: Request, res: Response, next: NextFunction) {
        Game.find({}, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public getGameById(req: Request, res: Response, next: NextFunction) {
        Game.findOne({ _id: req.params.gameId }, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public getGameByTitle(req: Request, res: Response, next: NextFunction) {
        Game.findOne({ title: req.params.gameId }, (err, game) => {
            if (err) {
                res.send(err);
            }
            res.json(game);
        });
    }

    public updateGame(req: Request, res: Response, next: NextFunction) {
        Game.findOne({ _id: req.params.gameId }, (err, game) => {
            if (err) {
                res.send(err);
            }
            
            if ('title' in req.body){
                game.title = req.body.title;
            }

            if ('description' in req.body){
                game.description = req.body.description;
            }

            if ('icon' in req.body){
                game.data.icon = req.body.icon;
            }

            if ('background' in req.body){
                game.data.background = req.body.background;
            }

            game.save((err, updatedGame) => {
                if (err) {
                    res.send(err);
                }
                res.json(updatedGame);
            })
        });
    }

    public deleteGame(req: Request, res: Response, next: NextFunction) {
        Game.remove({ _id: req.params.gameId }, (err) => {
            if (err) {
                res.json({ message: "Unsuccessfully Delete Game!"});
            }
            res.json({ message: "Successfully Deleted Game!"});
        });
    }
}
