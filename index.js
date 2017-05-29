var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
  console.log("DB connected");
});

db.on("error", function(err){
  console.log("DB ERROR : ", err);
});

app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var contactSchema = mongoose.Schema({
  name:{type:String, require:true, unique:true},
  email:{type:String},
  phone:{type:String},
});

var Contact = mongoose.model("contact", contactSchema);

app.get("/", function(req, res){
  res.redirect("/contacts");
});

app.get("/contacts", function(req, res){
  Contact.find({}, function(err, contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

app.get("/contacts/new", function(req, res){
  res.render("contacts/new");
});

app.post("/contacts", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

app.get("/contacts/:id", function(req, res){
  Contacts.finOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.renderZ("contacts/show", {contact:contact});
  });
});

app.get("/contact/:id/edit", function(req, res){
  Contact.findOne({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.render("contacts/edit", {contact:contact});
  });
});

app.put("/contacts/:id", function(req, res){
  Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts/"+req.params.id);
  });
});

app.delete("/contacts/:id", function(req, res){
  Contact.remove({_id:req.params.id}, function(err, contact){
    if(err) return res.json(err);
    res.redirect("/contacts");
  });
});

app.listen(3000, function(){
  console.log("server on!");
});
