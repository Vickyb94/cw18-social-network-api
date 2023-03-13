const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
           .then((thoughts) => res.json(thoughts))
           .catch((err) => res.status(500).json(err));
    },
    //get a single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) => 
              !thought
                 ? res.status(404).json({ message: 'No thought with this ID!' })
                 : res.json(course)             
          )
          .catch((err) => res.status(500).json(err));
    },
    //create a thought
    createThought(req, res) {
        Thought.create(req.body)
        .then((thought) => res.json(thought))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    //delete a thought by id
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
           .then((thought) =>
              !thought
              ? res.status(404).json({ message: 'No thought with this ID!' })
              : User.deleteMany({ _id: { $in: thought.users } } )
           )
           .then(() => res.json({ message: 'Deleted!' }))
           .catch((err) => res.status(500).json(err));
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }  
        )
           .then((thought) =>
              !thought
              ? res.status(404).json({ message: 'No thought with this ID!' })
              : res.json(thought)
            )
          .catch((err) => res.status(500).json(err));
    },
    //create  and delete reaction to user's thoughts
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: {reactions: req.body } },
            { runValidators: true, new: true } 
        )
            .then((thought) =>
               !thought
               ? res.status(404).json({ message: 'Invalid!' })
               : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {reactionId: req.params.reactionId } } },
            { runValidators: true, new: true } 
        )
        .then((thought) =>
               !thought
               ? res.status(404).json({ message: 'Invalid!' })
               : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};