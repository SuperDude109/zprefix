const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json())

const env = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[env]
const knex = require('knex')(config)

app.get('/', (request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    response.status(200).send('App root route running congrats');
})


//fetches
{
    app.get('/users', (request, response) => {
        knex('users')
            .select('*')
            .then(users => {
                let responseData = users.map(user => (
                    { 
                        firstName: user.first_name, 
                        lastName: user.last_name,
                        username: user.username,
                        password: user.password,
                    }
                ));
        knex('post')
                response.status(200).send(responseData)
            })
    })


    app.get('/posts/user/:userid',  (req, res) => {
        // console.log("Here is the req "+ JSON.stringify(req.params))
        knex('posts')
            .select('*')
            .then( posts => 
                {//using a filter we are able to get all posts or a user's posts
                    return posts.filter(post => post.user_id==((req.params.userid!=0)?req.params.userid:post.user_id))
                }
            )
            .then(responseData => {
                // console.log("response data =",responseData)
                res.end(JSON.stringify(responseData))})
    })

    {

    app.get('/user/getusername/:user_id', (req,res)=>{//converts a userID into a username
        knex('users')
            .select("*")
            .where({id: req.params.user_id})
            .then(data=> {
                res.status(200).send({username:data[0].username})
            })
    })

    app.get('/user/getuserid/:username', (req,res)=>{//converts a userID into a username        
        knex('users')
            .select("*")
            .where({username: req.params.username})
            .then(data=> {
                res.status(200).send((data.length>0)?{user_id:data[0].id}:{})
            })
    })
    }
}

//create
{
    app.post('/posts', (req, res) => {
        console.log("\n\nHere is the req body",req.body.title,"\n\n")
        let{title,content,user_id} = req.body
        knex('posts')
            .insert(    
                {
                    title:title?title:"no title",
                    content:content?content:"no content",
                    user_id:user_id
                }
            )
            .then(()=> {return res.end("success")})
            .catch(()=>{
                return res.end("Title is already taken")
            })   
    }) 

 

     app.post('/users', async (req, res) => {
        let {first_name,last_name,username,password}=req.body
        let values = {first_name,last_name,username,password}
        console.log("Creating a new user")
        await knex('users')
            .insert({...values})
            .then(res.status(200).send('new user made!'))
            .catch(()=>res.end('User unable to be made!'))
     }) 

}


//update
{
    app.patch('/users', (req, res) => {
        let {first_name,last_name,username,new_user_name,password,id} = req.body
        knex('users')
            .select("*")
            .where({ username: username })
        .then(data => //this gives us access to the old data so we don't overwrite anything
            knex('users')//we don't neccesarly know what database we are in anymore so we open a new instance
                .where({username:username})
                .update(
                    {//this makes it harder for malicious users to add their own data to their account
                        first_name:first_name?first_name:data.first_name,
                        last_name:last_name?last_name:data.last_name,
                        username:(new_user_name?new_user_name:username),
                        password:password?password:data.password,
                        id:id?id:data.id,
                    })
                .then(console.log("Things updated smooth"))
                .then(res.status(200).send('patched!'))
        )
        })

    app.patch('/posts', async (req, res) => {
        let {title,content,user_id,post_id,new_post_id} = req.body
        console.log("Trying to edit a post")
        await knex('posts')
            .select("*")
            .where({title: title})
        .then(async data =>{ //this gives us access to the old data so we don't overwrite anything
            return await knex('posts')//we don't neccesarly know what database we are in anymore so we open a new instance
                .update(
                    {//this makes it harder for malicious users to add their own data to their posts
                        title:title?title:data.title,
                        content:content?content:data.content,
                        id:(new_post_id?new_post_id:post_id),
                        user_id:user_id?user_id:data.user_id,
                    })
                    .where({title:title})
                .catch(()=>res.send("Something went wrong"))
                
        })
        })

}

//delete
{
app.delete('/users', async (req, res) => {
    await knex('users')
        .del(["*"])
        .where({username: req.body.username}) 
        .then(res.end( req.body.username+' has been deleted!'))
    })

app.delete('/posts',  async (req, res) => {
    console.log("Attempting to delete data "+ JSON.stringify(req.body))
    knex('posts')
        .where({title: req.body.title})//could send in title and user id to verify that use owns the blog before deleting
        .then((data)=>res.end("'"+data[0].title+"' has been deleted!"))
    await knex('posts')
        .del(['*'])
        .where({title: req.body.title})
    })
}

//validate login
{
    app.post('/login', (req, res) => {
        // console.log(req.body)
        knex('users')
            .select(["*"])
            .where({username:req.body.username,password:req.body.password})
            .then(users => {
                let responseData =((users.length)?[{login:"true"}]:[{login:"false"}])
                // console.log(responseData)
        knex('post')
                res.status(200).send(responseData)
            })
    })
}
module.exports = app;

