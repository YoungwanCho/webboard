var express = require("express");
var router = express.Router();
var Board = require("../models/Board"); //1

// Index
router.get("/", function(req, res){
 Board.find({}, function(err, boards){
  if(err) return res.json(err);
  res.render("boards/index", {boards:boards});
 });
});

// New
router.get("/new", function(req, res){
 res.render("boards/new");
});

// create
router.post("/", function(req, res){
 Board.create(req.body, function(err, board){
  if(err) return res.json(err);
  res.redirect("/boards");
 });
});

// show
router.get("/:id", function(req, res){
 Board.findOne({_id:req.params.id}, function(err, board){
  if(err) return res.json(err);
  res.render("boards/show", {board:board});
 });
});

// edit
router.get("/:id/edit", function(req, res){
 Board.findOne({_id:req.params.id}, function(err, board){
  if(err) return res.json(err);
  res.render("boards/edit", {board:board});
 });
});

// update
router.put("/:id", function(req, res){
 Board.findOneAndUpdate({_id:req.params.id}, req.body, function(err, board){
  if(err) return res.json(err);
  res.redirect("/boards/"+req.params.id);
 });
});

// destroy
router.delete("/:id", function(req, res){
 Board.remove({_id:req.params.id}, function(err){
  if(err) return res.json(err);
  res.redirect("/boards");
 });
});

module.exports = router;
