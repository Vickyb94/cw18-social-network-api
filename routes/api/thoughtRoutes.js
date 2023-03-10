const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
} = require('/').get(getThoughts).post(createThought);

// /api/thoughts 
router.route('/').get(getThoughts).post(createCourse);

// /api/thoughts/:thoughtId
router
   .router('/:thoughtId')
   .get(getSingleThought)
   .put(updateThought)
   .delete(deleteThought);

module.exports = router;