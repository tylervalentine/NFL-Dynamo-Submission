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
  const question1 = document.getElementById("question1").value;
  const question2 = document.getElementById("question2").value;
  const question3 = document.getElementById("question3").value;
  const question4 = document.getElementById("question4").value;
  const question5 = document.getElementById("question5").value;
  const question6 = document.getElementById("question6").value;
  const question7 = document.getElementById("question7").value;
  const question8 = document.getElementById("question8").value;
  const question9 = document.getElementById("question9").value;
  const question10 = document.getElementById("question10").value;
  const question11 = document.getElementById("question11").value;
  const question12 = document.getElementById("question12").value;
  const question13 = document.getElementById("question13").value;
  //Set the table name.
  const tableName = "RandomQuestionSubmissions";

  //Set the parameters for the table
  const params = {
    TableName: tableName,
    // Define the attributes and values of the item to be added. Adding ' + "" ' converts a value to
    // a string.
    Item: {

      id: { N: id + "" },
      first_name: { S: first_name + "" },
      last_name: { S: last_name + "" },
      question1: { S: question1 + "" },
      question2: { S: question2 + "" },
      question3: { S: question3 + "" },
      question4: { S: question4 + "" },
      question5: { S: question5 + "" },
      question6: { S: question6 + "" },
      question7: { S: question7 + "" },
      question8: { S: question8 + "" },
      question9: { S: question9 + "" },
      question10: { S: question10 + "" },
      question11: { S: question11 + "" },
      question12: { S: question12 + "" },
      question13: { S: question13 + "" }
    },
  };
  // Check that all the fields are completed.
  if (id != "" && first_name != "" && last_name != "" && question1 != "" &&
  question2 != "" && question3 != "" && question4 != "" && question5 != "" &&
  question6 != "" && question7 != "" && question8 != "" && question9 != "" &&
  question10 != "" && question11 != "" && question12 != "" && question13 != "")
  {
    try {
      //Upload the item to the table
      const data = await dynamoClient.send(new PutItemCommand(params));
      alert("Data added to table.");
      try {
        // Create the message parameters object.
        var publish = {
          Message: "A new item with ID value was added to the DynamoDB",
          TopicArn: "arn:aws:sns:us-east-1:021143882990:RandomQuestions",
        };
        // Send the SNS message
        const data = await snsClient.send(new PublishCommand(publish));
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
