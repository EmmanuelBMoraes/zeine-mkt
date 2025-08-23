import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login({ email, password });
      navigate("/products");
    } catch (err) {
      setError("E-mail ou senha inválidos. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="mb-10 text-left">
        <h2 className="text-3xl font-bold text-gray-800">Acesse sua conta</h2>
        <p className="text-gray-500 mt-2">
          Informe seu e-mail e senha para entrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-xs font-semibold text-gray-500 tracking-wider"
          >
            E-MAIL
          </Label>
          <div className="relative flex items-center">
            <Mail className="absolute left-3 text-gray-400" size={20} />
            <Input
              id="email"
              type="email"
              placeholder="Seu e-mail cadastrado"
              className="pl-10 h-12 text-base bg-transparent border-0 border-b-2 border-gray-200 rounded-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brand-orange-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-xs font-semibold text-gray-500 tracking-wider"
          >
            SENHA
          </Label>
          <div className="relative flex items-center">
            <Lock className="absolute left-3 text-gray-400" size={20} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha de acesso"
              className="pl-10 h-12 text-base bg-transparent border-0 border-b-2 border-gray-200 rounded-none transition-colors focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-brand-orange-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-400 hover:text-gray-600"
              aria-label="Mostrar ou esconder senha"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-brand-orange-base hover:bg-brand-orange-dark text-white font-bold text-base rounded-lg flex justify-between items-center px-6 shadow-lg shadow-orange-500/30"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Acessar</span>
          )}
          <ArrowRight size={20} />
        </Button>
      </form>

      <div className="text-center mt-12">
        <p className="text-gray-500 mb-4">Ainda não tem uma conta?</p>
        <Button
          variant="outline"
          onClick={() => navigate("/register")}
          className="w-full h-12 font-bold text-brand-orange-base border-brand-orange-base hover:bg-orange-50 hover:text-brand-orange-dark rounded-lg flex justify-between items-center px-6"
        >
          <span>Cadastrar</span>
          <ArrowRight size={20} />
        </Button>
      </div>
    </div>
  );
};
