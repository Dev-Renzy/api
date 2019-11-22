const model = require("../models/account");
const jwt = require("jsonwebtoken"); //to create token(encrypted string) for authentication
const Response = require("../models/response");
const response = new Response();

module.exports.login = (credentials, res) => {
  console.log(credentials);
  model.findOne((err, result) => {
    console.log(result);
    let token = { user: null };
    let error = true;
    if (!error) {
      if (result) {
        token.user = result;
        error = false;
      }
      response.setSuccessResponse(
        { accessToken: jwt.sign(token, "secret") },//decrypt
        "Login Successful!"
      );
      console.log(response.state);
      console.log(response);
      res.send(response.state);
    }
  });
};
