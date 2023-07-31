import CreateProductUseCase from "./create.product.usecases";

const input ={
    name: "Product 1",
    price: 10
}

const MockRepository = () => {
    return{
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
};

describe("Unit test create product use case", ()=>{
    it('should create a product', async () => {
        const productRepository= MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = await productCreateUseCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });
    });

    it('should trow an error when name is missing', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "";
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it('should trow an error when price is smaller than zero', async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input.name = "Product 1";
        input.price = -10;
        await expect(productCreateUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
})