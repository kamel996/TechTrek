import bcrypt from "bcryptjs";

const users = [
  {
    name: "Kamel",
    email: "kamel@codi.tech",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "cic",
    email: "cic@codi.tech",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "ali",
    email: "ali@codi.tech",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "joe",
    email: "joe@codi.tech",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
