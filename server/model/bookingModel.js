import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Booking = sequelize.define("Booking", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    event_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
        },
    },
    status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
}, {
  timestamps: true,   
  tableName: "bookings",
});