const { CosmosClient } = require('@azure/cosmos');

const cosmosClient = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT,
  key: process.env.COSMOS_KEY,
});

const database = cosmosClient.database(process.env.COSMOS_DB_DATABASE);

module.exports = {
    mediaContainer: database.container(process.env.COSMOS_DB_CONTAINER),
    commentContainer: database.container(process.env.COSMOS_DB_COMMENT_CONTAINER),
    authContainer: database.container(process.env.COSMOS_DB_AUTH_CONTAINER),
};