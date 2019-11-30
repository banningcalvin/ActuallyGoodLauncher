import mongoose from "mongoose";
import { Url } from "url";
import { CommentDocument } from "./comment";
import { UserDocument } from "./user";

export type GameDocument = mongoose.Document & {
    developer: UserDocument["_id"];
    title: string;
    description: string;
    releaseDate: string;
    data: {
        times_played: number;
        icon: Url;
        background: Url;
    }

    reviews?: [CommentDocument["_id"]];
};

const GameSchema = new mongoose.Schema({
    developer: {
        required: true,
        ref: "User",
        type: mongoose.Types.ObjectId,
    },

    title: {
        required: true,
        type: String
    },

    description: {
        required: true,
        type: String
    },
    releaseDate: {
        required: true,
        type: String
    },

    data: {
        times_played: {
            default: 0,
            required: true,
            type: Number
        },
        icon: {
            required: true,
            type: String
        },
        background: {
            required: true,
            type: String
        }
    },

    reviews: [{
        ref: "Comment",
        type: mongoose.Types.ObjectId
    }],

}, { timestamps: true });

GameSchema.methods.toJSON = function() {
    return {
        title: this.title,
        description: this.description,
        developer: this.developer,
        releaseDate: this.releaseDate,
        data: {
            times_played: this.data.times_played,
            icon: this.data.icon,
            background: this.data.background
        },
        reviews: this.reviews
    };
};

export const Game = mongoose.model<GameDocument>("Game", GameSchema);
