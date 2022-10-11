import { faker } from '@faker-js/faker';

const users = [];
const posts = [];
const comments = [];

export const getUserSize = () => {
    console.log(users.length);
}

export const saveUser = (userid, name) => {
    let user = {
        userid,
        name
    };
    users[userid] = user;
    return user;
}
export const getUser = (userid) => {
    if (users[userid] === undefined) {
        return null;
    }
    return users[userid];
};
export const createRandUser = () => {
    const userid = faker.random.alphaNumeric();
    const name = faker.name.fullName();
    return {
        userid,
        name
    };
};

export const savePost = (postid, userid, content) => {
    if (users[userid] === undefined) {
        return null;
    }
    let post = {
        postid,
        userid,
        name: users[userid].name,
        content
    };
    posts[postid] = post;
    return post;
}
export const getPost = (postid) => {
    if (posts[postid] === undefined) {
        return null;
    }
    return posts[postid];
};
export const createRandPost = () => {
    const postid = faker.random.alphaNumeric();
    const userid = faker.random.alphaNumeric();
    const name = faker.name.fullName();
    const content = faker.random.words();
    return {
        postid,
        userid,
        name,
        content
    };
};

export const saveComment = (commentid, postid, userid, content) => {
    let comment = {
        commentid,
        postid,
        userid,
        name: users[userid.name],
        content
    };
    if (users[userid] === undefined || posts[postid] === undefined) {
        return null;
    }
     comments[commentid] = comment;
     return comment;
}
export const getComment = (commentid) => {
    if (comments[commentid] === undefined) {
        return null;
    }
    return comments[commentid];
};
export const createRandComment = () => {
    const commentid = faker.random.alphaNumeric();
    const postid = faker.random.alphaNumeric();
    const userid = faker.random.alphaNumeric();
    const name = faker.name.fullName();
    const content = faker.random.words();
    return {
        commentid,
        postid,
        userid,
        name,
        content
    };
};