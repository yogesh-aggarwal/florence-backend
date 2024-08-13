import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generatePasswordHash, validatePassword } from "../core/utils.js";
import { User } from "../models/user.js";
import { config } from "dotenv";
import { OAuth2Client } from "google-auth-library";

config();
const jwtSecretKey = process.env.JWT_SECRET

/**
 * 1. Get the body
 * 2. Check if user already exists or not
 *    Components:
 *      a. Database
 *      b. Method to interact
 * 3. If not exists, return failure
 * 4. Retrieve user
 * 5. password check
 * 6. Encyrpt the retrieved user data in a JWT token
 * 7. Return the generated JWT token
 */

/**
 * created for the open authentication google
 */
const client = new OAuth2Client(
  "609441188878-gj7sj9mht2a7f0h2qg266f3dn1739mfs.apps.googleusercontent.com"
);

export async function login(req, res) {
  // Step 1: Extract information from body & validate them
  let { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .send({ message: "please enter the required feilds" });
  }

  // Step 2: Check if user already exists, if not then raise error
  const user = await User.findOne({ email: { $eq: email } });
  if (!user) {
    return res.status(401).send({ message: "invalid request" });
  }

  // Step 3: Check for correctness of password
  const isMatched = await bcrypt.compare(password, user["password"]);
  if (!isMatched) {
    return res.status(401).send({ message: "the passsword is incorrect" });
  }

  // Step 4: Generate token
  const token = jwt.sign(email, jwtSecretKey);
  res.status(200).send({ token: token, user: user });
}

/**
 * 1. Get the body
 * 2. Check if user already exists or not
 *    Components:
 *      a. Database
 *      b. Method to interact
 * 3. If exists, return failure
 * 4. Create user
 *    1. Generate password hash
 *    2. Store the user information from body to database
 * 5. Return success
 */
export async function signUp(req, res) {
  // Step 1: Retriving the information of user
  let { email, password, name } = req.body;

  if (email) email = email.trim();
  if (name) name = name.trim();
  if (password) password = password.trim();

  // !x is true if x is any of these: 0, null, undefined, ""
  // Exception: !x is still false if x is [], {}
  if (!email || !password || !name) {
    return res
      .status(404)
      .send({ message: "please enter the required fields" });
  }

  // Step 2: Checking if users alredy exists if yes raise error
  const user = await User.findOne({ email: { $eq: email } });
  if (user) {
    return res.status(404).send({ message: "email already exist" });
  }

  // Step 3: Validating the password if it's not valid raise error, else generate hash password
  if (!validatePassword(password)) {
    return res.status(404).send({
      message:
        "Password must contain atleast 1 of each of the following: lowercase, uppercase, number, special character.",
    });
  }
  password = await generatePasswordHash(password);

  // Step 4: Creating a variable which stores in information of the new user
  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: email,
    password: password,
    name: name,
    mobileNumbers: [],
    deliveryAddresses: [],
    dp: "",
  });

  // Step 5: If credentials are not validated return error
  const validationError = newUser.validateSync();
  if (validationError) {
    return res.status(404).send({ message: validationError.message });
  }

  // Step 6: Saving credentials of new user to database and generating a token for the user
  await newUser.save();
  const token = jwt.sign(email, jwtSecretKey);
  res
    .status(200)
    .send({ message: "signedup successfully", token: token, user: newUser });
}

export async function deleteAccount(req, res) {
  //retriving the data
  const { email } = req.body;

  // if provided email is not available in database return error
  const user = await User.findOne({ email: { $eq: email } });
  if (!user) {
    return res.status(401).send({ message: "invalid request" });
  }

  // generate a token and verify it with the existing token
  const token = req.headers["authorization"].replace("Bearer ", "");
  const tokenemail = jwt.verify(token, jwtSecretKey);

  // if token user name(extracted above) is not equal to email provided return error
  if (email != tokenemail) {
    return res.status(401).send({ message: "invalid request" });
  }

  //delete user's information from database and return message for success
  await User.deleteOne({ email: { $eq: email } });
  res.status(200).send({ message: "account deleted successfully" });
}

/**
 * Function does the following steps to facilitates Google OAuth login:
 *
 * 1. Get the token id from the body.
 * 2. Verify token id from verify "id_token" function from OAuth by giving the clientId.
 * 3. Check if reponse payload exist.
 * 4. Check if user alredy exist in databse if yes then send the jwt token.
 * 5. If not then from response payload get email name and profilepic of user.
 * 6. Set and verify user from the mongo and then generate and send the jwt token.
 */
export async function loginWithGoogle(req, res) {
  let { tokenId } = req.body;


  const response = await client.verifyIdToken({
    idToken: tokenId,
    audience: client._clientId,
  });

  const payload = response.getPayload();
  if (!payload) {
    res.status(401).send();
    return;
  }
  const user = await User.findOne({ email: { $eq: payload.email } });
  if (!user) {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email: payload.email,
      password: "",
      name: payload.name,
      mobileNumbers: [],
      deliveryAddresses: [],
      dp: payload.picture ?? "",
    });
    const validationError = newUser.validateSync();
    if (validationError) {
      return res.status(404).send({ message: validationError.message });
    }

    await newUser.save();

    const token = jwt.sign(payload.email, jwtSecretKey);
    res
      .status(200)
      .send({ message: "signedup successfully", token: token, user: newUser });
  } else {
    const token = jwt.sign(payload.email, jwtSecretKey);
    res
      .status(200)
      .send({ message: "signedup successfully", token: token, user: user });
  }
}
