import { ProductForm } from "../../components/forms/ProductForm";

const ProductCreatePage = () => {
  return (
    <div className="mx-auto grid w-full max-w-7xl items-start gap-6">
      <div className="flex items-center gap-4"></div>
      <div className="w-full">
        <ProductForm />
      </div>
    </div>
  );
};

export default ProductCreatePage;
