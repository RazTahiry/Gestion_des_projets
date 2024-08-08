"use strict";

const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashPassword = async (password) => {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    };

    return queryInterface.bulkInsert("Users", [
      {
        id: 1,
        name: "John",
        lastName: "Doe",
        email: "johndoe@example.com",
        password: await hashPassword("12345678"),
        role: "admin",
      },
    ]);
  },
  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
