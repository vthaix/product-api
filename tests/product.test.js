const request = require("supertest");

const API_URL = "http://localhost:3000";

describe("Product API CRUD", () => {
    const product = {
        pid: `TEST-${Date.now()}`,
        pname: "CI Test Product",
        price: 100000,
        quantity: 10,
    };

    test("GET /health should return 200", async () => {
        const response = await request(API_URL).get("/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe("UP");
        expect(response.body.service).toBe("product-api");
        expect(response.body.mongodb).toBe("UP");
    });

    test("POST /api/products should create a product", async () => {
        const response = await request(API_URL)
            .post("/api/products")
            .send(product);

        expect(response.statusCode).toBe(201);
        expect(response.body.pid).toBe(product.pid);
        expect(response.body.pname).toBe(product.pname);
        expect(response.body.price).toBe(product.price);
        expect(response.body.quantity).toBe(product.quantity);
    });

    test("GET /api/products/:pid should return the created product", async () => {
        const response = await request(API_URL)
            .get(`/api/products/${product.pid}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.pid).toBe(product.pid);
    });

    test("GET /api/products should return products", async () => {
        const response = await request(API_URL)
            .get("/api/products");

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        const found = response.body.find(
            (item) => item.pid === product.pid
        );

        expect(found).toBeDefined();
    });

    test("PUT /api/products/:pid should update the product", async () => {
        const response = await request(API_URL)
            .put(`/api/products/${product.pid}`)
            .send({
                pname: "CI Updated Product",
                price: 200000,
                quantity: 20,
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.pid).toBe(product.pid);
        expect(response.body.pname).toBe("CI Updated Product");
        expect(response.body.price).toBe(200000);
        expect(response.body.quantity).toBe(20);
    });

    test("DELETE /api/products/:pid should delete the product", async () => {
        const response = await request(API_URL)
            .delete(`/api/products/${product.pid}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            "Product deleted successfully"
        );
        expect(response.body.product.pid).toBe(product.pid);
    });

    test("GET deleted product should return 404", async () => {
        const response = await request(API_URL)
            .get(`/api/products/${product.pid}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe("Product not found");
    });
});