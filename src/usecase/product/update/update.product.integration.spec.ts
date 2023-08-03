import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";
import UpdateProductUsecase from "./update.product.usecase";

describe("Test update product UC", () => {
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

    it("Should update products", async () => {
        const productRepository = new ProductRepository();
        const product = new Product("123", "P1", 10);

        await productRepository.create(product);

        const output = {
            id: "123",
            name: "Updated",
            price: 55,
        };
        const updateProductUsecase = new UpdateProductUsecase(productRepository);
        const result = await updateProductUsecase.execute(output);

        expect(result).toEqual(output);
    });
});