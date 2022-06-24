// Import required AWS SDK clients and commands for Node.js
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../libs/snsClient.mjs";
import { dynamoClient } from "../libs/dynamoClient.mjs";

export const submitData = async () => {
  //Set the parameters
  // Capture the values entered in each field in the browser (by id).
  const id = document.getElementById("id").value;
  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const afc_wild_card_one = document.getElementById("afc_wild_card_one").value;
  const afc_wild_card_two = document.getElementById("afc_wild_card_two").value;
  const afc_wild_card_three = document.getElementById("afc_wild_card_three").value;
  const nfc_wild_card_one = document.getElementById("nfc_wild_card_one").value;
  const nfc_wild_card_two = document.getElementById("nfc_wild_card_two").value;
  const nfc_wild_card_three = document.getElementById("nfc_wild_card_three").value;
  const afc_divisional_one = document.getElementById("afc_divisional_one").value;
  const afc_divisional_two = document.getElementById("afc_divisional_two").value;
  const nfc_divisional_one = document.getElementById("nfc_divisional_one").value;
  const nfc_divisional_tw = document.getElementById("nfc_divisional_two").value;
  const afc_championship = document.getElementById("afc_championship").value;
  const nfc_championship = document.getElementById("nfc_championship").value;
  const super_bowl = document.getElementById("super_bowl").value;
  //Set the table name.
  const tableName = "NFLPlayoffPredictions2022";

  //Set the parameters for the table
  const params = {
    TableName: tableName,
    // Define the attributes and values of the item to be added. Adding ' + "" ' converts a value to
    // a string.
    Item: {

      id: { N: id + "" },
      first_name: { S: first_name + "" },
      last_name: { S: last_name + "" },
      afc_wild_card_one: { S: afc_wild_card_one + "" },
      afc_wild_card_two: { S: afc_wild_card_two + "" },
      afc_wild_card_three: { S: afc_wild_card_three + "" },
      nfc_wild_card_one: { S: nfc_wild_card_one + "" },
      nfc_wild_card_two: { S: nfc_wild_card_two + "" },
      nfc_wild_card_three: { S: nfc_wild_card_three + "" },
      afc_divisional_one: { S: afc_divisional_one + "" },
      afc_divisional_two: { S: afc_divisional_two + "" },
      nfc_divisional_one: { S: nfc_divisional_one + "" },
      nfc_divisional_two: { S: nfc_divisional_two + "" },
      afc_championship: { S: afc_championship + "" },
      nfc_championship: { S: nfc_championship + "" },
      super_bowl: { S: super_bowl + "" }
    },
  };
  // Check that all the fields are completed.
  if (id != "" && first_name != "" && last_name != "" && afc_wild_card_one != "" &&
  afc_wild_card_two != "" && afc_wild_card_three != "" && nfc_wild_card_one != "" && nfc_wild_card_two != "" &&
  nfc_wild_card_three != "" && afc_divisional_one != "" && afc_divisional_two != "" && nfc_divisional_one != "" &&
  nfc_divisional_two != "" && afc_championship != "" && nfc_championship != "" && super_bowl != "")
  {
    try {
      //Upload the item to the table
      const data = await dynamoClient.send(new PutItemCommand(params));
      alert("Data added to table.");
      try {
        // Create the message parameters object.
        const messageParams = {
          Message: "A new item with ID value was added to the DynamoDB",
          PhoneNumber: "+12013101486", //PHONE_NUMBER, in the E.164 phone number structure.
          // For example, ak standard local formatted number, such as (415) 555-2671, is +14155552671 in E.164
          // format, where '1' in the country code.
        };
        // Send the SNS message
        const data = await snsClient.send(new PublishCommand(messageParams));
        console.log(
          "Success, message published. MessageID is " + data.MessageId
        );
      } catch (err) {
        // Display error message if error is not sent
        console.error(err, err.stack);
      }
    } catch (err) {
      // Display error message if item is no added to table
      console.error(
        "An error occurred. Check the console for further information",
        err
      );
    }
    // Display alert if all field are not completed.
  } else {
    alert("Enter data in each field.");
  }
};
// Expose the function to the browser
window.submitData = submitData;
