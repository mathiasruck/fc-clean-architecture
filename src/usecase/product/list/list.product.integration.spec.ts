import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import ListProductUsecase from "./list.product.usecase";

describe("Test list products UC", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: {force: true},
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("Should list products", async () => {
        const productRepository = new ProductRepository();
        const product1 = new Product("123", "P1", 10);
        const product2 = new Product("321", "P2", 20);

        await productRepository.create(product1);
        await productRepository.create(product2)

        const output =
            {
                "products": [
                    {
                        id: "123",
                        name: "P1",
                        price: 10,
                    }, {
                        id: "321",
                        name: "P2",
                        price: 20,
                    }
                ]
            };

        const listProductUsecase = new ListProductUsecase(productRepository);
        const result = await listProductUsecase.execute({});

        expect(result).toEqual(output);
    });
});