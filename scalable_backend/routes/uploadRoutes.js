const express = require("express");
const multer = require("multer");
const { uploadMedia, fetchAllMedia } = require("../controllers/uploadController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload endpoint
router.post("/upload", upload.single("mediaFile"), uploadMedia);
router.get("/media", fetchAllMedia);

module.exports = router;
