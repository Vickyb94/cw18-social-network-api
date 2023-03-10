const { Schema, Types } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        //using REGEX to validate email
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Provide a valid email address",
            ],
        },
        //Array of _id values referencing the Thought model
        thoughts: [ 
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            },
        ],
        //Array of _id values referencing the User model (self-reference)
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", 
            },
        ],
    },
    {
       toJSON: { virtuals: true },
        id: false,
    },   
);

userSchema.virtual('friendCount').get(function () {
    retun this.friends.length;
})