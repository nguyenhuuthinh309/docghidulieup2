const mongoose = require('mongoose');

const url = "mongodb+srv://thinh309:thinh3092003@cluster0.adfcye6.mongodb.net/asm?retryWrites=true&w=majority";

mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true})
.then(()=>{
    console.log("kết nối thành công");
})
.catch((err)=>{
    throw err;
});

const LogInSchema = new mongoose.Schema({

name: {
    type: String,
    required: true
},
password: {
    type: String,
    required: true
}
})

const Collection1 = new mongoose.model("taikhoa111n",LogInSchema);
module.exports = Collection1


