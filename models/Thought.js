const { Schema, model, Types } = require('mongoose');

//using moment module to generate timestamp
const moment = require('moment');

//Reaction schema as a subdocument
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('DD, MM, YYYY [at] hh:mm a'),
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
    },
);
//Thought Schema
const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //getter method to format the timestamp on query
            get: (createdAtVal) => moment(createdAtVal).format('DD, MM, YYYY [at] hh:mm a'),
        },
        username: {
            type: String,
            required: true
        },
        //validating data with reaction schema
        reactions: [reactionSchema]
    },
    {
        toJSON: 
        {
            virtuals: true,
            getters: true
        },
        id: false,
    },
);

//retrieving the length of the reactions
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});
//initialize the Thought model
const Thought = model('Thought', thoughtSchema);
module.exports = Thought;