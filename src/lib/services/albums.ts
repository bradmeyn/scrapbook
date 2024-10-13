async function createAlbum(userId, albumName) {
    const albumId = uuidv4();
    const params = {
      TableName: "Albums",
      Item: {
        userId: userId,
        albumId: albumId,
        name: albumName,
        createdDate: new Date().toISOString()
      }
    };
  
    await ddbDocClient.send(new DynamoDB.PutItemCommand(params));
    return albumId;
  }