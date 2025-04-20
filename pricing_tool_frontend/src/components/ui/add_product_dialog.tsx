import { useProduct } from "@/hooks/useProduct";
import { CreateProduct } from "@/types/types";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "./";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddProductDialog({
  open,
  onOpenChange,
}: AddProductDialogProps) {
  const { addProduct } = useProduct();
  const form = useForm<CreateProduct>({
    defaultValues: {
      name: "",
      category: "",
      cost_price: "",
      selling_price: "",
      description: "",
      stock_available: 0,
      units_sold: 0,
      customer_rating: 0,
      demand_forecast: 0,
      optimized_price: "0",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (data: CreateProduct) => {
    const productData: Omit<CreateProduct, "id"> = {
      name: data.name,
      category: data.category,
      cost_price: data.cost_price,
      selling_price: data.selling_price,
      description: data.description,
      stock_available: data.stock_available,
      units_sold: data.units_sold,
      customer_rating: data.customer_rating,
      demand_forecast: data.demand_forecast,
      optimized_price: data.optimized_price,
    };

    const success = await addProduct(productData);
    if (success) {
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-black border-none text-white">
        <DialogHeader className="border-b border-gray-500 pb-4">
          <DialogTitle className="text-[#01e0b4] text-xl flex justify-between items-center">
            Add New Product
            <button
              onClick={() => onOpenChange(false)}
              className="text-[#01e0b4] focus:outline-none"
            >
              <X size={18} />
            </button>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      className="bg-transparent border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-transparent border-gray-700">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-gray-700 border-[#01e0b4]">
                      <SelectItem value="stationary">Stationary</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cost_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Cost Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter cost price"
                        {...field}
                        className="bg-transparent border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="selling_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Selling Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="Enter selling price"
                        {...field}
                        className="bg-transparent border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter description"
                      {...field}
                      className="bg-transparent border-gray-700"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock_available"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">
                      Available Stock
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Enter available stock"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow positive integers
                          if (
                            value === "" ||
                            (/^\d+$/.test(value) && Number.parseInt(value) >= 0)
                          ) {
                            field.onChange(value);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="units_sold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Units Sold</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min="0"
                        step="1"
                        placeholder="Enter units sold"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Only allow positive integers
                          if (
                            value === "" ||
                            (/^\d+$/.test(value) && Number.parseInt(value) >= 0)
                          ) {
                            field.onChange(value);
                          }
                        }}
                        className="bg-transparent border-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-[#01e0b4] text-white hover:bg-[#01e0b4]/10"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#01e0b4] text-black hover:bg-[#01e0b4]/80"
              >
                {isSubmitting ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
