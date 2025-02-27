import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId,
        require: true, alias: "_id"
    },

    userName: {
        type: String
    },
    userEmail: {
        type: String,
        required:true

    },
    password: {
        type: String
    },
    authType: {
        type: String,
        enum: ["google", "facebook", "github", "email"],
        default: "email"
    },
    active: {
        type: Boolean,
        default: 0
    },
    tc: {
        type: Boolean,
        default: 1
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userProfiles'
    },
    userLikes: {
        type: Number,
        default: 0,
    },
    userFollowers: {
        type: Number,
        default: 0,
    },

    blog: {
        type: mongoose.Schema.Types.ObjectId,

    },
    friends: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userfriend"
    },
    like: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userLike"
    },
    stories: {
        type: [
            mongoose.Schema.Types.ObjectId
        ],
        ref: "userStories"
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userFollowers"
    },




})

// userSchema.post('save', function(next) {
//     // console.log(this,"gfdfdf");
//     // this.updateDate = new Date();
//     // next();
// });
export const userModel = mongoose.model("user", userSchema);
