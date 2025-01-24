import { Request, Response, NextFunction } from "express";
import { TopicVote } from "@/Interfaces/topicInterfaces";
import { VoteType } from "@/Interfaces/enums";
import { TopicVotesModel } from "@/Models/votes";
import { INVALID_REQUEST, SUCCESS } from "@/root/constants";
import { FilterQuery, Types } from "mongoose";
import { isInEnum } from "@/Utils/index";
import { UserModel } from "@/Models/users";

export async function vote(req: Request, res: Response, next: NextFunction) {
  try {
    const { topicId, userId } = req.query as { topicId: string; userId: string };

    if (!topicId) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    const filter: FilterQuery<TopicVote> = { topicId: topicId, "votes.userId": userId };
    const votes = await TopicVotesModel.findOne(filter);

    return res.status(200).json({ message: SUCCESS, votes });
  } catch (error) {
    next(error);
  }
}

export async function getVotes(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, userId } = req.body as { id: string; userId: string };

    if (!id) {
      return res.status(400).json({ message: INVALID_REQUEST });
    }

    let filter: FilterQuery<TopicVote> = {};
    filter = { topicId: new Types.ObjectId(id) };

    const topicVotes = await TopicVotesModel.find(filter);

    let voteNumber = 0;
    let upVote = 0;
    let downVote = 0;

    if (topicVotes.length === 0) {
      return res.status(200).json({ vote: { count: voteNumber, upVote, downVote } });
    }

    if (!userId && topicVotes.length !== 0) {
      topicVotes[0].votes.map(votes => {
        voteNumber += votes.vote === VoteType.UPVOTE ? 1 : -1;
        if (votes.vote === VoteType.UPVOTE) {
          upVote++;
        } else {
          downVote++;
        }
      });

      const result = {
        vote: {
          count: voteNumber,
          upVote,
          downVote,
        },
      };

      return res.status(200).json(result);
    }

    let userVote;

    topicVotes[0].votes.map(votes => {
      voteNumber += votes.vote === VoteType.UPVOTE ? 1 : -1;
      if (votes.vote === VoteType.UPVOTE) {
        upVote++;
      } else {
        downVote++;
      }

      if (votes.userId.toString() === userId) {
        userVote = votes.vote;
      }
    });

    const result = {
      userVote,
      vote: {
        count: voteNumber,
        upVote,
        downVote,
      },
    };

    return res.status(200).json({ ...result, userVote });
  } catch (error) {
    next(error);
  }
}

export async function addVote(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      type = VoteType.UPVOTE,
      // TODO: This should be removed
      userId = "661398c98ba8a900e6c2c858",
      topicId,
    } = req.body as {
      type: string | undefined;
      userId: string | undefined;
      topicId: string | undefined;
    };

    if ((type && !isInEnum(type, VoteType)) || !userId || !topicId) {
      return res.status(400).json({ message: INVALID_REQUEST }).end();
    }

    const user = await UserModel.findOne({ _id: userId }, { username: 1, userProfilePic: 1 });

    if (!user) {
      return res.status(404).json({ message: "User not found" }).end();
    }

    const existingVote = await TopicVotesModel.findOne({ topicId, "votes.userId": userId }, { _id: 1, "votes.$": 1 });

    if (existingVote) {
      if (type === VoteType.UNVOTE) {
        const result = await TopicVotesModel.findOneAndUpdate({ topicId }, { $pull: { "votes": { userId } } });
        return res.status(200).json(result);
      }
      await TopicVotesModel.findOneAndUpdate({ topicId, "votes.userId": userId }, { $set: { "votes.$.vote": type } });

      let filter: FilterQuery<TopicVote> = {};
      filter = { topicId: new Types.ObjectId(topicId) };
      const newVotes = await TopicVotesModel.find(filter);

      let voteNumber = 0;
      let upVote = 0;
      let downVote = 0;

      if (newVotes.length === 0) {
        return res.status(200).json({ vote: { count: voteNumber, upVote, downVote } });
      }

      let userVote;

      newVotes[0].votes.map(votes => {
        voteNumber += votes.vote === VoteType.UPVOTE ? 1 : -1;
        if (votes.vote === VoteType.UPVOTE) {
          upVote++;
        } else {
          downVote++;
        }

        if (votes.userId == userId) {
          userVote = votes.vote;
        }
      });

      const result = {
        vote: {
          count: voteNumber,
          upVote,
          downVote,
        },
      };

      return res.status(200).json({ ...result, userVote });
    } else {
      await TopicVotesModel.findOneAndUpdate(
        { topicId },
        {
          $push: {
            votes: {
              userId: userId,
              date: new Date(),
              vote: type,
            },
          },
        },
        { upsert: true },
      );

      let filter: FilterQuery<TopicVote> = {};
      filter = { topicId: new Types.ObjectId(topicId) };
      const newVotes = await TopicVotesModel.find(filter);

      let voteNumber = 0;
      let upVote = 0;
      let downVote = 0;

      if (newVotes.length === 0) {
        return res.status(200).json({ vote: { count: voteNumber, upVote, downVote } });
      }

      let userVote;

      newVotes[0].votes.map(votes => {
        voteNumber += votes.vote === VoteType.UPVOTE ? 1 : -1;
        if (votes.vote === VoteType.UPVOTE) {
          upVote++;
        } else {
          downVote++;
        }

        if (votes.userId === userId) {
          userVote = votes.vote;
        }
      });

      const result = {
        userVote,
        vote: {
          count: voteNumber,
          upVote,
          downVote,
        },
      };

      return res.status(200).json({ ...result, userVote: type });
    }
  } catch (error) {
    next(error);
  }
}
