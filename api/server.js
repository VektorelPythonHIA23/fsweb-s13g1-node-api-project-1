const express = require("express");
const User = require("./users/model");

const server = express();

server.use(express.json());

// POST
server.post("/api/users", async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  }

  try {
    const user = await User.insert({ name, bio });
    res.status(201).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

// GET ALL
server.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

// GET BY ID
server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
  }
});

// DELETE
server.delete("/api/users/:id", async (req, res) => {
  try {
    const deleted = await User.remove(req.params.id);

    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID li kullanıcı bulunamadı" });
    }

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı silinemedi" });
  }
});

// PUT
server.put("/api/users/:id", async (req, res) => {
  const { name, bio } = req.body;

  if (!name || !bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }

  try {
    const updated = await User.update(req.params.id, { name, bio });

    if (!updated) {
      return res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }

    res.json(updated);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Kullanıcı bilgileri güncellenemedi" });
  }
});

module.exports = server;