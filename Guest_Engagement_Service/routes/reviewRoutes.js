import express from 'express';
import { createReview,
    getSingleReview } from '../controllers/reviewController.js';

const router = express.Router();

// Create Review
router.post("/", createReview);

// Get Single Review
router.get("/:id", getSingleReview);

export default router;