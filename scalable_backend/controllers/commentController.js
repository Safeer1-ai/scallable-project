const { v4: uuidv4 } = require('uuid');
const { commentContainer } = require('../utils/cosmosClient');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { text, id } = req.body;

    if (!text || !id) {
      return res.status(400).json({ error: 'Comment and postId are required.' });
    }

    const commentData = {
      id: uuidv4(),
      text,
      'postId': id,
      createdAt: new Date().toISOString(),
    };

    await commentContainer.items.create(commentData);
    res.status(201).json({ message: 'Comment created', data: commentData });
  } catch (error) {
    console.error('Create Comment Error:', error.message);
    res.status(500).json({ error: 'Failed to create comment.' });
  }
};

// Get all comments
const getAllComments = async (req, res) => {
  try {
    const querySpec = { query: 'SELECT * FROM c' };
    const { resources } = await commentContainer.items.query(querySpec).fetchAll();
    res.status(200).json({ data: resources });
  } catch (error) {
    console.error('Get All Comments Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch comments.' });
  }
};

// Get a comment by ID
const getCommentById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const querySpec = {
        query: "SELECT * FROM c WHERE c.postId = @postId",
        parameters: [{ name: "@postId", value: id }],
      };
      
    const { resources } = await commentContainer.items.query(querySpec).fetchAll();
    if (!resources) return res.status(404).json({ error: 'Comment not found.' });
    res.status(200).json(resources);
  } catch (error) {
    console.error('Get Comment Error:', error.message);
    res.status(500).json({ error: 'Failed to get comment.' });
  }
};

// Update a comment
const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const { resource } = await commentContainer.item(id, id).read();
    if (!resource) return res.status(404).json({ error: 'Comment not found.' });

    resource.comment = comment || resource.comment;
    resource.updatedAt = new Date().toISOString();

    await commentContainer.items.upsert(resource);
    res.status(200).json({ message: 'Comment updated', data: resource });
  } catch (error) {
    console.error('Update Comment Error:', error.message);
    res.status(500).json({ error: 'Failed to update comment.' });
  }
};

// Delete a comment
const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    await commentContainer.item(id, id).delete();
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    console.error('Delete Comment Error:', error.message);
    res.status(500).json({ error: 'Failed to delete comment.' });
  }
};

module.exports = {
  createComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
