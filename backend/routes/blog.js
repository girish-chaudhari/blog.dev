const express = require('express');
const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog.js'); // Assuming you have a Blog model defined
const matter = require('gray-matter');

const router = express.Router();


// Get all blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Blog.find();
    res.json(posts);
  } catch (error) {
    res.status(500).send('Error fetching blog posts');
  }
});

// Get a single blog post by ID
router.get('/:id', async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Blog.findById(postId);
    if (post) {
      res.json(post);
    } else {
      res.status(404).send('Post not found');
    }
  } catch (error) {
    res.status(500).send('Error fetching the blog post');
  }
});

// Create a new blog post
router.post('/', (req, res) => {
  const newPost = {
    id: blogPosts.length + 1,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    date: new Date()
  };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

// Update an existing blog post
router.put('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = blogPosts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    blogPosts[postIndex] = {
      id: postId,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date()
    };
    res.json(blogPosts[postIndex]);
  } else {
    res.status(404).send('Post not found');
  }
});

// Delete a blog post
router.delete('/:id', (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const postIndex = blogPosts.findIndex(p => p.id === postId);
  if (postIndex !== -1) {
    blogPosts.splice(postIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Post not found');
  }
});

// Directory containing the MDX files
const mdxDirectory = path.join(__dirname, '../mdx');

// Function to extract front matter and content from MDX files
const extractFrontMatterAndContent = (fileContent) => {
  const { data, content } = matter(fileContent);
  return { frontMatter: data, content };
};

// Function to read MDX files and add to MongoDB if not already added
const syncMdxFilesToMongoDB = async () => {
  const files = fs.readdirSync(mdxDirectory);
  const newPosts = [];

  for (const file of files) {
    if (path.extname(file) === '.mdx') {
      const filePath = path.join(mdxDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { frontMatter, content } = extractFrontMatterAndContent(fileContent);

      // Check if the blog post already exists in MongoDB
      const existingPost = await Blog.findOne({ title: frontMatter.title });
      if (!existingPost) {
        const newPost = new Blog({
          title: frontMatter.title,
          content: content,
          author: frontMatter.author || 'Unknown',
          date: frontMatter.publishedAt ? new Date(frontMatter.publishedAt) : new Date(),
          summary: frontMatter.summary || '',
          template: frontMatter.template || ''
        });
        newPosts.push(newPost);
      }
    }
  }

  // Insert all new posts in one go
  if (newPosts.length > 0) {
    await Blog.insertMany(newPosts);
  }
};


// Endpoint to sync MDX files to MongoDB
router.post('/sync-mdx', async (req, res) => {
  try {
    await syncMdxFilesToMongoDB();
    res.status(200).send('MDX files synced successfully');
  } catch (error) {
    res.status(500).send('Error syncing MDX files');
  }
});

module.exports = router;