// const questions = [
  
// ];

var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios")
var gh = require("./generateHTML")

inquirer
    .prompt([
        {
            type: "input",
            name: "name",
            message: "What is your gitHub username?"
            
        },
        {
            type: "list",
            message: "Pick a favorite color",
            choices: ["Aqua","Black","Blue","Brown","Green","Gray","Lavender","Orange","Pink","Purple","Red","Tan","Snow","Yellow"],
            name: "color"
        }
    ]).then(function(inputs){
        console.log(JSON.stringify(inputs))
        var inputString= JSON.stringify(inputs)
        var username=inputs.name
        var queryUrl = "https://api.github.com/users/" + username;
        axios.get(queryUrl).then(function(response){
            // console.log(response);
            console.log(inputs.color)

            var userData = { colors: inputs.color.toLowerCase(),
                imageURL: response.data.avatar_url,
                location: response.data.location,
                profile_link: response.data.html_url,
                repos: response.data.public_repos,
                followers: response.data.followers,
                following: response.data.following,
                }
                // var fileName = username.toLowerCase().split(" ").join("") +".pdf";
                // fs.writeFile(fileName,generateHTML(userData))

                console.log(userData)
                
            // console.log(generateHTML)
            // var html = generateHTML(userData)
            gh(userData)
            
                
          

        }).catch(function(err){
            console.log(err)
        });





        
    });





// function writeToFile(fileName, data) {
 
// }

