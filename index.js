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
app.use(express.static(__dirname+'/views'))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
// app.engine('html', require('ejs-locals'));
//set default variables



//render index.ejs view file


// res.render('index', );
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

// console.log("IMG1",imgs1.length)

app.get('/', function (req, res) {

  res.render("home",{home:true});
})
app.get('/about', function (req, res) {

  res.render("about",{home:false});
})
app.get('/contact', function (req, res) {

  res.render("contact",{home:false});
})
app.get('/cat1', function (req, res) {  
  // 

    // if(imgs1.length){
      var route = "cat1"
      var totalStudents = imgs1.length,
      pageSize = 6,
      pageCount = Math.round(totalStudents/pageSize); 
      currentPage = 1,
      students = [...imgs1],
      studentsArrays = [], 
      studentsList = [];
      while (students.length > 0) {
        studentsArrays.push(students.splice(0, pageSize));
      }
      if (typeof req.query.page !== 'undefined') {
      currentPage = +req.query.page;
      }
      studentsList = studentsArrays[+currentPage - 1];
      res.render("home",{imgs:studentsList,
      class:"category1",
      home:false,
      route:route,
      pageSize: pageSize,
      pageCount: pageCount,
      currentPage: currentPage});
    // }
})

app.get('/cat2', function (req, res) {
  var route = "cat2"
  var totalStudents = imgs2.length,
  pageSize = 6,
  pageCount = Math.round(totalStudents/pageSize); 
  currentPage = 1,
  students = [...imgs2],
  studentsArrays = [], 
  studentsList = [];
  while (students.length > 0) {
    studentsArrays.push(students.splice(0, pageSize));
  }
  if (typeof req.query.page !== 'undefined') {
  currentPage = +req.query.page;
  }
  studentsList = studentsArrays[+currentPage - 1];
  res.render("home",{imgs:studentsList,
    class:"category1",
    home:false,
    route:route,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage: currentPage});
})

app.get('/cat3', function (req, res) {
  var route = "cat3"
  var totalStudents = imgs3.length,
  pageSize = 6,
  pageCount = Math.round(totalStudents/pageSize); 
  currentPage = 1,
  students = [...imgs3],
  studentsArrays = [], 
  studentsList = [];
  while (students.length > 0) {
    studentsArrays.push(students.splice(0, pageSize));
  }
  if (typeof req.query.page !== 'undefined') {
  currentPage = +req.query.page;
  }
  studentsList = studentsArrays[+currentPage - 1];
  res.render("home",{imgs:studentsList,
    class:"category1",
    home:false,
    route:route,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage: currentPage});
})

app.get('/cat4', function (req, res) {
  var route = "cat4"
  var totalStudents = imgs4.length,
  pageSize = 6,
  pageCount = Math.round(totalStudents/pageSize); 
  currentPage = 1,
  students = [...imgs4],
  studentsArrays = [], 
  studentsList = [];
  while (students.length > 0) {
    studentsArrays.push(students.splice(0, pageSize));
  }
  if (typeof req.query.page !== 'undefined') {
  currentPage = +req.query.page;
  }
  studentsList = studentsArrays[+currentPage - 1];
  res.render("home",{imgs:studentsList,
    class:"category1",
    home:false,
    route:route,
    pageSize: pageSize,
    pageCount: pageCount,
    currentPage: currentPage});
})


// app.listen(port, () => {
//   console.log(`server running at port ${port}`);
// });

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("server started");
})
