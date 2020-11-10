const NoteDao = require("../model/NoteDao.js");
const express = require("express");
const { addSampleNotes } = require("../data/notes.js");
const router = express.Router();

const notes = new NoteDao();
addSampleNotes(notes);

router.get("/api/notes", (req, res) => {
  const author = req.query.author;
  notes
    .readAll(author)
    .then((notes) => res.json({ data: notes }))
    .catch((err) => errorHandler(err, 500, res));
});

router.get("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes
    .read(id)
    .then((note) => {
      note ? res.json({ data: note }) : res.json({ data: [] });
    })
    .catch((err) => errorHandler(err, 500, res));
});

router.post("/api/notes", (req, res) => {
  const author = req.body.author;
  const content = req.body.content;
  notes
    .create(content, author)
    .then((note) => res.status(201).json({ data: note }))
    .catch((err) => errorHandler(err, 400, res)); // TODO separate 500- vs 400- error
});

router.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  notes
    .delete(id)
    .then((note) => {
      note
        ? res.json({ data: note })
        : errorHandler("Resource not found", 404, res);
    })
    .catch((err) => errorHandler(err, 500, res));
});

router.put("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const author = req.body.author;
  const content = req.body.content;
  notes
    .update(id, content, author)
    .then((note) => {
      note
        ? res.json({ data: note })
        : errorHandler("Resource not found", 404, res);
    })
    .catch((err) => errorHandler(err, 400, res)); // TODO separate 500- vs 400- error
});

// helper functions

function errorHandler(err, status, res) {
  res.status(status).json({
    errors: [
      {
        status: status,
        detail: err.message || err,
      },
    ],
  });
}

module.exports = router;
