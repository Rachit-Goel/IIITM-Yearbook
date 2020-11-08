const express = require("express")
const app = express();
const async = require('async')
var bodyParser = require('body-parser');
var path = require('path');
const axios = require('axios');
const admin = require('firebase-admin');
var firebase = require("firebase");

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

// const functions = require('firebase-functions');
// const serviceAccount = require('./yearbook-1131e-firebase-adminsdk-zgjp3-01ec647250.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const port = 3000;
var data =[];
var imgs1=[]
var imgs2=[]
var imgs3=[]
var imgs4=[]

app.use(express.static(__dirname+'/views'))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use('/',require('./fetchDatafromFB'))
//set default variables

// var db =[]
// firebase.firestore().collection('yearbook').get().then((docs)=>{
//   docs.forEach((item)=>{
//       // console.log(item.data())
//       console.log("45",item.id)
//       db.push(item.id)
//       var id = item.id
//       var res = getCollections()
    
//     console.log(res)
//   })
// })
// var data2= [
//   {
//     col:'Clubs',
//     subcol:[]
//   },
//   {
//     col:'Trips',
//     subcol:[]
//   },
//   {
//     col:'year1',
//     subcol:[]
//   },
//   {
//     col:'year2',
//     subcol:[]
//   },
//   {
//     col:'year3',
//     subcol:[]
//   },
//   {
//     col:'year4',
//     subcol:[]
//   },
//   {
//     col:'year5',
//     subcol:[]
//   }
// ] 

// data2.forEach((item)=>{
//   let documentRef = admin.firestore().doc('yearbook/folders/'+item.col+'/folders/');
//   documentRef.listCollections().then(collections => {
//     let d = []
//     for (let collection of collections) {
//       d.push(collection.id)
//     }
//     item.subcol = [...d]
//     console.log(item)
//   }

//   );
// }
// )

// console.log(data2)
var data1=[
  'ApnaGwalior',
  "IIITM's got talent",  
  'Individual Headshots',
]

var data3 =[
  { col: 'year5', subcol: [ 'campus life', 'random' ] },
{
  col: 'year2',
  subcol: [ 'campus life', 'infotsav', 'twaran', 'urja' ]
},
{
  col: 'year3',
  subcol: [ 'aurora', 'campus life', 'inter-iiit sports meet', 'urja' ]
},
{ col: 'year4', subcol: [ 'campus life' ] },
{ col: 'Clubs', subcol: [ 'AASF', 'Rotaract', 'SGM', 'Uthaan' ] },   
{
  col: 'year1',
  subcol: [
    'campus life',
    'diwali',
    'ganpati visarjan',
    'independence day',
    'infotsav',
    'mom',
    'parichay',
    'twaran',
    'urja'
  ]
},
{
  col: 'Trips',
  subcol: [
    'ICPC-Kerala-2017',
    'ICPC-Kerala-2018',
    'IIITM_Pahadi',
    'Jaipur 2016',
    'Manali2018',
    'Mangalore and Mumbai 2017',
    'Nainital 2017',
    'OtherMLLTrips',
    'Random',
    'Shivpuri-2018',
    'kasol-kheerganga-2018',
    'kasol-tosh-2019',
    'mysuru-2019',
    'nandi-hills-2019',
    'orchha-2018',
    'shivpuri-2017'
  ]
}
]

// res.render('index', );
// async function fetchData(collection,array){

//   await firebase.firestore().collection(collection).get().then((docs)=>{
//     docs.forEach((item)=>{
//       array.push(item.data().url)
//       // console.log(item.data())
//     })
//     // imgs1=[...docs.data()]
//   })
//   //  app.render('index-Copy',{imgs:array},function(err,html){
//   //   // console.log("re rendering")
//   //   if(err){
//   //     console.log(err)
//   //   }
//   // })
//   // console.log(imgs1)
// }

// fetchData("category1",imgs1)
// fetchData("category2",imgs2)
// fetchData("category3",imgs3)
// fetchData("category4",imgs4)

// // console.log("IMG1",imgs1.length)

app.get('/', function (req, res) {

  res.render("home",{home:true});
})
app.get('/about', function (req, res) {

  res.render("about",{home:false});
})
app.get('/contact', function (req, res) {

  res.render("contact",{home:false});
})


// var array = ["category1","category2","category3","category4"]
data3.forEach((item1)=>{
  // var item1={ col: 'year5', subcol: [ 'campus life', 'random' ] }

  item1.subcol.map((item)=>{
    var path = item.split(" ").join("")

    return(app.get('/'+item1.col+'/'+path, async function(req, res) {  
      // var data1 = app.get('/getdata',({"collection1": "Category1"}))
      // var data1 = await app.get('/getdata',({"collection1": "ApnaGwalior"}))
      // console.log(data1)
      const json = JSON.stringify({ collection1:item1.col,collection2:item });

      axios({
        method: 'post',
        url: 'http://iiitm-yearbook.herokuapp.com/getdata',
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        },
        data: json
      }).then(function (response) {
        // handle success
        // console.log(response.data);
        imgs2=[...response.data]
        if(imgs2.length){
          var route = item1.col+'/'+path
          var totalStudents = imgs2.length,
          pageSize = 16,
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
          // class:item,
          home:false,
          route:route,
          pageSize: pageSize,
          pageCount: pageCount,
          currentPage: currentPage});
        }
      })
  
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    }))
    // console.log('/'+col.col+'/'+path)
    
    
  })
})
  
