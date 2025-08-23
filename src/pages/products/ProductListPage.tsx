import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { ProductFilters } from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import { getProducts } from "../../api/productService";
import { type Produto } from "../../types";

const ProductListPage = () => {
  const [tempSearchTerm, setTempSearchTerm] = useState("");
  const [tempStatusFilter, setTempStatusFilter] = useState("todos");

  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [activeStatusFilter, setActiveStatusFilter] = useState("todos");

  const {
    data: allProducts,
    isLoading,
    isError,
  } = useQuery<Produto[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const handleApplyFilters = () => {
    setActiveSearchTerm(tempSearchTerm);
    setActiveStatusFilter(tempStatusFilter);
  };

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    return allProducts.filter((product) => {
      const matchesSearch =
        product.titulo.toLowerCase().includes(activeSearchTerm.toLowerCase()) ||
        product.descricao
          .toLowerCase()
          .includes(activeSearchTerm.toLowerCase());

      const matchesStatus =
        activeStatusFilter === "todos" ||
        product.status.toLowerCase() === activeStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [allProducts, activeSearchTerm, activeStatusFilter]);

  return (
    <div className="mx-auto grid w-full max-w-7xl items-start gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold">Seus produtos</h1>
        <p className="text-muted-foreground">
          Acesse e gerencie a sua lista de produtos à venda
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <aside className="hidden md:block">
          <ProductFilters
            searchTerm={tempSearchTerm}
            onSearchTermChange={setTempSearchTerm}
            statusFilter={tempStatusFilter}
            onStatusFilterChange={setTempStatusFilter}
            onApplyFilters={handleApplyFilters}
          />
        </aside>
        <div className="w-full">
          <ProductGrid
            products={filteredProducts}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
