import { NextFunction, Request, Response } from "express";
import { BaseController } from "@/utils/base/base.controller";
import { CatsService } from "./cats.service";

export class CatsController extends BaseController<CatsService> {
  protected setupRoutes(): void {
    this.router
      .get("/", this.find.bind(this))
      .get("/:id", this.findById.bind(this))
      .post("/", this.create.bind(this))
      .patch("/:id", this.update.bind(this))
      .delete("/:id", this.delete.bind(this));

    this.app.use("/cats", this.router);
  }

  async find(req: Request, res: Response, next: NextFunction) {
    try {
      const cats = await this.service.getAll();

      res.json(cats);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const cat = await this.service.getById(id);

      res.json(cat);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    const data = req.body;

    try {
      const createdCat = await this.service.create(data);

      res.json(createdCat);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const data = req.body;

    try {
      if (Object.keys(data).length === 0) new Error("Invalid request body");

      const updatedCat = await this.service.update(id, data);

      res.json(updatedCat);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const deletedCat = await this.service.delete(id);

      res.json(deletedCat);
    } catch (e) {
      console.error(e);
      next(e);
    }
  }
}
