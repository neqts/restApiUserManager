import express from "express";
import {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
  test,
} from "../controllers/users.js";

const router = express.Router();

router.post("/login", test);
router.get("/users", getUsers);
router.post("/user", createUser);
router.get("/user/:id", getUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

export default router;
