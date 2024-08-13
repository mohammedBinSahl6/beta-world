import React from "react";

interface Props {
  open: boolean;
  onChange: () => void;
}
const MenuIcon = ({ onChange, open }: Props) => {
  return (
    <label className="flex flex-col gap-2 w-8 cursor-pointer" role="button">
      <input
        className="peer hidden"
        type="checkbox"
        checked={open}
        onChange={onChange}
      />
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 peer-checked:rotate-[225deg] origin-right peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px]"></div>
      <div className="rounded-2xl h-[3px] w-full bg-white duration-500 peer-checked:-rotate-45"></div>
      <div className="rounded-2xl h-[3px] w-1/2 bg-white duration-500 place-self-end peer-checked:rotate-[225deg] origin-left peer-checked:translate-x-[12px] peer-checked:translate-y-[1px]"></div>
    </label>
  );
};

export default MenuIcon;
