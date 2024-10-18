import React, { useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {

  const inputRef=useRef(null)


  const handleImageFileChange(e){
    console.log(e.target.files)

  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div className="">
        <Input id="image-upload" type="file"  ref={inputRef} onChange={handleImageFileChange} />
      </div>
    </div>
  );
};

export default ProductImageUpload;
