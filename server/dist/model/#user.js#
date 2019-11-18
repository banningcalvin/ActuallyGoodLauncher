"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    admin: {
        required: true,
        type: Boolean
    },
    developer: {
        required: true,
        type: Boolean
    },
    email: {
        lowercase: true,
        required: true,
        type: String,
        unique: true
    },
    games: [{
            ref: "Game",
            type: mongoose_1.default.Types.ObjectId
        }],
    password: {
        required: true,
        type: String
    },
    profile: {
        firstName: {
            required: true,
            type: String
        },
        lastName: {
            required: true,
            type: String
        },
        status: {
            type: String
        }
    },
    resetPasswordExpires: { type: Date },
    resetPasswordToken: { type: String },
}, { timestamps: true });
UserSchema.pre("save", function save(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt_1.default.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.default.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
const comparePassword = function (candidatePassword, cb) {
    bcrypt_1.default.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};
UserSchema.methods.comparePassword = comparePassword;
UserSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        profile: {
            firstName: this.profile.firstName,
            lastName: this.profile.lastName,
            status: this.status
        },
        email: this.email,
        developer: this.developer
    };
};
exports.User = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=user.js.map