exports.sqsHandler = async (event) => {
    console.log("SQS Event Received:", JSON.stringify(event, null, 2));

    event.Records.forEach(record => {
        console.log("SQS Message Body:", record.body);
    });

    return {
        statusCode: 200,
        body: JSON.stringify('SQS Message Processed'),
    };
};