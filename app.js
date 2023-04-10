var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://rishavsinha901:Rishav@cluster0.acdmvxs.mongodb.net/Rishav');

var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})

var app=express()


app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
	extended: true
}));

app.post('/application', function(req,res){
	var name = req.body.name;
	var email =req.body.email;
	var phone =req.body.phone;
    var Comments = req.body.Comments;

	var data = {
		"name": name,
		"email":email,
		"Comments":Comments,
		"phone":phone
	}
db.collection('Data').insertOne(data,function(err, collection){
		if (err) throw err;
		console.log("Record inserted Successfully");
			
	});
		
	return res.redirect('rishav.html');
})


app.get('/',function(req,res){
res.set({
	'Access-control-Allow-Origin': '*'
	});
return res.redirect('index.html');
}).listen(3000)


console.log("server listening at port 3000");
