import { Product } from "@/types/types";
import { BarChartBigIcon, Filter, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "@/store/productStore";

import {
  AddProductDialog,
  Button,
  DemandForecastDialog,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
} from "@/components/ui";

interface TableHeaderProps {
  variant: "product" | "pricing";
  title: string;
  // setSearchQuery: (value: string) => void;
  // onCategoryChange: (value: string) => void;
  // onFilter: () => void;
  selectedProducts: Product[];
  onToggleDemandColumn: () => void;
  isDemandColumnVisible: boolean;
}

export default function TableHeader({
  variant,
  title,
  selectedProducts,
  onToggleDemandColumn,
  isDemandColumnVisible,
}: TableHeaderProps) {

  const {fetchProducts} = useProductStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isDemandForecastOpen, setIsDemandForecastOpen] = useState(false);

  const handleDataFilter = () => {
    console.log("Filtering data...");
    console.log(`Search Query: ${searchQuery}, Category: ${selectedCategory}`);
    fetchProducts(searchQuery, selectedCategory);
  };
  const navigate = useNavigate();

  useEffect(() => {
    console.log("TableHeader mounted");
    return () => {
      console.log("TableHeader unmounted");
      // Cleanup on unmount
      setSearchQuery("");
      setSelectedCategory("all");
    };
  }, []);

  return (
    <div className="w-full bg-black px-6 py-4 overflow-x-auto text-xs flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          size="sm"
          className="flex items-center text-[#01e0b4] cursor-pointer"
        >
          {"<<"} Back
        </Button>

        <div className="border-l border-gray-600 h-5" />

        <h2 className=" text-base font-semibold whitespace-nowrap">{title}</h2>
      </div>

      {/* Middle Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <Switch
            id="forecast-toggle"
            checked={isDemandColumnVisible}
            onCheckedChange={onToggleDemandColumn}
          />
          <label htmlFor="forecast-toggle" className="text-xs">
            With Demand Forecast
          </label>
        </div>
        <div className="border-l border-gray-600 h-5" />

        {/* Search Input */}
        <div className="flex gap-2 border border-[#01e0b4] rounded-md px-2 items-center">
          {/* <Search className="text-[#01e0b4] hover:text-white"/>  */}
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 text-[#01e0b4] hover:bg-white"
            onClick={() => handleDataFilter()}
          >
            <Search />
          </Button>
          <Input
            placeholder="Search"
            className="w-[180px] text-xs h-8 bg-transparent border-none  placeholder:text-gray-400"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Select */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Category :</span>
          <Select
            value="all"
            onValueChange={(value) => setSelectedCategory(value)}
          >
            <SelectTrigger className="w-[160px] h-8 bg-transparent  border-[#01e0b4]">
              <SelectValue placeholder="Stationary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="stationary">Stationary</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="furniture">Furniture</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="sm"
          className="ml-4 h-9 border-[#01e0b4] text-xs px-4"
          onClick={() => handleDataFilter()}
        >
          <Filter className="w-2 h-2" />
          Filter
        </Button>
      </div>

      {/* Left Section */}
      {variant == "product" && (
        <>
          <div className="border-l border-gray-600 h-5" />
          <div className="flex items-center gap-2 text-black">
            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-[#01e0b4] text-xs"
              onClick={() => setIsAddProductOpen(true)}
            >
              <Plus className="w-2 h-2" />
              Add New Product
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="h-9 bg-[#01e0b4] text-xs"
              onClick={() => {
                if (selectedProducts.length === 0) {
                  alert(
                    "Please select at least one product to view demand forecast"
                  );
                  return;
                }
                setIsDemandForecastOpen(true);
              }}
            >
              <BarChartBigIcon className="w-2 h-2" />
              Demand Forcast
            </Button>
          </div>
        </>
      )}

      {/* Add Product Dialog */}
      <AddProductDialog
        open={isAddProductOpen}
        onOpenChange={setIsAddProductOpen}
      />

      <DemandForecastDialog
        open={isDemandForecastOpen}
        onOpenChange={setIsDemandForecastOpen}
        selectedProducts={selectedProducts}
      />
    </div>
  );
}
