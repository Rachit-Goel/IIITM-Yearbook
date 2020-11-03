const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');
const async = require('async');
const { time } = require('console');
const { checkServerIdentity } = require('tls');
const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/drive.metadata.readonly",
  "https://www.googleapis.com/auth/drive.appdata",
  "https://www.googleapis.com/auth/drive.metadata",
  "https://www.googleapis.com/auth/drive.photos.readonly"
];
var oAuth2Client
var data=[];
var yearbook=[];
const TOKEN_PATH = 'token.json';
var drive
var pageToken = null;

fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content),listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.web;
  oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function makeUrl (id){
  var str = "https://drive.google.com/uc?export=view&id="
  var url = str + id
  return url
}

function urlFromData(data){
  data.forEach((item)=>{
    var url = makeUrl(item.id)
    imgs.push(url)
  })
  
  

  // app.render('index-Copy',{imgs:imgs},function(err,html){
  //   console.log("re rendering")
  //   if(err){
  //     console.log(err)
  //   }
  // })

  // console.log(imgs)     <%console.log(imgs)%> <img src= <% imgs[1] %> >     <%console.log(imgs[1])%>


}
/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

function f3(err) {
  if (err) {
    // Handle error
    console.error(err);
  } else {
    // All pages fetched
    // console.log(data)
    // yearbook=[...data]
    // yearbook.forEach((item)=>{
    //   item.data=[]
    //   async.doWhilst(f1(pageToken,item.id),f2(pageToken),f3())
    // })
    // console.log(data)
    check();
    // urlFromData(data)
  }
}



function f1(pageToken,fileid) {
  
  drive.files.list({
    q: fileid + " in parents",
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive',
    pageToken: pageToken
  }, function (err, res) {
    if (err) {
      // Handle error
      // console.error(err);
      f3(err)
    } else {
      // res.data.files.forEach(function (file) {
      //   console.log('Found file: ', file.name, file.id);
      //   data.push(file)
      // });
      // console.log(res.data.files)
      data= [...res.data.files]
      // console.log(data)
     
      pageToken = res.nextPageToken;
      f3();
    }
  });
}
function f2(pageToken) {
  f3();
  return !!pageToken;
}

function f6(item) {
  // if (err) {
  //   // Handle error
  //   console.error(err);
  // } else {
    // All pages fetched
    // console.log(data)
    // yearbook=[...data]
    // yearbook.forEach((item)=>{
    //   item.data=[]
    //   async.doWhilst(f1(pageToken,item.id),f2(pageToken),f3())
    // })
    // console.log("data=",data)
    // console.log("item=",item)
    // if(item!="0"){
      item.data=[...data];
      yearbook.forEach((e)=>{
        if(item.id==e.id){
          e=item
          // console.log("e=",e)
        }
        
      })
    // }
    // console.log("f3 se yearbook=",yearbook)
    // console.log("f3 se yearbook",yearbook)
    check2();
    // urlFromData(data)
  // }
}



function f4(pageToken,fileid,item) {
  
  drive.files.list({
    q: fileid + " in parents",
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive',
    pageToken: pageToken
  }, function (err, res) {
    if (err) {
      // Handle error
      // console.error(err);
      f6(item)
    } else {
      // res.data.files.forEach(function (file) {
      //   console.log('Found file: ', file.name, file.id);
      //   data.push(file)
      // });
      // console.log(res.data.files)
      data= [...res.data.files]
      // console.log(data)
     
      pageToken = res.nextPageToken;
      f6(item);
    }
  });
}
function f5(pageToken,item) {
  f6(item);
  return !!pageToken;
}

function f9(item) {
  // if (err) {
  //   // Handle error
  //   console.error(err);
  // } else {
    // All pages fetched
    // console.log(data)
    // yearbook=[...data]
    // yearbook.forEach((item)=>{
    //   item.data=[]
    //   async.doWhilst(f1(pageToken,item.id),f2(pageToken),f3())
    // })
    // console.log("data=",data)
    // console.log("item=",item)
    // if(item!="0"){
      item.data=[...data];
      yearbook.forEach((e)=>{
        if(item.id==e.id){
          e=item
          // console.log("e=",e)
        }
        
      })
    // }
    console.log("\n....start...\n");
    console.log("f9 se yearbook trips ka folder =",(yearbook[9].data));
    // console.log("f9 se yearbook=",(yearbook[2].data));
    // console.log("f3 se yearbook",yearbook)
    
    // check2();
    // urlFromData(data)
  // }
}



function f7(pageToken,fileid,item) {
  
  drive.files.list({
    q: fileid + " in parents",
    fields: 'nextPageToken, files(id, name)',
    spaces: 'drive',
    pageToken: pageToken
  }, function (err, res) {
    if (err) {
      // Handle error
      // console.error(err);
      f9(item)
    } else {
      // res.data.files.forEach(function (file) {
      //   console.log('Found file: ', file.name, file.id);
      //   data.push(file)
      // });
      // console.log(res.data.files)
      data= [...res.data.files]
      // console.log(data)
     
      pageToken = res.nextPageToken;
      f9(item);
    }
  });
}
function f8(pageToken,item) {
  f9(item);
  return !!pageToken;
}

function listFiles(auth) {
  // drive = google.drive({version: 'v3', auth});
  drive = google.drive({version: 'v3', auth});
// Using the NPM module 'async'
async.doWhilst(f1(pageToken,"'1ufjzTrd_TwaxTrRg40P-Lo-zVcAVd0Ga'"),f2(pageToken),f3())
// console.log(data)

}
// listFiles(oAuth2Client)
function waitSeconds(iMilliSeconds) {
  var counter= 0
      , start = new Date().getTime()
      , end = 0;
  while (counter < iMilliSeconds) {
      end = new Date().getTime();
      counter = end - start;
  }
}

function check(){
  yearbook=[...data]
  data=[]
  yearbook.forEach((item)=>{
      // if(item.name=='Year 5'){
        item.data=[]   
      //  console.log("check se=",item)  
       async.doWhilst(f4(pageToken,'"'+item.id+'"',item),f5(pageToken,item),f6(item))
      //  waitSeconds(6000)
      // item.data=data
      
      
    // }
})   
// console.log(yearbook)
// console.log(yearbook[6])
}


function check2(){

  // yearbook[].data=[...data]
  data=[]
  // console.log(yearbook)
  yearbook.forEach((item)=>{
    // console.log("\n....start...\nfolder name=",item.name);
    // console.log(" data=",item.data);
    // console.log("222222222222222222")
    if(item.data!=undefined){
      item.data.forEach((x)=>{
        if(!((/.jpg$/.test(x.name))||(/.JPG$/.test(x.name))||(/.jpeg$/.test(x.name))||(/.png$/.test(x.name)))){  
          x.data=[]  
          // console.log("xi=",x)  
          async.doWhilst(f7(pageToken,'"'+x.id+'"',x),f8(pageToken,x),f9(x))
        }
      })
    }
    
    //   if(item.name=='Year 5'){
        
    //    waitSeconds(6000)
    //   item.data=data
      
    // }
})   
// console.log(yearbook)
// console.log(yearbook[6])
}
// async.doWhilst(check);
// yearbook=[...data]
// yearbook.forEach((item)=>{
//      item.data=[]     
//      async.doWhilst(f1(pageToken,item.id),f2(pageToken),f3())
//      waitSeconds(6000)
//      item.data=data
// })

