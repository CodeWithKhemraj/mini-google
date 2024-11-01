
const TestUser = async (req, res) => {
  res.status(200).json({ success: true, response:"API hit" });
};

module.exports = { TestUser };