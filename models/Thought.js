const { Schema, model } = require('mongoose');

//using moment module to generate timestamp
const moment = require('moment');

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
    }
)