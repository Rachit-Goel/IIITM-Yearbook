const express = require("express")
const app = express();
const async = require('async')
var bodyParser = require('body-parser');
var path = require('path');
var firebase = require("firebase");
const port = 3000;
var data =[];
var imgs1=[]
var imgs2=[]
var imgs3=[]
var imgs4=[]

const firebaseConfig = {
    apiKey: "AIzaSyChJRJp-JGGgd5-Uq_xcKUfcDvNb9SutYU",
    authDomain: "yearbook-1131e.firebaseapp.com",
    databaseURL: "https://yearbook-1131e.firebaseio.com",
    projectId: "yearbook-1131e",
    storageBucket: "yearbook-1131e.appspot.com",
    messagingSenderId: "693138307006",
    appId: "1:693138307006:web:54f997d613456a3f5f2bef"
};
firebase.initializeApp(firebaseConfig);
app.use(express.static(__dirname+'/Views'))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.engine('html', require('ejs-locals'));

app.get('/', function (req, res) {

  res.render("home");
})
app.get('/cat1', function (req, res) {

  res.render("home",{imgs:imgs1,class:"category1"});
})
app.get('/cat2', function (req, res) {

  res.render("home",{imgs:imgs2,class:"category2"});
})
app.get('/cat3', function (req, res) {

  res.render("home",{imgs:imgs3,class:"category3"});
})
app.get('/cat4', function (req, res) {

  res.render("home",{imgs:imgs4,class:"category4"});
})

async function fetchData(collection,array){

  await firebase.firestore().collection(collection).get().then((docs)=>{
    docs.forEach((item)=>{
      array.push(item.data().url)
      // console.log(item.data())
    })
    // imgs1=[...docs.data()]
  })
  //  app.render('index-Copy',{imgs:array},function(err,html){
  //   // console.log("re rendering")
  //   if(err){
  //     console.log(err)
  //   }
  // })
  // console.log(imgs1)
}

fetchData("category1",imgs1)
fetchData("category2",imgs2)
fetchData("category3",imgs3)
fetchData("category4",imgs4)

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
