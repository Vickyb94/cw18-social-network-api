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


//retrieving the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
//Initialize the User model
const User = model('User', userSchema);

module.exports = User;