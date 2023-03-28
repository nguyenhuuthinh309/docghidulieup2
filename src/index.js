const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const http = require("http");
const Collection1 = require('./mongodb');


const templatePath = path.join(__dirname,'../tempelates');

const publicPath = path.join(__dirname, '../public');

console.log(publicPath);
app.use(express.json());
app.set('view engine','hbs');
app.set('views',templatePath);

app.use(express.urlencoded({extended:false}))



app.get('/', (req, res) => {
    res.render('AddorEdit')
});

app.post('/add', (req, res) => {
    console.log(req.body)
    if (req.body.id ==''){
   add(req,res);
    }
    else{
updateRecord(req,res);
    }

})

function add(req, res) {
    const data={
        name: req.body.name,
        password: req.body.password
    }
     Collection1.insertMany([data])
     res.render('AddorEdit', {
            title1:" thêm thành công"
        })
}

function updateRecord(req, res) {
    Collection1.findOneAndUpdate({_id:req.body.id},req.body,{new:true}).then(err=>{
      if(!err){
       
        console.log(err);
        res.render('AddorEdit',{
            viewtitle: 'update User thất bại'
          })
      }else{
       
          res.redirect('/list');
      }
    }
    )
  }

app.get('/list', (req, res) => {
    Collection1.find({}).then(taikhoan1 =>{
        res.render('view_taikhoan',{
           
            taikhoan:taikhoan1.map(taikhoan2 => taikhoan2.toJSON())
        })
    })
});

app.get("/edit/:id", (req, res) => {
    Collection1.findById(req.params.id).then((taikhoan1) => {
                  res.render('AddorEdit', {    
                    title1:"update",
                taikhoan1:taikhoan1.toJSON()
              });   
      
    })  
})


app.get("/del/:id",async (req, res) => {
    try{
        const taikhoan = await Collection1.findByIdAndDelete(req.params.id,req.body);
        if(!taikhoan) res.status(404).send("không tìm thấy item xóa");
        else{
            res.redirect("/list");
        }
        res.status(200).send();

    }catch(error) {
        res.status(500).send(error);
    }
    });
   


app.listen(8000,()=>{
    console.log('porrt connectedn')
})