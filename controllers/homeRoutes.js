const router = require('express').Router();
const { Model } = require('sequelize/types');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try{
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"]
        }
      ]

    })
    const post = postData.map((posts) => posts.get({plain: true}))
    res.render('homepage', {
      post,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    res.status(500).json(err);
}


  
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/post', (req, res) => {
  res.render('post');
});

// Prevent non logged in users from viewing the homepage
// router.get('/', withAuth, async (req, res) => {
//     try {
//       const userData = await User.findAll({
//         attributes: { exclude: ['password'] },
//         order: [['name', 'ASC']],
//       });
  
//       const users = userData.map((project) => project.get({ plain: true }));
  
//       res.render('homepage', {
//         users,
//         // Pass the logged in flag to the template
//         logged_in: req.session.logged_in,
//       });
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   router.get('/login', (req, res) => {
//     // If a session exists, redirect the request to the homepage
//     if (req.session.logged_in) {
//       res.redirect('/');
//       return;
//     }
  
//     res.render('login');
//   });
  
  module.exports = router;