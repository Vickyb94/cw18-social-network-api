const { Thought, User } = require('../models');

module.exports = {
    //get all thoughts
    getThoughts(req, res) {
        Thought.find()
           .then((thoughts) => res.json(thoughts))
           .catche((err) => res.status(500).json(err));
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
    
}