import { Request, Response } from "express";
import { container } from 'tsyringe'
import { ImportCategoryUseCase } from "./ImportCategoryUseCase";

class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { file } = request;

      const importCategoryUseCase = container.resolve(ImportCategoryUseCase);
  
      await importCategoryUseCase.execute(file);
      
      return response.send(); 
    } catch (error) {
      response.status(400).json({ message: error.message })
    }
  }
}

export { ImportCategoryController }