import { Request, Response, NextFunction } from "express";
import { Comment } from "@/Interfaces/commentsInterfaces";
import { CommentsModel } from "@/Models/comments";
import {
  INVALID_REQUEST,
  SUCCESS,
  NOT_FOUND,
  LENGTH_ERROR,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
} from "@/root/constants";
import { FilterQuery, Types } from "mongoose";

export async function getComments(req: Request, res: Response, next: NextFunction) {
  try {
    const topicId: string = req.params.id as string;
    const currentUserId = (req.body?.userId as string) || "";

    if (!topicId) {
      return res.status(400).json({ message: "Invalid request: Topic ID and User ID must be provided." });
    }

    const pipeline: { $match: { "votes.userId": Types.ObjectId } }[] = [];
    if (currentUserId) {
      pipeline.push({ $match: { "votes.userId": new Types.ObjectId(currentUserId) } });
    }

    const comments = await CommentsModel.aggregate([
      {
        $match: { topicId: new Types.ObjectId(topicId) },
      },
      {
        $lookup: {
          from: process.env.TOPIC_VOTES_COLLECTION || "Votes",
          localField: "_id",
          foreignField: "topicId",
          as: "votes",
        },
      },
      {
        $lookup: {
          from: process.env.USER_COLLECTION || "Users",
          localField: "user._id",
          foreignField: "_id",
          as: "user",
          pipeline: [{ $project: { username: 1, _id: 0 } }],
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: process.env.USER_COLLECTION || "Users",
          localField: "replies.user._id",
          foreignField: "_id",
          as: "repliesUsers",
          pipeline: [{ $project: { username: 1, _id: 1 } }],
        },
      },
      {
        $lookup: {
          from: process.env.TOPIC_VOTES_COLLECTION || "Votes",
          localField: "replies._id",
          foreignField: "topicId",
          as: "repliesWithVotes",
          pipeline: pipeline,
        },
      },
      {
        $addFields: {
          voteCount: {
            $sum: {
              $map: {
                input: "$votes",
                as: "voteItem",
                in: {
                  $sum: {
                    $map: {
                      input: "$$voteItem.votes",
                      as: "vote",
                      in: { $cond: { if: { $eq: ["$$vote.vote", "up"] }, then: 1, else: -1 } },
                    },
                  },
                },
              },
            },
          },
          "replies": {
            $map: {
              input: "$replies",
              as: "reply",
              in: {
                $mergeObjects: [
                  "$$reply",
                  {
                    user: {
                      $arrayElemAt: [
                        {
                          $map: {
                            input: {
                              $filter: {
                                input: "$repliesUsers",
                                as: "user",
                                cond: { $eq: ["$$user._id", "$$reply.user._id"] }, // Ensure this is matching your ID fields correctly
                              },
                            },
                            as: "userFiltered",
                            in: {
                              _id: "$$userFiltered._id", // Including _id in the output
                              username: "$$userFiltered.username", // Including username in the output
                            },
                          },
                        },
                        0,
                      ],
                    },
                  },
                  {
                    votesCount: {
                      $sum: {
                        $map: {
                          input: {
                            $filter: {
                              input: "$repliesWithVotes",
                              as: "vote",
                              cond: { $eq: ["$$vote.topicId", "$$reply._id"] },
                            },
                          },
                          as: "vote",
                          in: {
                            $cond: { if: { $eq: ["$$vote.votes.vote", "up"] }, then: 1, else: -1 },
                          },
                        },
                      },
                    },
                  },
                ],
              },
            },
          },
        },
      },
      {
        $sort: { created: -1 },
      },
      {
        $limit: 10,
      },
    ]);

    return res.status(200).json({ data: comments });
  } catch (error) {
    next(error);
  }
}

export async function addComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { comment, userId, topicId }: { comment: string; userId: string; topicId: string } = req.body;

    if (!comment || !userId || !topicId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    if (comment.length < MIN_COMMENT_LENGTH || comment.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({ message: LENGTH_ERROR });
    }

    const filter: FilterQuery<Comment> = { _id: new Types.ObjectId() };

    const update: Comment = {
      content: comment,
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

    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const addedComment = await CommentsModel.findOneAndUpdate(filter, update, options);

    if (!addedComment) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: addedComment });
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { commentId, userId }: { commentId: string; userId: string } = req.body;

    if (!commentId || !userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const filter: FilterQuery<Comment> = { _id: commentId, "user._id": userId };
    const deletedComment = await CommentsModel.deleteOne(filter);

    if (!deletedComment) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: deletedComment });
  } catch (error) {
    next(error);
  }
}

export async function editComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { content, userId, commentId }: { content: string; userId: string; commentId: string } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    if (content.length < MIN_COMMENT_LENGTH || content.length > MAX_COMMENT_LENGTH) {
      return res.status(400).json({ message: LENGTH_ERROR });
    }

    const filter: FilterQuery<Comment> = { _id: commentId, "user._id": userId };

    const update = {
      $set: {
        "content": content,
        "updated": new Date(),
      },
    };

    const editedComment = await CommentsModel.findOneAndUpdate(filter, update, { new: true });

    if (!editedComment) {
      return res.status(404).json({ message: NOT_FOUND });
    }

    return res.status(200).json({ message: SUCCESS, data: editedComment });
  } catch (error) {
    next(error);
  }
}
