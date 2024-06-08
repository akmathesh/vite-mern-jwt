import express from "express";
import {
  createUser,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../controllers/users.controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/login", login);
router.get("/profile", getProfile);
router.put("/profile/:id", updateProfile);
router.post("/", logout);

export default router;
