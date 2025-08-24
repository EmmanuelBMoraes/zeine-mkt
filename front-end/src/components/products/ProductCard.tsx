import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

import { type Produto } from "../../types/index";

interface ProductCardProps {
  product: Produto;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const getStatusVariant = (
    status: string
  ): "default" | "destructive" | "secondary" => {
    switch (status.toLowerCase()) {
      case "vendido":
        return "secondary";
      case "desativado":
      case "inativo":
        return "destructive";
      case "anunciado":
      case "ativo":
      default:
        return "default";
    }
  };

  return (
    <Card className="overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="p-0 relative">
        <img
          src={
            `${import.meta.env.VITE_API_URL}${product.imagemUrl}` ||
            "https://via.placeholder.com/300x200"
          }
          alt={product.titulo}
          className="w-full h-40 object-cover p-2 rounded-2xl bg-white"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge variant={getStatusVariant(product.status)}>
            {product.status.toUpperCase()}
          </Badge>
          {product.categoria && (
            <Badge variant="dark">{product.categoria.toUpperCase()}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 flex flex-col">
        <div className="flex justify-between">
          <CardTitle className="text-lg mb-1 truncate">
            {product.titulo}
          </CardTitle>
          <p className="text-xl font-bold mb-2">
            R$ {product.preco.toFixed(2).replace(".", ",")}
          </p>
        </div>
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 h-10">
          {product.descricao}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
