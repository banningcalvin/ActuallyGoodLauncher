import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { GameDocument } from "./game";

export type UserDocument = mongoose.Document & {
    
    email: string;
    password: string;
    games?: [GameDocument["_id"]];

    profile: {
        admin: boolean,
        developer: boolean,
        firstName: string,
        lastName: string
    };

    resetPasswordExpires: string;
    resetPasswordToken: string;

    comparePassword: comparePasswordFunction;
};

const UserSchema = new mongoose.Schema({
    
    email: {
        lowercase: true,
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    },
    games: [{
        ref: "Game",
        type: mongoose.Types.ObjectId
    }],
    profile: {
        admin: {
            required: true,
            type: Boolean
        },
        developer: {
            required: true,
            type: Boolean
        },
        firstName: {
            required: true,
            type: String
        },
        lastName: {
            required: true,
            type: String
        }
    },
    resetPasswordExpires: { type: Date },
    resetPasswordToken: { type: String },

}, { timestamps: true });

type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

UserSchema.pre("save", function save(next) {
    const user = this as UserDocument;
    if (!user.isModified("password")) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, (err: mongoose.Error, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

const comparePassword: comparePasswordFunction = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

UserSchema.methods.comparePassword = comparePassword;

UserSchema.methods.toJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        games: this.games,
        profile: {
            admin: this.profile.admin,
            developer: this.profile.developer,
            firstName: this.profile.firstName,
            lastName: this.profile.lastName
        },
    };
};

export const User = mongoose.model<UserDocument>("User", UserSchema);
