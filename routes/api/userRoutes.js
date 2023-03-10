const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

// /api/users Get all and Post
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId Get and Delete
router.route('/:userId').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends  Add
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId Add and Remove
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;