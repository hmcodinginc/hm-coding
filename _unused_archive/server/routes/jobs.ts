import { Router, Request, Response } from "express";
import Job from "../models/Job.js";

const router = Router();

// GET all jobs
router.get("/", async (_req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
});

export default router;
