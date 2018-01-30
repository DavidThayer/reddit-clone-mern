var models = require('../models');
var TextPost = models.TextPost;

function index(req, res) {
  TextPost.find({}, function(err, allTextPostsFromServer) {
    if (err) {
    	res.send(err);
    } else {
    	res.json(allTextPostsFromServer);
    }
  });
}

function create(req, res) {
  TextPost.create(req.body, function(err, newlyCreatedPostInDb){
    if (err) res.send(err);
    else res.json(newlyCreatedPostInDb);
  });
}

// '/api/posts/:post_id'
// '/api/posts/5'
function show(req, res) {
  TextPost.findById(req.params.post_id, function(err, postIAmLookingFor){
    if (err) res.send(err);
    else res.json(postIAmLookingFor);
  });  
}

// '/api/posts/:post_id'
function update(req, res) {
  TextPost.findByIdAndUpdate(req.params.post_id, 
    {$set: req.body}, {"new": true}, function(err, updatedPost){
    if (err) res.send(err);
    else res.json(updatedPost);
  });
}

// '/api/posts/:post_id'
function destroy(req, res) {
  TextPost.findByIdAndRemove(req.params.post_id, function(err, post){
    if (err) res.send(err);
    else res.send("post deleted");
  }); 
}

module.exports.index = index;
module.exports.create = create;
module.exports.show = show;
module.exports.update = update;
module.exports.destroy = destroy;