import React, { useEffect } from "react";
import ProductFilter from "@/components/shopping-view/Filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFilteredProducts } from "@/store/shop/productSlice";
import ShoppingProductTile from "@/components/shopping-view/ProductTiles";

const ShoppingListing = () => {
  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.shopProducts);

  console.log(productList);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">10 Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="h-4 w-4" />
                  <span className="">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent alien="end" className="w-[200px]">
                <DropdownMenuRadioGroup>
                  {sortOptions.map((el) => (
                    <DropdownMenuRadioItem key={el.id}>
                      {el.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList?.map((products) => (
                <ShoppingProductTile product={products} key={products._id} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
