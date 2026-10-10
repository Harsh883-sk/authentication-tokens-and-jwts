const express = require("express");
const app = express();
const jwt=require('jsonwebtoken');
const JWT_SECRET="randomharkiratilovekira"


//for accessing the body
app.use(express.json());
//for fullfilling the database requirement;

const users  = [];
//stores the username and the password;

 
app.post("/signup", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  users.push({
    username: username,
    password: password,
  });
  res.json({
    msg: "You have signedup  kdmkfvefn successfully",
  });
});
app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  let foundUser=null;
  for(let i=0; i<users.length;i++){
    if(users[i].username==username && users[i].password==password){
      foundUser=users[i]
    }
  }

  if (foundUser) {
    const token = jwt.sign({
        username: username
        
    },JWT_SECRET);
   // foundUser.token = token;
    res.json({
      message: token,
    });
  } else {
    res.status(403).send({
      message: "Invalid username or password",
    });
  }

  // const user=user.find(function(u){
  //   if(u.username == username && u.password==password){
  //     return true ;
  //   }else{
  //     return false;
  //   }
  // })





  //Create an authenticted endpoint means once the user is loggedin then only it can see this details
  app.get("/me",function(req,res){
    // as the token which we are generating we putting in header so that it can accessable to every end point
    const token=req.headers.token 
    let foundUser=null;
    for(let i=0;i<users.length;i++){
      if(users[i].token==token){
        foundUser=users[i];
      }
    }
    if(foundUser){
      res.json({
        username: foundUser.username,
        password: foundUser.password
      })
    }else{
      res.json({
        msg: "Token is invalid"
      })
    }
  })
});
app.get("/me", function (req, res) {
   // as the token which we are generating we putting in header so that it can accessable to every end point
   const token = req.headers.token;
   
   const decodedInformation = jwt.verify(token,JWT_SECRET);
   const username=decodedInformation.username;




   let foundUser = null;
   for (let i = 0; i < users.length; i++) {
     if (users[i].username == username) {
       foundUser = users[i];
     }
   }
   if (foundUser) {
     res.json({
       username: foundUser.username,
       password: foundUser.password,
     });
   } else {
     res.json({
       msg: "Token is invalid",
     });
   }
 });

app.listen(3000);
