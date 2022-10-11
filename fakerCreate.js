import * as db from './db.js';
import axios from 'axios';
import { faker } from '@faker-js/faker';

export const generateData = () => {
    for (let i = 0; i < 1000; i++) {
        const { name } = faker.name.fullName();
        axios.post('http://localhost:4001/api/user/create', {
            name: name
        }).then((user) => {
            db.saveUser(user.userid, user.name);
            axios.post('http://localhost:4001/api/posts/create', {
                userid: user.userid,
                content: faker.random.words()
            }).then((post) => {
                db.savePost(post.postid, post.userid, post.content);
                axios.post('http://localhost:4001/api/comments/create', {
                    userid: post.userid,
                    postid: post.postid,
                    content: faker.random.words()
                }).catch((error) => {
                    alert(error);
                }).then((comment) => {
                    db.saveComment(comment.userid, comment.postid, faker.random.words());
                });
            });
        }).catch((error) => {
                console.log(error);
            });
        setTimeout(() => null, 1000);
    }
    db.getUserSize();
}