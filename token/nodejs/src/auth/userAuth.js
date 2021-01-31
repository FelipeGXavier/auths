const bcrypt = require("bcrypt");
const userRepository = require("../data/userRepository");
const token = require("../auth/token");

const signUp = async (req, res) => {
  const { email, password } = req.body;
  const user = await User(email, password);
  await userRepository.insert(user);
  return res.sendStatus(201);
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await userRepository.findByEmail(email);
  try {
    const result = await comparePromise(password, user.password);
    if (result) {
      const jwt = await token.genToken({ id: user.id, email: user.email });
      return res.json({ token: jwt, success: true });
    } else {
      return res.sendStatus(401);
    }
  } catch (err) {
    return res.sendStatus(401);
  }
};

const guard = (req, res) => {
  return res.json(req.user);
};

async function User(email, password) {
  const hash = await bcrypt.hash(password, 10);
  return { email, password: hash };
}

function comparePromise(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, function (err, result) {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

module.exports = {
  signIn,
  signUp,
  guard,
};
