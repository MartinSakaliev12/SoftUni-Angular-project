const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { tharticleControler, articleControler,themeController} = require('../controllers');

// middleware that is specific to this router


router.get('/', articleControler.getAll)
router.post('/',auth() ,articleControler.createArticle)
router.get('/:articleId', articleControler.getArticle)
router.put('/:articleId/like',auth(), articleControler.like)
router.put('/:articleId/dislike',auth(), articleControler.dislike)
router.put('/:articleId/edit',auth(),articleControler.edit)
router.delete('/:articleId/delete',auth(),articleControler.deleteArticle)

// router.get('/', themeController.getThemes);
// router.post('/', auth(), themeController.createTheme);

// router.get('/:themeId', themeController.getTheme);
// router.post('/:themeId', auth(), postController.createPost);
// router.put('/:themeId', auth(), themeController.subscribe);
// router.put('/:themeId/posts/:postId', auth(), postController.editPost);
// router.delete('/:themeId/posts/:postId', auth(), postController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router