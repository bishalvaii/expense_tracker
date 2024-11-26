import bcrypt from "bcryptjs";

const generateHash = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const pwd = await bcrypt.hash(password, salt);
  return pwd;
};

export { generateHash };
