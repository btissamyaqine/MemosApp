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

export const createPost = async (req,res) => {
  const post = req.body;
  const newPostMassage = new PostMessage({ ...post, creator: req.useId, createAt: new Date().toISOString()} );

  try {
    await newPostMassage.save();

    res.status(201).json(newPostMassage);
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

  if(!req.userId) return res.json({ message: 'Unauthenticated' });

  if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('NO post with that id');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if(index === -1){
    // like the post
    post.likes.push(req.userId);
  } else {
    // dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }
  
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);

}