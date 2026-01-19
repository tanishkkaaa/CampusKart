import api from "./Api";

/**
 * ✅ Get all products (Home + Marketplace)
 */
export const getAllProducts = async (filters = "") => {
  try {
    const res = await api.get(`/products${filters}`);
    return res.data.products;
  } catch (error) {
    console.error(
      "❌ Error fetching products",
      error?.response?.data || error.message
    );
    return [];
  }
};

/**
 * ✅ Get products created by the logged-in user (for MySpace)
 * (uses same /products endpoint + filters in frontend)
 */
export const getMyProducts = async () => {
  try {
    const res = await api.get("/products");
    return res.data.products;
  } catch (error) {
    console.error(
      "❌ Error fetching my products",
      error?.response?.data || error.message
    );
    return [];
  }
};

/**
 * ✅ Create a new product (for CreateProduct page)
 */
export const createProduct = async (productData) => {
  try {
    const res = await api.post("/products", productData);
    return res.data;
  } catch (error) {
    console.error(
      "❌ Error creating product",
      error?.response?.data || error.message
    );
    return null;
  }
};
