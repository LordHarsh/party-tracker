import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../jwt";
import database from "../../loaders/mongo";

// to authenticate faculty
export default function authenticateFaculty() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearer_token = req.headers["authorization"];
    console.log(bearer_token);
    const token = bearer_token?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    try {
      const email = verifyToken(token);
      const db = await database();
      const faculty = (await db).collection("faculties").findOne({
        email,
      });
      if (!faculty) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      res.locals.faculty = faculty;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  };
}

// to authentiate student
export function authenticateStudent(){
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearer_token = req.headers["authorization"];
    console.log(bearer_token);
    const token = bearer_token?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    try {
      const email = verifyToken(token);
      const db = await database();
      const students = (await db).collection("students").findOne({
        email,
      });
      if (!students) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
      res.locals.faculty = students;
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  }
}