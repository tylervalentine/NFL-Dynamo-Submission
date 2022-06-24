// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../libs/dynamoClient.mjs";

const randid = (Math.floor(Math.random() * 512)).toString();

// Set the parameters
export const params = {
  TableName: "NFLPlayoffPredictions2022",
  Item: {
    id: { N: (Math.floor(Math.random() * 512)).toString()},
    first_name: { S: "Tyler" },
    last_name: { S: "Valentine" },
    afc_wild_card_one: { S: "Ex" },
    afc_wild_card_two: { S: "Ex" },
    afc_wild_card_three: { S: "Ex" },
    nfc_wild_card_one: { S: "Ex" },
    nfc_wild_card_two: { S: "Ex" },
    nfc_wild_card_three: { S: "Ex" },
    afc_divisional_one: { S: "Ex" },
    afc_divisional_two: { S: "Ex" },
    nfc_divisional_one: { S: "Ex" },
    nfc_divisional_two: { S: "Ex" },
    afc_championship: { S: "Ex" },
    nfc_championship: { S: "Ex" },
    super_bowl: { S: "Ex" },
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
