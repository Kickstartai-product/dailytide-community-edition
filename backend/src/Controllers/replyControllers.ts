import { Request, Response, NextFunction } from "express";
import { Comment } from "@/Interfaces/commentsInterfaces";
import { CommentsModel } from "@/Models/comments";
import {
  INVALID_REQUEST,
  SUCCESS,
  NOT_FOUND,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  LENGTH_ERROR,
} from "@/root/constants";
import { FilterQuery, Types } from "mongoose";

export async function getReplies(req: Request, res: Response, next: NextFunction) {
  try {
    const { topicId, parentId } = req.query;

    if (!topicId || !parentId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const filter: FilterQuery<Comment> = { topicId: topicId, parentId: parentId };
    const replies = await CommentsModel.find(filter);

    if (!replies) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: replies });
  } catch (error) {
    next(error);
  }
}

export async function addReply(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      content,
      userId,
      topicId,
      parentId,
    }: { content: string; userId: string; topicId: string; parentId: string } = req.body;

    if (!content || !userId || !topicId || !parentId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    if (content.length < MIN_COMMENT_LENGTH || content.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({ message: LENGTH_ERROR });
    }

    const filter: FilterQuery<Comment> = { _id: parentId, topicId: topicId, active: true };

    const newReply: Comment = {
      content: content,
      user: {
        _id: new Types.ObjectId(userId),
      },
      replies: [],
      topicId: new Types.ObjectId(topicId),
      created: new Date(),
      updated: new Date(),
      flag: "",
      verified: false,
      active: true,
      votes: [],
    };

    const update = { $push: { replies: newReply } };

    const options = { new: true };

    const addedComment = await CommentsModel.findOneAndUpdate(filter, update, options);

    if (!addedComment) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: addedComment });
  } catch (error) {
    next(error);
  }
}

export async function deleteReply(req: Request, res: Response, next: NextFunction) {
  try {
    const { replyId, userId }: { replyId: string; userId: string } = req.body;

    if (!replyId || !userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const filter: FilterQuery<Comment> = { _id: replyId, "user._id": userId };
    const deletedReply = await CommentsModel.deleteOne(filter);

    if (!deletedReply) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: deletedReply });
  } catch (error) {
    next(error);
  }
}

export async function editReply(req: Request, res: Response, next: NextFunction) {
  try {
    const { content, userId, replyId }: { content: string; userId: string; replyId: string } = req.body;

    if (!content || !userId || !replyId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    if (content.length < MIN_COMMENT_LENGTH || content.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({ message: LENGTH_ERROR });
    }

    const filter: FilterQuery<Comment> = { _id: replyId, "user._id": userId };

    const update = {
      $set: {
        "content": content,
        "updated": new Date(),
      },
    };

    const editedReply = await CommentsModel.findOneAndUpdate(filter, update, { new: true });

    if (!editedReply) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: editedReply });
  } catch (error) {
    next(error);
  }
}
