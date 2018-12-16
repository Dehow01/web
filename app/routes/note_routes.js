var ObjectID = require('mongodb').ObjectID;
const express = require("express");
const app = express();
const jsonParser = express.json();
const fs = require('fs');
const ca = require('./module/ca');
module.exports = function(app, db) {
  // app.get('/notes/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('notes').findOne(details, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send(item);
  //     } 
  //   });
  // });
  app.post("/register", function (req, res) {
    const note = { username: req.body.username, password: req.body.password };
    db.collection('notes').insert(note, (err, result) => {
      
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.redirect('../');
        // res.send(result.ops[0]);
      }
    })
  })
  app.post("/admin_news", function (req, res) {
    db.collection('introduced_news').find({approve: "false"}).toArray(function(err, results){
       if (err) { 
         res.send({ 'error': 'Error find colections arsenal_match' }); 
       } else {
        res.json(results);
   
       }

      })
   
   
  })
  app.post("/del_news", function (req, res) {
    var ok = req.body.ok;
    var not = req.body.not;
    if (not){
      db.collection('introduced_news').remove({key : parseInt(not)});
      res.redirect('/admin_news');
      }
    if (ok){
      db.collection('introduced_news').find({key : parseInt(ok)}).toArray(function(err, results){
        if (err) { 
          res.send({ 'error': 'Error find colections '+note.collection }); 
        } else {
          // console.log(results);
          // console.log(typeof(results));
          insert_news(results);
          del_news(ok);
          res.redirect('/admin_news');
        }
        function insert_news(resul){
          db.collection('blog').insert(resul, (err, result) => {
                  
            if (err) { 
              res.send({ 'error': 'An error has user' }); 
            } else {
              console.log(result);
            }
          })
        }
        function del_news(keys){
          db.collection('introduced_news').remove({key : parseInt(keys)});
          // db.collection('blog').remove();
        }
    })
  }
    // if ( )
    // console.log(ok,not);
    // const key = 
    // 

    //   })
   
   
  })
  app.post("/blog_star", function (req, res) {
      
      const key = req.body.key;
      const nick = req.user.nickname;
      // console.log(key);
      // console.log(typeof(req.user.nickname))
      // console.log(nick);
      db.collection('user').find({nickname:nick}).toArray(function(err, results){
        if (err) { 
          res.send({ 'error': 'Error find colections ' }); 
        } else {
          let arr =[];
          // console.log(results[0].blog_news_id);
          // let arr = results[0].blog_news_id[0];
          for (index in results[0].blog_news_id ){
            arr[index]=results[0].blog_news_id[index];
          }
          arr.push(key);
          update(arr);
          // console.log(typeof(arr))
          // console.log(arr);
        }
      //
        })
        function update(arr){
          db.collection('user').update({nickname : nick}, {$set: {blog_news_id : arr}})
        }
})
  app.post("/add_db", function (req, res) {
    let tag = req.body.tag;
    const note = { title: req.body.title, desc_title: req.body.desc_title,tag:req.body.tag, pre: req.body.news,post: req.body.podcat, key:parseInt(Math.random()*1000),marker:"false",approve:"false"};
    // console.log(note);
    db.collection('introduced_news').insert(note, (err, result) => {
      
      if (err) { 
        res.send({ 'error': 'Error  add_bd' }); 
      } else {
        // return(false);
        //  res.json(result)
        // console.log(result);
        // res.send('новость успешно предложена');
        // console.log(res);
         res.redirect('/add_db');
        // res.send(result.ops[0]);
      }
     })
  })
  app.post("/export", function (req, res) {
 
    const note = { collection: req.body.coll };
    db.collection(note.collection).find().toArray(function(err, results){
      if (err) { 
        res.send({ 'error': 'Error find colections '+note.collection }); 
      } else {
        for(index in results){
          delete results[index].key,
          delete results[index].approve,
          delete results[index].marker,
          delete results[index]._id;
        }
        console.log();
        let json_res=JSON.stringify(results,'',4);
        
        fs.writeFile('./export/'+note.collection+'.json',json_res, function(err) {
            if(err) {
                return console.log(err);
            }
            
        }); 
        res.send(json_res);
        // res.send('<p>Коллекция '+ note.collection +'.json<br></p><a href="../export/'+note.collection +'.json">Скачать файл </a>'); 
      }
     
     });
    
  })
  app.post("/blog",jsonParser, function (req, res) {
    
    db.collection('blog').find().toArray(function(err, results){
      
      let news_key=[];
       if (err) { 
         res.send({ 'error': 'Error find colections blog' }); 
       } else {
        
         check_user(results);
         
         
         function check_user(results_blog){
          db.collection('user').find({nickname:req.user.nickname}).toArray(function(err, results){
            if (err) { 
              res.send({ 'error': 'Error find colections user' }); 
            } else {
              
              if(results[0]){
                for (index in results[0].blog_news_id ){
                  news_key.push(results[0].blog_news_id[index]);
                }
                together(results_blog);
                 
               
              }else{
                insert_new_user(req.user.nickname);
              }
              
            }
              
          });
          }
          
        }     function together(results_blog){

                        for (index in results_blog){
                          // if()
                          // console.log(results_blog[index].key)
                          // console.log(news_key.length);
                          // console.log(news_key.length);

                          for (let j=0; j<news_key.length;j++){
                            // console.log('ааа');
                            if (results_blog[index].key==news_key[j]){
                              results_blog[index].marker="true";
                          }
                         
                          
                         }
                      
                        } 
                        res.json(results_blog);
                      //  console.log(results_blog); 
                      //  console.log(news_key);
                  }
              function insert_new_user(user){
                const note = { nickname: user, blog_news_id: [] };
                db.collection('user').insert(note, (err, result) => {
                  
                  if (err) { 
                    res.send({ 'error': 'An error has user' }); 
                  } 
                })
                }
              
          
      });
      
   




   });

