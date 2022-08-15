const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DATABASE_URL);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("DB :: Connection has been established successfully.");
    console.log("DB :: Running migrations.");
    sequelize.sync();
    console.log("DB :: Migrations done.");
  } catch (error) {
    console.error("DB :: Unable to connect to the database:", error);
  }
})();

const Investor = sequelize.define("Investor", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dob: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  street: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipCode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = {
  sequelize: sequelize,
  Investor: Investor,
};
