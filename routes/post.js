const express = require("express");
const router = express.Router();
const POST = require("../models/Post.js"); 

router.post("/create", async(req, res) => {
    try {
        const post = await POST.create(req.body);
        res.status(201).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to creating the post" });
    }
});

router.get("/", async (req, res) => {
    try {
        const post = await POST.find();
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to retrieving the posts" });
    }
});

router.get("/id/:_id", async (req, res) => {
    try {
        const post = await POST.findById(req.params._id);
        if (!post) {
            return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to retrieving the posts" });
    }
});


router.get("/title/:title", async (req, res) => {
    try {
        const post = await POST.findOne({ title: req.params.title });
        if (!post) { return res.status(404).send({ message: "Post not found" });
     }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to retrieving the post" });
    }
});


router.put("/id/:_id", async (req, res) => {
    try {
        const updatedPost = await POST.findByIdAndUpdate(req.params._id, req.body, 
            { new: true } 
        );

        if (!updatedPost) { return res.status(404).send({ message: "Post not found" });
        } 
        res.status(200).send(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to update the post" });
    }
});

router.delete("/id/:_id", async (req, res) => { 
    try {
        const deletedPost = await POST.findByIdAndDelete(req.params._id);
        if (!deletedPost) { return res.status(404).send({ message: "Post not found" });
        }
        res.status(200).send({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "There was a problem trying to delete the task" });
    }   
});
    
module.exports = router;