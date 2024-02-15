const router = require('express').Router();
const {
    getUser,
    getSingleUser,
    createUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUser).post(createUser).post(createUser);

router.route('/userId').get(getSingleUser).put(updateUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;