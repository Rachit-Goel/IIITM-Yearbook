// var firebase = require("firebase");
var firebase = require('firebase')
var express = require("express");
var app = express.Router({ mergeParams: true })

app.post('/getdata', async function (req, res){
    var collection1 = req.body.collection1
    var collection2 = req.body.collection2

    if(collection1&&!collection2){
        let data=[]
        var res1 = await firebase.firestore().collection('yearbook').doc('folders').collection(collection1).get().then((docs)=>{
                docs.forEach((item)=>{
                    if(item.data().url!=""){
                        data.push(item.data().url)

                    }
                  // console.log(item.data())
                })
            })
            // var res1 = await firebase.firestore().collection(collection1).get().then((docs)=>{
            //     docs.forEach((item)=>{
            //         if(item.data().url!=""){
            //             data.push(item.data().url)

            //         }
            //       // console.log(item.data())
            //     })
            // })
        // return res.send(res1)
    // console.log("hello")
    return res.send(data)

    }else if (collection1&&collection2){
    let data=[]
       var res2 = await firebase.firestore().collection('yearbook').doc('folders').collection(collection1).doc("folders").collection(collection2).get().then((docs)=>{
        docs.forEach((item)=>{
            if(item.data().url!=""&&item.data().url!=null){
                data.push(item.data().url)

            }
          // console.log(item.data())
        })
    })
       return res.send(data)
    }
    // res.send("hello")
  })

module.exports = app;