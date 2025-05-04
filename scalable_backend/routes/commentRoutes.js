const express = require('express');
const router = express.Router();
const { createComment, getAllComments, getCommentById, updateComment, deleteComment} = require('../controllers/commentController');
 
router.post('/', createComment);
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

module.exports = router;
