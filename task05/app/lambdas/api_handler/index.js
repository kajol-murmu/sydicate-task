/*exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
*/
exports.handler = async (event) => {
    try {
        // Parse the incoming event body
        const body = JSON.parse(event.body);
        const { principalId, content } = body;

        if (!principalId || !content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields" })
            };
        }

        // Create new event object
        const newEvent = {
            id: uuidv4(), // Generate UUID v4
            principalId: principalId,
            createdAt: new Date().toISOString(), // ISO 8601 format timestamp
            body: content
        };

        // Store event in DynamoDB
        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: newEvent
        }).promise();

        // Return response with created event
        return {
            statusCode: 201,
            body: JSON.stringify({ event: newEvent })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};
