import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { useAuthStore } from "@/store/authStore";
import { LogOut } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";

function Navbar() {
  const { user, logout } = useAuthStore();

  return (
    <div className="flex py-4 px-8 justify-between">
      <h3 className="text-3xl">Price Optimization Tool</h3>
      <div className="flex gap-3 items-center">
        <div className="flex gap-1">
          Welcome,
          <span className="text-[#01e0b4]">{user?.username}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="relative h-10 w-10 overflow-hidden border rounded-full bg-white">
              <FaRegUser className="text-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={logout}
              className="cursor-pointer hover:bg-[#d9c8a0]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default Navbar;
