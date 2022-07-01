// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../libs/dynamoClient.mjs";

const randid = (Math.floor(Math.random() * 512)).toString();

// Set the parameters
export const params = {
  TableName: "RandomQuestionSubmissions",
  Item: {
    id: { N: (Math.floor(Math.random() * 512)).toString()},
    first_name: { S: "Tyler" },
    last_name: { S: "Valentine" },
    question1: { S: "Ex" },
    question2: { S: "Ex" },
    question3: { S: "Ex" },
    question4: { S: "Ex" },
    question5: { S: "Ex" },
    question6: { S: "Ex" },
    question7: { S: "Ex" },
    question8: { S: "Ex" },
    question9: { S: "Ex" },
    question10: { S: "Ex" },
    question11: { S: "Ex" },
    question12: { S: "Ex" },
    question13: { S: "Ex" },
  },
};

export const run = async () => {
  try {
    const data = await dynamoClient.send(new PutItemCommand(params));
    console.log("success");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};
run();
