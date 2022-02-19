const User = require("../models/User");

exports.registerUser = async (req, res) => {
  try {
    console.log("-------req.body", req.body);
    let user = await User.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });
    console.log("user", user);
    if (user) {
      return res.status(401).send({
        status: "Abonded",
        message: "User already exits",
      });
    } else {
      var randomstring = Math.random().toString(36).slice(-8);
      console.log("randomstring", randomstring);
      let insertedValue = await User.create({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        gender: req.body.gender,
        dob: req.body.dob,
        username: req.body.username,
        phoneNumber: req.body.phoneNumber,
        profilePicture: req.body.profilePicture,
        password: "123456"
      });
      console.log("User Created", insertedValue);

      return res.status(201).send({
        status: "Success",
        message: "User created successfully!",
        data: insertedValue,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(401).send({
                status: "Abonded",
                message: "Please enter a valid details",
              });
        }else{
            var user = await User.findOne({email: email});
            if(!user){
                return res.status(401).send({
                    status: "Abonded",
                    message: "Invalid Credentials!",
                  });
            }
            console.log("Logged in successfully");
            return res.status(200).send({
                status: "Success",
                message: "Logged in successfully!",
              });
        }
    } catch (error) {
        console.log(error);
    }
};
