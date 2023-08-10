const {
  subscribeNewsLetter,
  unsubscribeNewsLetter,
} = require("../controllers/newsLetterController");

const newsLetterRouter = require("express").Router();

newsLetterRouter.post("/subscribe", subscribeNewsLetter);
newsLetterRouter.delete("/unsubscribe/:email", unsubscribeNewsLetter);

module.exports = newsLetterRouter;
