// Dependencies
const { Router } = require('express');
const postRoute = Router();
const { client } = require('../mongoDb');
const { objectId } = require('mongodb');
const { ObjectID } = require('bson');


const db = client.db('blog');
const post = db.collection('post');
const user = db.collection('user');



// Insert A Single Post
postRoute.post('/', async (req, res) => {
    try {
        const result = await post.insertOne(req.body);
        res.send(result)
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Insert Multiple Post
postRoute.post('/multiple', async (req, res) => {
    try {
        const result = await post.insertMany(req.body);
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Get All Post
postRoute.get('/', async (req, res) => {
    try {
        const result = await post.find({}).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Get A Single Post
postRoute.get('/:id', async (req, res) => {
    try {
        const result = await post.findOne({
            _id: ObjectID(req.params.id)
        });
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Update Multiple Post
// postRoute.put('/multiple', async (req, res) => {

//     try {
//         const result = await post.updateMany({
//             _id: {
//                 $in: req.body.map(multyPost => ObjectID(multyPost._id))
//             }
//         }, { $set: req.body }, { upsert: false });
//         res.send(result);
//     } catch (error) {
//         res.status(500).send(error.message);
//     }
// })



// Update A Single Post
postRoute.put('/:id', async (req, res) => {
    try {
        const result = await post.updateOne({
            _id: ObjectID(req.params.id)
        }, { $set: req.body }, { upsert: true });
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Update A Single Post and Return the Updated Post
postRoute.put('/:id/return', async (req, res) => {
    try {
        const result = await post.findOneAndUpdate({
            _id: ObjectID(req.params.id)
        }, { $set: req.body }, { upsert: false, returnOriginal: false });
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Delete Multiple Post
postRoute.delete('/multiple', async (req, res) => {

    const queryStr = req.query.text;
    try {
        const result = await post.deleteMany({
            title: { $regex: queryStr }
        })
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})



// Delete A Single Post
postRoute.delete('/:id', async (req, res) => {
    try {
        const result = await post.deleteOne({
            _id: ObjectID(req.params._id)
        })
        res.send(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
})




// export the module
module.exports = postRoute;
