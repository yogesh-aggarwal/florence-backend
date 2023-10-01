import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { generatePasswordHash, validatePassword } from "../core/utils";
import { User } from "../models/user";

const jwtSecretKey = "6ade6ec820c571e8c9a6dc955fc59988";

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
