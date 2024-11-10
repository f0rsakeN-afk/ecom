import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem } from "@/store/cart/cartSlice";

const UserCartItemsContent = ({ item }) => {
  //console.log(item);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  //console.log(user);
  function handleCartItemDelete(getCartItem) {
    dispatch(
      deleteCartItem({ userId: user?.id, productId: getCartItem?.productId })
    );
  }
  return (
    <div className="flex items-center space-x-4">
      <img
        src={item?.image}
        alt="product-image"
        className="w-20 h-20 rounded object-cover"
      />
      <div className="flex-1">
        <h3 className="font-extrabold">{item?.title}</h3>
        <div className="flex gap-2 items-center mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Minus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
          <span className="font-semibold">{item?.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
          >
            <Plus className="w-4 h-4" />
            <span className="sr-only">Decrease</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(item?.salePrice > 0
            ? item?.salePrice
            : item?.price * item?.quantity
          ).toFixed(2)}
        </p>
        <Button onClick={() => handleCartItemDelete(item)}>
          <Trash className="cursor-pointer mt-1 " size={20} />
        </Button>
      </div>
    </div>
  );
};

export default UserCartItemsContent;
