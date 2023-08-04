import express from 'express';
import {db,connectToMongoDB} from './mongodbconnect.js';
import admin from 'firebase-admin';
import fs from 'fs';

const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const app = express();
app.use(express.json())

let articleInfo = [
    {
        articleName: "learn-node",
        vote: 0,
        comment: []
    },
    {
        articleName: "learn-react",
        vote: 0,
        comment: []
    },
    {
        articleName: "mongodb",
        vote: 0,
        comment: []
    }
];

app.get("/api/hello", (req,res) => {
    return  res.send("Hello from node!!");
});

app.get("/api/hello/:name", (req,res)=> {
    const {name} = req.params;
    console.log(name);
    return  res.send(`hello ${name}`);
});

app.post("/api/hello", (req,res) => {
    const {name}=req.body;
    return res.send(`hello from post body ${name}`)
});

app.put("/api/articles/:articleName/upvote", (req,res)=> {
    let {articleName} = req.params;
    const article = articleInfo.find(a => a.articleName === articleName);
    if(article) {
        article.vote+=1;
        return res.send(`The article ${articleName} now has ${article.vote} upvotes !!`);
    }
    else {
        return  res.send(`The article ${articleName} doesn\'t exist !!!`);
    }
}); 

app.post("/api/articles/:articleName/comments", (req,res) => {
    const {articleName}=req.params;
    const {postedBy,content} = req.body;
    let article = articleInfo.find(a=> a.articleName===articleName);
    if(article) {
        article.comment.push({postedBy,content});
        return  res.send(`The article ${articleName} has comments: ${JSON.stringify(article.comment)}`);
    }
    else {
        return  res.send(`The article ${articleName} doesn\'t exist !!!`);
    }
});

connectToMongoDB().then(()=> {
    console.log("Connected to Mongo DB . Proceeding to start express server !");
    app.listen(8000, (req,res) => {
        console.log("server listening on 8000");
    });
});

app.use(async(req,res,next) => {
    const {authtoken} = req.headers;
    if(authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return  res.sendStatus(400);
        }
    }    
    req.user = req.user || {};
    next();
});

app.get("/api/v2/articles/:articleId", async(req,res)  => {
    const {articleId} = req.params;
    const {uid} = req.user;
    const article = await db.collection("articles").findOne({name: articleId});
    if(article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.includes(uid);
        return res.json(article);
    }
    else {
        return res.sendStatus(404);
    }
});

app.use((req,res,next)=> {
    if(req.user.uid) {
        next();
    }
    else {
        return res.sendStatus(401);
    }
});
app.put("/api/v2/articles/:articleId/upvote", async(req,res)=> {
    const {articleId} = req.params;
    const {uid} = req.user;

    const article = await db.collection('articles').findOne({name: articleId});
    if(article) {
        const upvoteIds = article.upvoteIds || [];
        const canUpvote = !upvoteIds.includes(uid);
        if(canUpvote) {
            await db.collection("articles").updateOne({name: articleId},{
                $inc: {upvotes:1},
                $push: {upvoteIds: uid}
            });
        }
        const updatedArticle = await db.collection("articles").findOne({name: articleId});
        return res.json(updatedArticle);
    } else {
        return res.sendStatus(400);
    }
});

app.post("/api/v2/articles/:articleId/comments", async(req,res) => {
    const {articleId} = req.params;
    const {text} = req.body;
    const {email} = req.user;
    await db.collection("articles").updateOne( {name: articleId}, {
        $push: {comments: {postedBy: email,text} }
    });
    const article = await db.collection("articles").findOne({name: articleId});
    if(article) {
        return res.json(article);
    }
    else {
        return res.sendStatus(404);
    }
});
