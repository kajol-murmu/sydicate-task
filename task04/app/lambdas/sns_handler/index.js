exports.snsHandler = async (event) => {
    console.log("SNS Event Received:", JSON.stringify(event, null, 2));

    event.Records.forEach(record => {
        console.log("SNS Message:", record.Sns.Message);
    });

    return {
        statusCode: 200,
        body: JSON.stringify('SNS Message Processed'),
    };
};