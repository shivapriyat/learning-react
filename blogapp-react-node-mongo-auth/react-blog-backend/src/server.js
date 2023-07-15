import express from 'express';
import {db,connectToMongoDB} from './mongodbconnect.js';
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
connectToMongoDB().then(()=> {
    console.log("Connected to Mongo DB . Proceeding to start express server !");
    app.listen(8000, (req,res) => {
        console.log("server listening on 8000");
    });
});

app.get("/api/v2/articles/:articleId", async(req,res)  => {
    const {articleId} = req.params;
    const article = await db.collection("articles").findOne({name: articleId});
    if(article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
});

app.put("/api/v2/articles/:articleId/upvote", async(req,res)=> {
    const {articleId} = req.params;
    await db.collection("articles").updateOne({name: articleId},{
        $inc: {upvotes:1}
    });
    const article = await db.collection("articles").findOne({name: articleId});
    if(article) {
        res.json(article);
    }
    else {
        res.sendStatus(400);
    }
});

app.post("/api/v2/articles/:articleId/comments", async(req,res) => {
    const {articleId} = req.params;
    const comment = req.body;
    await db.collection("articles").updateOne( {name: articleId}, {
        $push: {comments: comment }
    });
    const article = await db.collection("articles").findOne({name: articleId});
    if(article) {
        res.json(article);
    }
    else {
        res.sendStatus(404);
    }
});

app.get("/hello", (req,res) => {
    res.send("Hello from node!!");
});

app.get("/hello/:name", (req,res)=> {
    const {name} = req.params;
    console.log(name);
    res.send(`hello ${name}`);
});

app.post("/hello", (req,res) => {
    const {name}=req.body;
    res.send(`hello from post body ${name}`)
});

app.put("/api/articles/:articleName/upvote", (req,res)=> {
    let {articleName} = req.params;
    const article = articleInfo.find(a => a.articleName === articleName);
    if(article) {
        article.vote+=1;
        res.send(`The article ${articleName} now has ${article.vote} upvotes !!`);
    }
    else {
        res.send(`The article ${articleName} doesn\'t exist !!!`);
    }
}); 

app.post("/api/articles/:articleName/comments", (req,res) => {
    const {articleName}=req.params;
    const {postedBy,content} = req.body;
    let article = articleInfo.find(a=> a.articleName===articleName);
    if(article) {
        article.comment.push({postedBy,content});
        res.send(`The article ${articleName} has comments: ${JSON.stringify(article.comment)}`);
    }
    else {
        res.send(`The article ${articleName} doesn\'t exist !!!`);
    }
})