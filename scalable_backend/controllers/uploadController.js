// controllers/uploadController.js
const { BlobServiceClient } = require('@azure/storage-blob');
const { v4: uuidv4 } = require('uuid');
const { mediaContainer } = require('../utils/cosmosClient'); // Import Cosmos DB container

async function uploadToBlobStorage(fileBuffer, fileName) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.BLOB_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(process.env.BLOB_CONTAINER_NAME);
  const blockBlobClient = containerClient.getBlockBlobClient(fileName);

  await blockBlobClient.uploadData(fileBuffer);
  console.log("File uploaded to Blob Storage at:", blockBlobClient.url);
  return blockBlobClient.url;
}

const uploadMedia = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const uniqueFileName = Date.now() + '-' + req.file.originalname;
    const fileUrl = await uploadToBlobStorage(req.file.buffer, uniqueFileName);

    const mediaData = {
      id: uuidv4(),
      filename: uniqueFileName,
      path: fileUrl,
      title: req.body.title || "",
      caption: req.body.caption || "",
      location: req.body.location || "",
      people: req.body.people || "",
      uploadedAt: new Date().toISOString(),
    };

    console.log("Media Metadata:", mediaData);
    // Save to CosmosDB if needed
    await mediaContainer.items.create(mediaData);
    res.status(200).json({ message: "Upload successful", data: mediaData });
  } catch (error) {
    console.error("Error uploading media:", error.message);
    res.status(500).json({ error: "Upload failed" });
  }
};

const fetchAllMedia = async (req, res) => {
  try {
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: mediaItems } = await mediaContainer.items.query(querySpec).fetchAll();

    res.status(200).json({ data: mediaItems });
  } catch (error) {
    console.error("Error fetching media:", error.message);
    res.status(500).json({ error: "Failed to fetch media" });
  }
};


module.exports = { uploadMedia, fetchAllMedia };
