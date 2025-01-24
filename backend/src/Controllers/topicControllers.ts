import { Request, Response, NextFunction } from "express";
import { Topic } from "@/Interfaces/topicInterfaces";
import { TopicModel } from "@/Models/topics";
import { INVALID_ID, NOT_FOUND, QUERY_LIMIT } from "@/root/constants";
import { FilterQuery, Types } from "mongoose";
import { TopicPeriod } from "@/Interfaces/enums";
import { getStartAndEndDates } from "@/Utils/index";

async function getTopics(req: Request, res: Response, next: NextFunction) {
  try {
    const skip: number = Number(req.query.skip as string) || 0;
    const search: string = (req.query.search as string) || "";
    const date: number = Date.parse(req.query.date as string);
    const period: string = (req.query.period as string) || "";
    const category: string = (req.query.category as string) || "";
    const userId: string = req.headers["x-userid"] as string | "";
    let filter: FilterQuery<Topic> = {};

    if (period.toLowerCase() === "daily" || period === "") {
      filter = {
        ...filter,
        "$or": [{ "period": { "$exists": false } }, { "period": TopicPeriod.daily }],
      };
    } else if (period) {
      filter = { ...filter, "period": period.toLowerCase() };
    }

    const { startOfDay, endOfDay } = getStartAndEndDates(new Date(date));

    filter = !isNaN(date) ? { ...filter, "start_time": { "$gte": startOfDay, "$lt": endOfDay } } : filter;

    if (search) filter = { ...filter, "title": { "$regex": search, "$options": "i" } };

    filter = {
      ...filter,
    };

    const topics: Topic[] = await TopicModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: process.env.CATEGORY_COLLECTION || "Categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
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
          from: process.env.TOPIC_COMMENTS_COLLECTION || "Comments",
          localField: "_id",
          foreignField: "topicId",
          as: "comments",
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
          userVote: {
            $map: {
              input: "$votes",
              as: "voteItem",
              in: {
                $filter: {
                  input: "$$voteItem.votes",
                  as: "vote",
                  cond: { $eq: ["$$vote.userId", new Types.ObjectId(userId)] },
                },
              },
            },
          },
          commentCount: { $size: "$comments" },
        },
      },
      { $match: category ? { "categories.name": category } : {} },
      { $project: { votes: 0, category: 0, comments: 0 } },
    ])
      .sort({ start_time: -1 })
      .limit(QUERY_LIMIT)
      .skip(skip);

    if (!topics) {
      return res.status(404).json({ msg: NOT_FOUND });
    }

    return res.status(200).json(topics);
  } catch (error) {
    next(error);
  }
}

async function getTopicById(req: Request, res: Response, next: NextFunction) {
  try {
    if (!Types.ObjectId.isValid(req.params.topicId)) {
      return res.status(400).json({ msg: INVALID_ID });
    }

    const userId: string = req.headers["x-userid"] as string | "";
    const filter: FilterQuery<Topic> = { _id: new Types.ObjectId(req.params.topicId) };

    const topic: Topic[] | null = await TopicModel.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: process.env.CATEGORY_COLLECTION || "Categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
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
          userVote: {
            $map: {
              input: "$votes",
              as: "voteItem",
              in: {
                $filter: {
                  input: "$$voteItem.votes",
                  as: "vote",
                  cond: { $eq: ["$$vote.userId", new Types.ObjectId(userId)] },
                },
              },
            },
          },
        },
      },
      { $project: { votes: 0, category: 0 } },
    ]).limit(1);

    if (!topic) {
      return res.status(404).json({ msg: NOT_FOUND });
    } else {
      return res.status(200).json(topic[0]);
    }
  } catch (error) {
    next(error);
  }
}

export { getTopics, getTopicById };
