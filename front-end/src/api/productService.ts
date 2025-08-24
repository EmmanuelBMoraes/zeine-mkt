import apiClient from "../lib/apiCliente";
import { type Produto, type ProdutoPayload } from "../types";

export const getProducts = async (): Promise<Produto[]> => {
  const response = await apiClient.get("/products");
  return response.data;
};

export const uploadImage = async (
  imageFile: File
): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  // 'file' deve ser o nome do campo que seu backend espera para o upload
  formData.append("file", imageFile);

  console.log("productService: Enviando imagem...");
  // Use o endpoint correto para upload. Ex: '/products/upload'
  const response = await apiClient.post("/products/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createProduct = async (
  productData: ProdutoPayload
): Promise<Produto> => {
  console.log("productService: Criando novo produto...");
  const response = await apiClient.post("/products", productData);
  return response.data;
};
