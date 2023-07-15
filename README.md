# learning-react
learning-react
/d/react/learning-react/blogapp-react-node-mongo-auth (blogapp-react-node-mongo-auth)
$ "C:/Program Files/MongoDB/Server/6.0/bin/mongod.exe" --dbpath=./mongodb-data/

$ /d/sw/mongosh-1.10.1-win32-x64/mongosh-1.10.1-win32-x64/bin/mongosh
test> use react-blog-db-data
switched to db react-blog-db-data
react-blog-db-data>
react-blog-db-data> db.articles.find({})

data to insert and query
db.articles.insertMany([    {        name: 'learn-react',        upvotes: 0,        comments: []    },    { name: 'learn-node',        upvotes: 0,        comments: []    },    {        name: 'mongodb',         upvotes: 0,        comments: []    }])
db.articles.find({name: 'learn-react'})