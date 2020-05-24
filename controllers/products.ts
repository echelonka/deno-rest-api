import { v4 } from "https://deno.land/std/uuid/mod.ts";
import { Product } from "../types.ts";

let products: Product[] = [
  {
    id: "1",
    name: "Product One",
    description: "This is product one",
    price: 29.99,
  },
  {
    id: "2",
    name: "Product Two",
    description: "This is product two",
    price: 39.99,
  },
  {
    id: "3",
    name: "Product Three",
    description: "This is product three",
    price: 59.99,
  },
];

/**
 * @desc Getting all products
 * @function getProducts
 */
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

/**
 * @desc Getting a single product
 * @function getProduct
 */
const getProduct = (
  { response, params }: { response: any; params: { id: string } },
) => {
  const product = products.find((product) => product.id === params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: "No product found.",
    };
  }
};

/**
 * @desc Add a single product
 * @function addProduct
 */
const addProduct = async (
  { response, request }: { response: any; request: any },
) => {
  const body = await request.body();
  if (!request.hasBody) {
    response.status = 400;
    response.body = {
      success: false,
      error: "No data.",
    };
  } else {
    const product: Product = body.value;
    product.id = v4.generate();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  }
};

/**
 * @desc Update a product
 * @function updateProduct
 */
const updateProduct = async (
  { response, params, request }: {
    response: any;
    params: { id: string };
    request: any;
  },
) => {
  const product = products.find((product) => product.id === params.id);
  if (product) {
    const body = await request.body();
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;
    products = products.map((product) =>
      product.id === params.id ? { ...product, ...updateData } : product
    );
    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      error: "No product found.",
    };
  }
};

/**
 * @desc Delete a product
 * @function deleteProduct
 */
const deleteProduct = (
  { response, params }: { response: any; params: { id: string } },
) => {
  products = products.filter((product) => product.id !== params.id);
  response.body = {
    success: true,
    data: products,
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
