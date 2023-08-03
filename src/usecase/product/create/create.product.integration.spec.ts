import {Sequelize} from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecases";
import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "../find/find.product.usecase";

describe("Test create product UC", () =>{
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

   it("Should create a product", async () =>{
      const productRepository = new ProductRepository();
      const createProductUseCase = new CreateProductUseCase(productRepository);
       const product = new Product("123", "P1", 10);

       const outputCreateProductDto = await createProductUseCase.execute(product);

       const input = {
           id: outputCreateProductDto.id,
       };

       const output = {
           id: outputCreateProductDto.id,
           name: outputCreateProductDto.name,
           price: outputCreateProductDto.price,
       };

       const findProductUseCase = new FindProductUseCase(productRepository);
       const result = await findProductUseCase.execute(input);

       expect(result).toEqual(output);
   });
});