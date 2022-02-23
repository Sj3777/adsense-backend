const User = require("../models/User");
const accountSid = process.env.SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')("AC03562a7812838c0749ac4d333338cc0d", "d1e75a11ff8011ba1470029968e93742");

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
            console.log("Logged in successfully", user);
            return res.status(200).send({
                status: "Success",
                message: "Logged in successfully!",
                data: user
              });
             
        }
    } catch (error) {
        console.log(error);
    }
};

//phone verification
exports.phoneVerification = async (req, res) => {
  client.verify.services(process.env.serviceID).verifications.create({
    to: `+${req.body.phoneNumber}`,
    channel: req.body.channel
  }).then( data => {
    console.log("Otp is sent to your Phone Number: " + req.body.phoneNumber);
    res.status(200).send(data);
  }).catch((err)=>{
    console.log("err", err);
    res.status(400).send(err);
  })

}

//verify the otp 
exports.verifyOtp = async (req, res) => {
  client.verify.services(process.env.serviceID).verificationChecks.create({
    to: `+${req.body.phoneNumber}`,
    code: req.body.code
  }).then(data => {
    console.log("You are successfully: " + data.status);
    console.log("Phone number verified successfully!");
    res.status(200).send(data);
  }).catch((err)=>{
    res.status(400).send(err);
  })
}