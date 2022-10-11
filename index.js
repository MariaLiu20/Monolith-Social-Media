import express from 'express';
import logger from 'morgan';
import { randomBytes } from 'crypto';
import * as db from './db.js';
import * as fake from './fakerCreate.js';

const app = express();
const portNum = 4001;

app.use(logger('dev'));
app.use(express.json());

// Create User
app.post('/api/user/create', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { name } = req.body;
    if (name === undefined) {
        res.status(400).json({
            message: "Missing name"
        });
        return;
    }
    if (name.length == 0 || name.length > 64) {
        res.status(400).json({
            message: "Min/max character restrictions"
        });
        return;
    }
    const user = db.saveUser(id, name);
    res.status(201).send(user);
    
});
app.get('/api/user/create', (req, res) => {
    const { userid } = req.body;
    if (userid === undefined) {
        res.status(400).json({
            message: "Missing userid"
        });
        return;
    }
    const user = db.getUser(userid);
    if (user === null) {
        // User doesn't exist
        res.status(404).json({
            message: `Unknown userid: ${userid}`
        });
        return;
    }
    res.status(200).send(user);
});

// Create Post
app.post('/api/posts/create', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { userid, content} = req.body;
    if (userid === undefined || content === undefined) {
        // Request data is incomplete
        res.status(400).json({
            message: "Missing userid and/or content"
        });
        return;
    }
    if (content.length > 128) {
        res.status(400).json({
            message: "Max 128 character limit"
        });
        return;
    }
    const post = db.savePost(id, userid, content);
    
    if (post === null) {
        // User doesn't exist
        res.status(404).json({
            message: `Unknown userid: ${userid}`
        });
        return;
    }
    res.status(201).send(post);
});
app.get('/api/posts/create', (req, res) => {
    const { postid } = req.body;
    if (postid === undefined) {
        res.status(400).json({
          message: 'Missing postid'
        });
        return;
    }
    const post = db.getPost(postid);
    if (post === null) {
        res.status(404).json({
            message: `Unknown postid: ${postid}`
          });
        return;
    }
    res.status(200).send(post);
});

// Create Comment
app.post('/api/comments/create', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {userid, postid, content} = req.body;
    if (userid === undefined || postid === undefined || content === undefined) {
        // Request data is incomplete
        res.status(400).json({
            message: "Missing userid, postid, and/or content"
        });
        return;
    }
    if (content.length > 128) {
        res.status(400).json({
            message: "Max 128 character limit"
        });
        return;
    }

    const comment = db.saveComment(id, postid, userid, content);
    if (comment === null) {
        // User doesn't exist || Post doesn't exist
        res.status(404).json({
            message: `Unknown userid: ${userid} and/or postid: ${postid}`
        });
        return;
    }
    res.status(201).send(comment);
});
// Get Comment
app.get('/api/comments/get', (req, res) => {
    const { commentid } = req.body;
    if (commentid === undefined) {
        res.status(400).json({
            message: 'Missing commentId'
        });
        return;
    }
    const comment = db.getComment(commentid);

    if (comment === null) {
        res.status(404).json({
            message: `Unknown commentid: ${commentid}`
        });
        return;
    }
    res.status(200).send(comment);
});

app.listen(portNum, () => {
    console.log('Listening on 4001');
});

fake.generateData();