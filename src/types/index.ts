export interface Produto {
  _id: string;
  titulo: string;
  descricao: string;
  preco: number;
  categoria: string;
  status: "ativo" | "inativo" | "vendido";
  imagemUrl: string;
  createdAt: string;
  updatedAt: string;
}

export type ProdutoPayload = Omit<Produto, "_id" | "createdAt" | "updatedAt">;