app.post("/target",jsonParser, function (req, res) {
  if(!req.body) return res.sendStatus(400);
  var data = { 
    old:{
          young_young:0.14,
          young:0.15, 
          middle:0.262,
          old:0.243,
          old_old:0.2
      },
      sex:{
          man:0.506,
          woman:0.494,
      },
      city:{
          Moscow:0.2,
          Piter:0.14,
          million:0.25,
          not_million:0.4
      },
      pay:{
          sto:0.04,
          pytdesat:0.245,
          do_50:0.291,
          do_25:0.568
          
      }
  };
//   old:{
//     young_young:0.04,
//     young:0.05, 
//     middle:0.162,
//     old:0.213,
//     old_old:0.25
// },
// sex:{
//     man:0.506,
//     woman:0.494,
// },
// city:{
//     Moscow:0.2,
//     Piter:0.14,
//     million:0.25,
//     not_million:0.4
// },
// pay:{
//     sto:0.04,
//     pytdesat:0.45,
//     do_50:0.191,
//     do_25:0.468
    
// }
  var params = {
    sex:1,
    old:1,
    city:1,
    pay:1
  }
  var sum = ca.counting(req);
  res.json(`${sum}`);


  function counting(req){
    if (req.body.sex=="Male"){
        params.sex=data.sex.man;
     }
    else if (req.body.sex=="Famale" ){
         params.sex=data.sex.woman
       }
    else {
      params.sex=1;
    }
   
    if (req.body.old=="15-19"){
      params.old=data.old.young_young;
   }
    else if (req.body.old=="20-24" ){
       params.old=data.old.young
     }
     else if (req.body.old=="25-34" ){
      params.old=data.old.middle
    }
    else if (req.body.old=="35-49" ){
      params.old=data.old.old
    }
    else if (req.body.old=="50-70" ){
      params.old=data.old.old_old
    }
    else {
      params.old=1;
    }
    




    if (req.body.city=="Moscow"){
      params.city=data.city.Moscow;
   }
    else if (req.body.city=="Piter" ){
       params.city=data.city.Piter
     }
     else if (req.body.city=="million" ){
      params.city=data.city.million
    }
    else if (req.body.city=="m-250" ){
      params.city=data.city.not_million
    }
    else {
      params.city=1;
    }

    if (req.body.pay=="10-25"){
      params.pay=data.pay.do_25;
   }
    else if (req.body.pay=="25-49" ){
       params.pay=data.pay.do_50
     }
     else if (req.body.pay=="50-99" ){
      params.pay=data.pay.pytdesat
    }
    else if (req.body.pay=="99_more" ){
      params.pay=data.pay.sto
    }
    else {
      params.pay=1;
    }
    var sum =74000000;
    for (var date in params){
      sum=params[date]*sum;
    }
    return(sum);
  }

 });
}
// }

  // app.put('/notes/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   const note = { text: req.body.body, title: req.body.title };
  //   db.collection('notes').update(details, note, (err, result) => {
  //     if (err) {
  //         res.send({'error':'An error has occurred'});
  //     } else {
  //         res.send(note);
  //     } 
  //   });
  // });

  // app.delete('/notes/:id', (req, res) => {
  //   const id = req.params.id;
  //   const details = { '_id': new ObjectID(id) };
  //   db.collection('notes').remove(details, (err, item) => {
  //     if (err) {
  //       res.send({'error':'An error has occurred'});
  //     } else {
  //       res.send('Note ' + id + ' deleted!');
  //     } 
  //   });
  // });
