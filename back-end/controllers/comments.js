var models = require('../models');
var Comment = models.Comment;
var TextPost = models.TextPost;

// /api/posts/:post_id/comments

// /api/posts/5/comments POST
// - Create a new comment
// - Find Post #5
// - Push that new comment to Post #5's comments array
function create(req, res) {
  // create new comment
  Comment.create(req.body, function(err, comment){
    if (err) res.send(err);
    else {
      // find post #5
      TextPost.findById(req.params.post_id, function(err, post) {
        if (err) res.send(err);
        else {
          // pushing new comment to post #5's comments array
          post.comments.push(comment);
          post.save();
          res.json(comment);
        }
      })
    }
  });
}

// /api/posts/5/comments/7 PUT
// - Find Comment #7 and update it
// - Find Post #5
// - Update comment in Post #5's comments array
function update(req, res) {
  // Find Comment #7 and update it
  Comment.findOneAndUpdate(req.params.comment_id, 
    {$set: req.body}, {"new": true}, function(comment_err, updatedComment){
    if (comment_err) res.send(comment_err);
    else {

      // Find TextPost that the updated Comment belongs to
      TextPost.findById(req.params.post_id, function(post_err, post) {
        if (post_err) res.send(post_err);

        // Update Comment in the TextPost's comments array as well
        var commentToUpdate = post.comments.id(req.params.comment_id);
        commentToUpdate.content = updatedComment.content
        commentToUpdate.votes = updatedComment.votes

        post.save(function() {
          res.json(updatedComment);
        });
      });
    }
  });
}

// /api/posts/5/comments/7 DELETE
// - Find Comment #7 and remove
// - Find TextPost it belongs to, and remove from its comments array
function destroy(req, res) {
  // Find Comment #7 and remove
	Comment.findByIdAndRemove(req.params.comment_id, function(comment_err){
    if (comment_err) res.send(comment_err);
    else {

      // Find TextPost that the deleted Comment belongs to
      // Delete Comment in the TextPost's comments array as well
      TextPost.findByIdAndUpdate(req.params.post_id, 
        { $pull: { comments: { _id: req.params.comment_id } } }, function(post_err) {
        if (post_err) res.send(post_err);
        res.send('comment deleted');
      });
    }
  });
}

module.exports.create = create;
module.exports.update = update;
module.exports.destroy = destroy;