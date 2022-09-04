import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js" ;

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find()
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }

};
// export const getPost = async (req, res) => { 
//   const { id } = req.params;

//   try {
//       const post = await PostMessage.findById(id);
      
//       res.status(200).json(post);
//   } catch (error) {
//       res.status(404).json({ message: error.message });
//   }
// }

export const createPost = async (req,res) => {
  const post = req.body;
  const newPost = new PostMessage(post);

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({message: error.message});
  }
};
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;
  
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

// export const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
//   //the request come from frontend "body"
//   const post = req.body

//   if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('NO post with that id');

//   const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { ...post, _id}, {new: true});
//   // const updatedPost = await PostMessage.findAndUpdate(_id,post, { ...post, _id}, {new: true});

//   res.json(updatedPost);

// }
// export const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
// //   //the request come from frontend "body"
//   const post = req.body;
//   const updatedPost = await PostMessage.findByIdAndUpdate(_id, {$set: post}, { ...post, _id}, {new: true});
// }

export const deletePost = async (req, res) => {
  const { id } = req.params;
  
  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO post with that id');

  await PostMessage.findByIdAndRemove(id);
  res.json({ message: 'post delete successfully' })

}

export const likePost = async (req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO post with that id');

  const post = await PostMessage.findById(id);
  const updatedPost = await PostMessage.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });

  res.json(updatedPost);

}