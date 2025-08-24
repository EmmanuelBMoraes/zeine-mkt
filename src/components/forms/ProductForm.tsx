import { useState, useRef, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Loader2 } from "lucide-react";
import upload from "../../assets/icon/image-upload.svg";
import { createProduct, uploadImage } from "../../api/productService";
import type { ProdutoPayload } from "../../types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { CurrencyInput } from "../shared/CurrencyInput";

// 1. Definir o schema de validação com Zod
const formSchema = z.object({
  titulo: z.string().min(3, { message: "O título é obrigatório." }),
  valor: z.string().min(1, { message: "O valor é obrigatório." }),
  descricao: z
    .string()
    .min(10, { message: "A descrição deve ter pelo menos 10 caracteres." })
    .max(500, { message: "A descrição deve ter no máximo 500 caracteres." }),
  categoria: z
    .string()
    .min(1, { message: "Por favor, selecione uma categoria." }),
});

interface IImageUploadProps {
  imagePreview: string | null;
  onImageSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  hasError: boolean; // 1. Adicionar prop para o estado de erro
}

const ImageUpload = ({
  imagePreview,
  onImageSelect,
  disabled,
  hasError, // 2. Usar a prop
}: IImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleCardClick = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={onImageSelect}
        className="hidden"
        accept="image/*"
        disabled={disabled}
      />
      <Card
        onClick={handleCardClick}
        // 3. Aplicar estilos de erro condicionalmente
        className={`flex flex-col bg-base-shape items-center justify-center border-2 border-dashed h-full min-h-[300px] transition-colors ${
          hasError ? "border-danger" : "border-gray-300"
        } ${
          !disabled
            ? "cursor-pointer hover:border-brand-orange-base"
            : "cursor-not-allowed bg-gray-100"
        }`}
      >
        <CardContent className="text-center p-4 flex flex-col justify-center items-center h-full">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Pré-visualização"
              className="max-h-full max-w-full object-contain rounded-md"
            />
          ) : (
            <>
              <img
                src={upload}
                className={`mx-auto h-12 w-12 ${
                  hasError ? "text-danger" : "text-gray-400"
                }`}
              />
              <p
                className={`mt-4 text-sm font-semibold ${
                  hasError ? "text-danger" : "text-gray-600"
                }`}
              >
                Selecione a imagem
              </p>
            </>
          )}
        </CardContent>
      </Card>
      {/* 4. Mostrar a mensagem de erro */}
      {hasError && (
        <p className="text-sm text-red-500 mt-2 text-center ">
          A imagem é obrigatória.
        </p>
      )}
    </>
  );
};

export const ProductForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageError, setImageError] = useState(false); // 5. Estado para controlar o erro da imagem

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      valor: "",
      descricao: "",
      categoria: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setImageError(false); // 6. Limpa o erro quando uma imagem é selecionada
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!imageFile) {
      setImageError(true); // 7. Define o erro se nenhuma imagem for selecionada
      toast.error("Por favor, selecione uma imagem para o produto.");
      return;
    }

    try {
      const imageResponse = await uploadImage(imageFile);
      const { imageUrl } = imageResponse;

      const productPayload: ProdutoPayload = {
        ...values,
        preco: parseFloat(values.valor),
        status: "ativo",
        imagemUrl: imageUrl,
      };

      await createProduct(productPayload);
      toast.success("Produto cadastrado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    } catch (error) {
      toast.error("Falha ao cadastrar o produto. Tente novamente.");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="grid gap-8 lg:grid-cols-3 items-start"
      >
        <div className="lg:col-span-1">
          <ImageUpload
            imagePreview={imagePreview}
            onImageSelect={handleImageChange}
            disabled={isSubmitting}
            hasError={imageError}
          />
        </div>
        <div className="lg:col-span-2">
          <Card className="shadow-sm">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold mb-6">Dados do produto</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="titulo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>TÍTULO</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome do produto" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="valor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VALOR</FormLabel>
                        <FormControl>
                          <CurrencyInput field={field} placeholder="R$ 0,00" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="descricao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DESCRIÇÃO</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Escreva detalhes sobre o produto..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CATEGORIA</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="moveis">Móveis</SelectItem>
                          <SelectItem value="vestuario">Vestuário</SelectItem>
                          <SelectItem value="brinquedos">Brinquedos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end gap-4 pt-4">
                  <Button
                    variant="outline"
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => navigate("/products")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand-orange-base hover:bg-brand-orange-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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
    </Form>
  );
};
