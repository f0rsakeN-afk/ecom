import React, { useEffect, useState } from "react";
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
import { useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }
  return queryParams.join("&");
}

const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.shopProducts);

  //console.log(productList);

  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSort(value) {
    setSort(value);
    //console.log(value);
  }

  function handleFilters(getSectionId, getCurrentOptions) {
    //console.log(getSectionId, getCurrentOptions);
    let copyFilters = { ...filters };
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [getSectionId]: [getCurrentOptions] };
    } else {
      const indexOfCurrentOptions =
        copyFilters[getSectionId].indexOf(getCurrentOptions);
      if (indexOfCurrentOptions === -1) {
        copyFilters[getSectionId].push(getCurrentOptions);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOptions, 1);
      }
    }
    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  }

  //console.log(filters);
  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex  items-center justify-between">
          <h2 className="text-lg font-extrabold ">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList?.length} Products
            </span>
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
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((el) => (
                    <DropdownMenuRadioItem value={el.id} key={el.id}>
                      {el.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
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
