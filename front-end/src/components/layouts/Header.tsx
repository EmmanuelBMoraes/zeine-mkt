import { Link, useLocation, useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import packageIcon from "../../assets/icon/package.svg";
import dashboardIcon from "../../assets/icon/chart-histogram.svg";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { useAuth } from "../../contexts/AuthContext";
import { cn } from "../../lib/utils";
import logo from "../../assets/Logo-1.svg";
import { useState, useRef } from "react";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSecretTooltip, setShowSecretTooltip] = useState(false);
  const tooltipTimeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    tooltipTimeoutRef.current = window.setTimeout(() => {
      setShowSecretTooltip(true);
    }, 7000);
  };

  const handleMouseLeave = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setShowSecretTooltip(false);
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: dashboardIcon },
    { href: "/products", label: "Produtos", icon: packageIcon },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b px-6">
      <div className="flex items-center">
        <Link to="/products" className="flex items-center gap-2">
          <img src={logo} alt="Marketplace Logo" className="h-8 w-8" />
        </Link>
      </div>

      <div className="flex-1 flex justify-center">
        <nav className="hidden items-center gap-2 rounded-lg bg-gray-100/80 p-1 md:flex">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-white text-brand-orange-base shadow-sm"
                    : "text-gray-500 hover:bg-gray-200/50 hover:text-gray-900"
                )}
              >
                <img src={link.icon} alt="" className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-4 relative">
        <TooltipProvider>
          <Tooltip open={showSecretTooltip} delayDuration={0}>
            <TooltipTrigger asChild>
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  asChild
                  className="bg-brand-orange-base hover:bg-brand-orange-dark shadow-sm absolute right-16 top-0"
                >
                  <Link to="/products/new">
                    <Plus className="mr-2 h-4 w-4" /> Novo produto
                  </Link>
                </Button>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Tá esperando o quê? Boraa moeer!! 🚀</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
