const { jwtDecode } = require("jwt-decode");

exports.oauthMiddleware = async (req, res, next) => {
  try {
    console.log("Oauth MIddleware req" + req);
    const credentials = req.headers.authorization;

    const decodedeData = jwtDecode(credentials);
    console.log("Outh cred decoded in middleware : "+ decodedeData);

    req.user =  decodedeData;

    next();
  } catch (error) {
    console.log("Error in Oauth > >", error);
    return res
      .status(500)
      .json({ message: "Error in Oauth-backend", error: error });
  }
};
