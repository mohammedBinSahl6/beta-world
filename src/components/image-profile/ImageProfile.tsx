"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const ImageProfile = () => {
  const [image, setImage] = useState("");
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="flex flex-col gap-10 items-center">
      <span onClick={() => setShowInput(true)}>
        <Image
          src={image || "/user-grey.png"}
          alt="User Profile"
          width={90}
          height={90}
          className="hover:scale-110 transition-transform cursor-pointer"
        />
      </span>
      {showInput && (
        <div className="flex flex-col gap-4">
          <Input
            type="text"
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />
          <Button variant="default" onClick={() => setShowInput(false)}>
            Upload
          </Button>
          <Button variant="secondary" onClick={() => setShowInput(false)}>
            cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageProfile;
