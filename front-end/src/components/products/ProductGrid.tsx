import { ProductCard } from "./ProductCard";
import { Skeleton } from "../../components/ui/skeleton";
import { type Produto } from "../../types";

interface ProductGridProps {
  products: Produto[];
  isLoading: boolean;
  isError: boolean;
}

const ProductGrid = ({ products, isLoading, isError }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-[320px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">Ocorreu um erro ao carregar os produtos.</p>
    );
  }

  if (!products || products.length === 0) {
    return <p>Nenhum produto encontrado com os filtros selecionados.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={{
            ...product,
          }}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
