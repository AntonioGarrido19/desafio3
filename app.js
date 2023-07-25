import express from "express";
import productManager from "./ProductManager.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/products", async (request, response) => {
  try {
    const products = await productManager.getProducts(); // Call getProducts() method

    const limit = request.query.limit;
    if (limit) {
      const resLimit = products.slice(0, parseInt(limit, 10));
      response.status(200).json({ message: "productos", products: resLimit });
    } else {
      response.status(200).json({ message: "productos", products });
    }
  } catch (error) {
    response.status(500).json({ error });
  }
});

app.get("/api/products/:pid", async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await productManager.getProductById(+pid);
    res.status(200).json({ message: "Product", product });
  } catch (error) {
    res.status.apply(500).json({ error });
  }
});

app.listen(8080, () => {
  console.log("servidor creado");
});
