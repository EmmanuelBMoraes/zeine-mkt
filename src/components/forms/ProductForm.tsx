import { useState, useRef, type ChangeEvent, type FormEvent } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { ImageUp, Loader2 } from "lucide-react";
import { createProduct, uploadImage } from "../../api/productService";
import type { ProdutoPayload } from "../../types";

interface IImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const ImageUpload = ({
  imagePreview,
  onImageSelect,
  disabled,
}: IImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelect}
        className="hidden"
        accept="image/png, image/jpeg, image/webp"
        disabled={disabled}
      />
      <Card
        onClick={handleCardClick}
        className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-base-shape h-full min-h-[300px] transition-colors ${
          !disabled
            ? "cursor-pointer hover:border-brand-orange-base"
            : "cursor-not-allowed bg-gray-100"
        }`}
      >
        <CardContent className="text-center p-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Pré-visualização do produto"
              className="max-h-full max-w-full object-contain rounded-md"
            />
          ) : (
            <>
              <ImageUp className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-sm font-semibold text-gray-600">
                Selecione a imagem do produto
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export const ProductForm = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    valor: "",
    descricao: "",
    categoria: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prevData) => ({ ...prevData, categoria: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Por favor, selecione uma imagem para o produto.");
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Componente: Chamando o serviço de upload de imagem...");
      const imageResponse = await uploadImage(imageFile);
      const { imageUrl } = imageResponse;
      const productPayload: ProdutoPayload = {
        titulo: formData.titulo,
        preco: parseFloat(formData.valor),
        descricao: formData.descricao,
        status: "ativo",
        categoria: formData.categoria,
        imagemUrl: imageUrl,
      };

      console.log("Componente: Chamando o serviço de criação de produto...");
      await createProduct(productPayload);

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error(
        "Ocorreu um erro no componente ao tentar cadastrar o produto:",
        error
      );
      alert(
        "Falha ao cadastrar o produto. Verifique os dados e tente novamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-9">
      <div className="lg:col-span-2">
        <ImageUpload
          imagePreview={imagePreview}
          onImageSelect={handleImageChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="lg:col-span-7">
        <Card className="shadow-sm">
          <CardContent className="p-8">
            <h3 className="text-xl font-bold mb-6">Dados do produto</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="titulo">TÍTULO</Label>
                  <Input
                    id="titulo"
                    placeholder="Nome do produto"
                    value={formData.titulo}
                    onChange={handleFormChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor">VALOR</Label>
                  <Input
                    id="valor"
                    type="number"
                    placeholder="R$ 0,00"
                    value={formData.valor}
                    onChange={handleFormChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="descricao">DESCRIÇÃO</Label>
                <Textarea
                  id="descricao"
                  placeholder="Escreva detalhes sobre o produto, tamanho, características"
                  value={formData.descricao}
                  onChange={handleFormChange}
                  disabled={isSubmitting}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">CATEGORIA</Label>
                <Select
                  value={formData.categoria}
                  onValueChange={handleCategoryChange}
                  disabled={isSubmitting}
                  required
                >
                  <SelectTrigger id="categoria">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="moveis">Móveis</SelectItem>
                    <SelectItem value="vestuario">Vestuário</SelectItem>
                    <SelectItem value="brinquedos">Brinquedos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" type="button" disabled={isSubmitting}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-orange-base hover:bg-brand-orange-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Salvando...
                    </>
                  ) : (
                    "Salvar e publicar"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </form>
  );
};
