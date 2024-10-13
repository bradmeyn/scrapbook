async function addPhoto(userId, photoUrl) {
    const photoId = uuidv4(); // Assuming you're using uuid to generate IDs
    const params = {
      TableName: "Photos",
      Item: {
        userId: userId,
        photoId: photoId,
        url: photoUrl,
        uploadDate: new Date().toISOString()
      }
    };
  
    await ddbDocClient.send(new DynamoDB.PutItemCommand(params));
    return photoId;
  }