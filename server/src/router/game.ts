import express from "express";
import { GameController } from "../controller/game";
import { requireAuth } from "../security/passport";
import { GameAuthorization } from "../security/game";

export class GameRouter {
    private router: express.Router = express.Router();
    private gameController: GameController = new GameController();
    private gameAuthorization: GameAuthorization = new GameAuthorization();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.router.get("", this.gameController.getGames);
        this.router.post("/addNewGame", requireAuth, this.gameAuthorization.addNewGame, this.gameController.addNewGame)

        this.router.get("/:gameId", this.gameController.getGameByTitle);
        this.router.put("/:gameId", requireAuth, this.gameAuthorization.updateGame, this.gameController.updateGame);
        this.router.delete("/:gameId", requireAuth, this.gameAuthorization.deleteGame, this.gameController.deleteGame);

        return this.router;
    }
}
