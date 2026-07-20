import { Router } from "express";

const router = Router();

router.post("/validate", (req, res) => {
  const { role, key } = req.body;

  if (!role || !key) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  if (
    role === "founder" &&
    key === process.env.FOUNDER_ADMIN_KEY
  ) {
    return res.json({ success: true, role: "founder" });
  }

  if (
    role === "manager" &&
    key === process.env.MANAGER_ADMIN_KEY
  ) {
    return res.json({ success: true, role: "manager" });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid access key",
  });
});

export default router;
