import { Request, Response, NextFunction } from "express";
import { TopicModel } from "@/Models/topics";
import { Types } from "mongoose";

// This function migrates the topics from string to object id
async function migrateTopics(req: Request, res: Response, next: NextFunction) {
  try {
    const docs = await TopicModel.find({});
    let objecttype = 0;
    let stringtype = 0;

    for (const doc of docs) {
      const oldId = doc._id;

      if (typeof oldId === "string") {
        stringtype++;
        await TopicModel.findByIdAndDelete(oldId);

        let newId;
        if (Types.ObjectId.isValid(oldId)) {
          newId = new Types.ObjectId(oldId);
        } else {
          newId = new Types.ObjectId();
        }

        const newDoc = {
          ...doc,
          _id: new Types.ObjectId(newId),
        };

        await TopicModel.create(newDoc);
      }

      if (typeof oldId === "object") objecttype++;
    }

    res.status(200).json({ msg: "Migration successful", objecttype: objecttype, stringtype: stringtype });
  } catch (error) {
    next(error);
    res.status(500).json({ msg: "Migration failed" });
  }
}

export { migrateTopics };
