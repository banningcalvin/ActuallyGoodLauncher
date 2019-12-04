import { NextFunction, Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import config from "../config/config";
import { User } from "../model/user";
import { Game } from "../model/game";

export class UserController {
    public generateToken(user: JSON) {
        return jsonwebtoken.sign(user, config.secret, {
            expiresIn: 10080 // in seconds
        });
    }

    public postLogin(req: Request, res: Response, next: NextFunction) {
        User.findOne({ email: req.body.email }, function (err, user) {
            if (err) { return res.status(400).json({ error: "bad data" }); }
            if (!user) { return res.status(400).json({ error: "Your login details could not be verified. Please try again." }); }
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (err) { return res.status(400).json({ error: "bad data" }); }
                if (!isMatch) { return res.status(400).json({ error: "Your login details could not be verified. Please try again." }); }

                const userInfo = user.toJSON();
                res.status(200).json({
                    token: "Bearer " + jsonwebtoken.sign(userInfo, config.secret, { expiresIn: 10080 }),
                    user: userInfo
                });
            });
        });
    }

    // ========================================
    // Registration Route
    // ========================================
    public register(req: Request, res: Response, next: NextFunction) {
        // Check for registration errors
        const email = req.body.email;
        const password = req.body.password;
        const firstName = "First";
        const lastName = "Last";
        console.log("registerig")
        if (!email) {
            return res.status(422).send({ error: "You must enter an email address." });
        }
        //if (!firstName || !lastName) {
        //    return res.status(422).send({ error: "You must enter your full name." });
        //}
        if (!password) {
            return res.status(422).send({ error: "You must enter a password." });
        }

        User.findOne({ email: email }, function (err, existingUser) {
            if (err) { return next(err); }
            if (existingUser) {
                return res.status(422).send({ error: "This email address is already registered." });

            } else {
                const user = new User({
                    email: email,
                    password: password,
                    games: [],
                    profile: {
                        admin: false,
                        developer: false,
                        firstName: firstName,
                        lastName: lastName
                    }
                });
                user.save(function (err, user) {
                    if (err) { return next(err); }
                    const userInfo = user.toJSON();
                    res.status(201).json({
                        token: "Bearer " + jsonwebtoken.sign(userInfo, config.secret, { expiresIn: 10080 }),
                        user: userInfo
                    });
                });
            }
        });
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUserById(req: Request, res: Response) {
        User.findOne({ _id: req.params.userId }, req.body, { new: true }, (err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public updateUser(req: Request, res: Response) {

        User.findOne({ _id: req.params.userId }, (err, user) => {
            if (err) {
                res.send(err);
            }

            if ('email' in req.body){
                user.email = req.body.email;
            }

            if ('firstName' in req.body){
                user.profile.firstName = req.body.firstName;
            }

            if ('lastName' in req.body){
                user.profile.lastName = req.body.lastName;
            }

            const currentUser = new User(req.user);

            if (currentUser.profile.admin && 'developer' in req.body){
                user.profile.developer = req.body.developer;
            }

            user.save((err, updatedUser) => {
                if (err) {
                    res.send(err);
                }
                res.json(updatedUser);
            })
        });
    }

    public deleteUser(req: Request, res: Response) {
        User.remove({ _id: req.params.userId }, (err) => {
            if (err) {
                res.json({ message: "Unsuccessfully Delete User!" });
            }
            res.json({ message: "Successfully Deleted User!" });
        });
    }
}
