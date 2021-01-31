const bcrypt = require("bcrypt");
const userRepository = require("../data/userRepository");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User(email, password);
  await userRepository.insert(user);
  return res.sendStatus(201);
};

const signIn = (req, res) => {
  const { email, password } = req.body;
};

const guard = (req, res) => {
  return res.send("Protected Route");
};

async function User(email, password) {
  const hash = await bcrypt.hash(password, 10);
  return { email, password: hash };
}

module.exports = {
  signIn,
  signUp,
  guard,
};
