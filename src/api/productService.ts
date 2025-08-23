import apiClient from "../lib/apiCliente";
import { type Produto } from "../types";

export const getProducts = async (): Promise<Produto[]> => {
  const response = await apiClient.get("/products");
  return response.data;
};
