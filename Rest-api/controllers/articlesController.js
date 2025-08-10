const { articleModel, userModel } = require('../models');

function getAll(req, res, next){
    articleModel.find()
        .sort({created_at: "desc"})
        .populate('userId')
        .then(article => res.json(article))
        .catch(next)
    
}   
// Add authorization
// function createArticle(req,res,next){
//     const {title,imageUrl,description} = req.body
//     const { _id: userId } = req.user;

//     articleModel.create({title,imageUrl,userId,description})
//         .then((article) => {res.status(200).json(article)})
//         .catch(next)
    
    
// }
function createArticle (req, res) {
    const { title, description, imageUrl } = req.body;
    const userId = req.user._id; // от auth middleware-а

    articleModel.create({ title, description, imageUrl, userId })
        .then((newArticle) => {
            return userModel.findByIdAndUpdate(
                userId,
                { $push: { articles: newArticle._id } },
                { new: true }
            ).then(() => newArticle);
        })
        .then((newArticle) => {
            res.status(201).json({
                message: 'Article създаден успешно и добавен към потребителя.',
                article: newArticle
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Грешка при създаване на артикъл' });
        });
};
function getArticle (req, res, next){
    const {articleId} = req.params;
    articleModel.findById(articleId)
        .populate('userId')
        .then(article => res.json(article))
        .catch(next);
}
//TODO test is it working
function like (req,res,next){
    const articleId = req.params.articleId;
    const { _id: userId } = req.user;
    articleModel.findByIdAndUpdate({ _id: articleId }, { $addToSet: { likes: userId } }, { new: true })
        .then(updatedTheme => {
            res.status(200).json(updatedTheme)
        })
        .catch(next);
}
//TODO create it
// function edit(req,res,next){
//     const themeId = req.params.themeId;
//     const body = req
//     const { _id: userId } = req.user;
//     themeModel.findByIdAndUpdate({ _id: themeId }, { $addToSet: { subscribers: userId } }, { new: true })
//         .then(updatedTheme => {
//             res.status(200).json(updatedTheme)
//         })
//         .catch(next);
// }
function edit(req, res, next) {
    const { articleId } = req.params;
    const { title,description,imageUrl } = req.body;
    const { _id: userId } = req.user;

    // if the userId is not the same as this one of the post, the post will not be updated
    articleModel.findOneAndUpdate({ _id: articleId, userId }, { title,description, imageUrl}, { new: true })
        .then(updatedPost => {
            if (updatedPost) {
                res.status(200).json(updatedPost);
            }
            else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
function deleteArticle(req, res, next) {
    const { articleId } = req.params;
    const { _id: userId } = req.user;

    Promise.all([
        articleModel.findOneAndDelete({ _id: articleId, userId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { articles: articleId } }),

    ])
        .then((deletedOne) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Not allowed!` });
            }
        })
        .catch(next);
}
module.exports = {
    getAll,
    createArticle,
    getArticle,
    like,
    edit,
    deleteArticle
}