// })
    // console.log('/'+col.col+'/'+path)
    // app.get('/123', async function(req, res) {  
    //   // var data1 = app.get('/getdata',({"collection1": "Category1"}))
    //   // var data1 = await app.get('/getdata',({"collection1": "ApnaGwalior"}))
    //   // console.log(data1)
    //   const json = JSON.stringify({ collection1:"year2",collection2:'campus life' });
    //   axios({
    //     method: 'post',
    //     url: 'http://localhost:3000/getdata',
    //     headers: {
    //       // Overwrite Axios's automatically set Content-Type
    //       'Content-Type': 'application/json'
    //     },
    //     data: json
    //   }).then(function (response) {
    //     // handle success
    //     // console.log(response.data);
    //     imgs2=[...response.data]
    //     if(imgs2.length){
    //       var route = "/123"
    //       var totalStudents = imgs2.length,
    //       pageSize = 6,
    //       pageCount = Math.round(totalStudents/pageSize); 
    //       currentPage = 1,
    //       students = [...imgs2],
    //       studentsArrays = [], 
    //       studentsList = [];
    //       while (students.length > 0) {
    //         studentsArrays.push(students.splice(0, pageSize));
    //       }
    //       if (typeof req.query.page !== 'undefined') {
    //       currentPage = +req.query.page;
    //       }
    //       studentsList = studentsArrays[+currentPage - 1];
    //       res.render("home",{imgs:studentsList,
    //       // class:item,
    //       home:false,
    //       route:route,
    //       pageSize: pageSize,
    //       pageCount: pageCount,
    //       currentPage: currentPage});
    //     }
    //   })
  
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .then(function () {
    //     // always executed
    //   });
    // })
    
  
  



data1.map((item)=>{
  var path = item.split(" ").join("")
  return(app.get('/'+path, async function(req, res) {  
    // 
    // var data1 = app.get('/getdata',({"collection1": "Category1"}))
    // var data1 = await app.get('/getdata',({"collection1": "ApnaGwalior"}))
    // console.log(data1)
    const json = JSON.stringify({ collection1: item });

    axios({
      method: 'post',
      url: 'http://iiitm-yearbook.herokuapp.com/getdata',
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      },
      data: json
      
    }).then(function (response) {
      // handle success
      // console.log(response.data);
      imgs1=[...response.data]
      if(imgs1.length){
        var route = path
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
        class:item,
        home:false,
        route:route,
        pageSize: pageSize,
        pageCount: pageCount,
        currentPage: currentPage});
      }
    })

    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
  }))
  
})
// app.get('/cat2', function (req, res) {
//   var route = "cat2"
//   var totalStudents = imgs2.length,
//   pageSize = 6,
//   pageCount = Math.round(totalStudents/pageSize); 
//   currentPage = 1,
//   students = [...imgs2],
//   studentsArrays = [], 
//   studentsList = [];
//   while (students.length > 0) {
//     studentsArrays.push(students.splice(0, pageSize));
//   }
//   if (typeof req.query.page !== 'undefined') {
//   currentPage = +req.query.page;
//   }
//   studentsList = studentsArrays[+currentPage - 1];
//   res.render("home",{imgs:studentsList,
//     class:"category1",
//     home:false,
//     route:route,
//     pageSize: pageSize,
//     pageCount: pageCount,
//     currentPage: currentPage});
// })

// app.get('/cat3', function (req, res) {
//   var route = "cat3"
//   var totalStudents = imgs3.length,
//   pageSize = 6,
//   pageCount = Math.round(totalStudents/pageSize); 
//   currentPage = 1,
//   students = [...imgs3],
//   studentsArrays = [], 
//   studentsList = [];
//   while (students.length > 0) {
//     studentsArrays.push(students.splice(0, pageSize));
//   }
//   if (typeof req.query.page !== 'undefined') {
//   currentPage = +req.query.page;
//   }
//   studentsList = studentsArrays[+currentPage - 1];
//   res.render("home",{imgs:studentsList,
//     class:"category1",
//     home:false,
//     route:route,
//     pageSize: pageSize,
//     pageCount: pageCount,
//     currentPage: currentPage});
// })

// app.get('/cat4', function (req, res) {
//   var route = "cat4"
//   var totalStudents = imgs4.length,
//   pageSize = 6,
//   pageCount = Math.round(totalStudents/pageSize); 
//   currentPage = 1,
//   students = [...imgs4],
//   studentsArrays = [], 
//   studentsList = [];
//   while (students.length > 0) {
//     studentsArrays.push(students.splice(0, pageSize));
//   }
//   if (typeof req.query.page !== 'undefined') {
//   currentPage = +req.query.page;
//   }
//   studentsList = studentsArrays[+currentPage - 1];
//   res.render("home",{imgs:studentsList,
//     class:"category1",
//     home:false,
//     route:route,
//     pageSize: pageSize,
//     pageCount: pageCount,
//     currentPage: currentPage});
// })

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});


// app.listen(process.env.PORT, process.env.IP, function(){
//   console.log("server started");
// })
