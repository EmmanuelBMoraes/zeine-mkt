import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  User,
  Phone,
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  ImageUp,
} from "lucide-react";
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
} from "../ui/form";
import { MaskedInput } from "../shared/MaskedInput";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "O nome deve ter pelo menos 3 caracteres." }),
    telefone: z
      .string()
      .min(15, { message: "Por favor, insira um telefone válido." }),
    email: z.string().email({ message: "Por favor, insira um e-mail válido." }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter no mínimo 6 caracteres." }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      telefone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { isSubmitting } = form.formState;

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      toast.success("Conta criada com sucesso!");
      navigate("/products");
    } catch (err) {
      toast.error(
        "Não foi possível criar a conta. O e-mail pode já estar em uso."
      );
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-8 text-left">
        <h2 className="font-title text-title-lg text-gray-800">
          Crie sua conta
        </h2>
        <p className="text-body-md text-gray-500 mt-2">
          Informe os seus dados pessoais e de acesso
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Perfil</h3>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-100/80">
                <ImageUp className="h-8 w-8 text-gray-400" />
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-label-md uppercase tracking-wider text-gray-500">
                      NOME
                    </FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <User
                          className="absolute left-0 text-gray-400"
                          size={20}
                        />
                        <Input
                          placeholder="Seu nome completo"
                          className="peer pl-8"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <div className="min-h-[20px]">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-md uppercase tracking-wider text-gray-500">
                    TELEFONE
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Phone
                        className="absolute left-0 text-gray-400"
                        size={20}
                      />
                      <MaskedInput
                        field={field}
                        mask="(00) 00000-0000"
                        placeholder="(00) 00000-0000"
                        className="peer pl-8"
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-700">Acesso</h3>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-md uppercase tracking-wider text-gray-500">
                    E-MAIL
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Mail
                        className="absolute left-0 text-gray-400"
                        size={20}
                      />
                      <Input
                        type="email"
                        placeholder="Seu e-mail de acesso"
                        className="peer pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-md uppercase tracking-wider text-gray-500">
                    SENHA
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Lock
                        className="absolute left-0 text-gray-400"
                        size={20}
                      />
                      <Input
                        type="password"
                        placeholder="Senha de acesso"
                        className="peer pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-label-md uppercase tracking-wider text-gray-500">
                    CONFIRMAR SENHA
                  </FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Lock
                        className="absolute left-0 text-gray-400"
                        size={20}
                      />
                      <Input
                        type="password"
                        placeholder="Confirme a senha"
                        className="peer pl-8"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <div className="min-h-[20px]">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-brand-orange-base hover:bg-brand-orange-dark text-white font-bold text-action-md rounded-lg flex justify-between items-center px-6"
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" />
            ) : (
              <span>Cadastrar</span>
            )}
            <ArrowRight size={20} />
          </Button>
        </form>
      </Form>

      <div className="text-center mt-4">
        <p className="text-body-md text-gray-500 mb-4">Já tem uma conta?</p>
        <Button
          variant="outline"
          onClick={() => navigate("/login")}
          className="w-full h-12 font-bold text-brand-orange-base border-brand-orange-base hover:bg-orange-50 hover:text-brand-orange-dark rounded-lg flex justify-between items-center px-6"
        >
          <span>Acessar</span>
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};
