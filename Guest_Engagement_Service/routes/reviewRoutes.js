import express from 'express';
import { createReview,
    getSingleReview, 
    updateReview,
    getReviewsByRoomId,
    deleteReview,
    pinReview} from '../controllers/reviewController.js';

const router = express.Router();

// Create Review
router.post("/", createReview);

// Get Reviews by Room ID
router.get("/room/:roomId", getReviewsByRoomId);

// Get Single Review
router.get("/:id", getSingleReview);

// Update Review
router.put("/:id", updateReview);

// Pin Review
router.put("/pin/:id", pinReview);

// Delete Review
router.delete("/:id", deleteReview);

export default router;