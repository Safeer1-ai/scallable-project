const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authContainer } = require('../utils/cosmosClient');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );
};

// Register User
exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ error: "Missing fields" });

  const query = `SELECT * FROM c WHERE c.email = @email`;
  const { resources } = await authContainer.items.query({
    query,
    parameters: [{ name: "@email", value: email }],
  }).fetchAll();

  if (resources.length > 0) return res.status(409).json({ error: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = {
    id: email,
    email,
    password: hashedPassword,
    role,
  };

  await authContainer.items.create(newUser);
  res.status(201).json({ message: "User registered successfully" });
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM c WHERE c.email = @email`;
  const { resources } = await authContainer.items.query({
    query,
    parameters: [{ name: "@email", value: email }],
  }).fetchAll();

  const user = resources[0];
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);
  res.status(200).json({ message: "Login successful", token, user });
};
