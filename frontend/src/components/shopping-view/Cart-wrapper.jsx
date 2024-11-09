import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

const UserCartWrapper = () => {
  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4"></div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="font-bold">Total</span>
          <span className="font-bold">$100</span>
        </div>
      </div>
      <Button className="w-full mt-6">Checkout</Button>
    </SheetContent>
  );
};

export default UserCartWrapper;
