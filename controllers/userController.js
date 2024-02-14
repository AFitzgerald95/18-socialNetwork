const { User, Thought } = require('../models');

const userController = {
    async getUser(req, res) {
        try {
            const dbUserData = await User.find()
            .select('-_v')

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const dbUserData = await User.findOne({ _id: req.params.userId })
                .select('-_v')
                .populate('friends')
                .populate('thoughts');

        if (!dbUserData) {
            return res.status(404).json({ message: 'There is no user paired with this id!' });
        }

        res.json(dbUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
        }
    },
    
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user paired with this id!'});
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    
    async addFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { $addToSet: { friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user paired with this id' });
            }

         res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            const dbUserData = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: {friends: req.params.friendId } },
                { new: true }
            );

            if (!dbUserData) {
                return res.status(404).json({ message: 'There is no user paired with this id!'});
            }

            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};

module.exports = userController;
