import express, {Request, Response} from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecases";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUsecase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";
import * as Console from "console";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const useCase = new CreateProductUseCase(new ProductRepository());
    try {
        Console.log(req.body);
        const productDto = {
            name: req.body.name,
            price: req.body.price
        };
        Console.log(productDto);
        const output = await useCase.execute(productDto);
        Console.log(output);

        res.send(output);
    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (req: Request, res: Response) => {
    const useCase = new ListProductUsecase(new ProductRepository());
    const output = await useCase.execute({});

    res.format({
        json: async () => res.send(output),
        xml: async () => res.send(ProductPresenter.listXML(output)),
    });
});