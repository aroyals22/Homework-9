// const questions = [
  
// ];

var inquirer = require("inquirer");
var fs = require("fs");
var axios = require("axios");
var gh = require("./generateHTML");
var util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const pdf = require("html-pdf");

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
            choices: ["Blue","Green","Pink","Red"],
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
                name: response.data.name,
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

            var fileName = "./" + userData.name.toLowerCase().split(" ").join("") +".pdf";
            var profileHTML = gh(userData);

            pdf.create(profileHTML).toFile(fileName, function(err, res){
                if (err) return console.log("ERROR!!!!")

            })

                        
                
          

        })




        
    });





// function writeToFile(fileName, data) {
 
// }

