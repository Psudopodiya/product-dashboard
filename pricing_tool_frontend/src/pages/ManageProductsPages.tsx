import Table from "@/components/table/Table";
// import { useProductStore } from "@/store/productStore";
// import { useEffect } from "react";

const ManageProductsPages = () => {
  // const { products, loading, error, fetchProducts } = useProductStore();

  // useEffect(() => {
  //   fetchProducts();
  // }, [fetchProducts]);

  // if (loading) return <div>Loading products...</div>;
  // if (error) return <div>Error: {error}</div>;
  return (
    <Table
      // products_data={products}
      tableHeader="Create and Manage Product"
      variant="product"
    />
  );
};

export default ManageProductsPages;
