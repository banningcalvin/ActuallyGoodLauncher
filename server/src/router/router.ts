import express from "express";
import {UserController} from "../controller/user";
import {GameController} from "../controller/game";

export class Router {
    private router: express.Router = express.Router();
    private userController: UserController = new UserController();
    private gameController: GameController = new GameController();

    // Creates the routes for this router and returns a populated router object
    public getRouter(): express.Router {

        this.router.get("/users", this.userController.getUsers);
        this.router.get("/:userId", this.userController.getUserById);
        this.router.put("/:userId", this.userController.updateUser);
        this.router.delete("/:userId", this.userController.deleteUser);

        this.router.post("/login", this.userController.postLogin);
        this.router.post("/register", this.userController.register);
        
        this.router.get("/games", this.gameController.getGames);
        this.router.get("/:gameid", this.gameController.getGameByTitle);
        this.router.put("/:gameid", this.gameController.updateGame);
        this.router.delete("/:gameid", this.gameController.deleteGame);

        this.router.post("/games", this.gameController.addNewGame);
        
        return this.router;
    }
}

