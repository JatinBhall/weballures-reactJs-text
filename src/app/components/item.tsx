import Image from "next/image";

const Item = ({
  text,
  handleDeleteItem,
  handleCheckButtonClick,
  type
}: {
  text: string;
  handleDeleteItem: (item: string, type: "myItem" | "purchased") => void;
  handleCheckButtonClick: (item: string, type: "myItem" | "purchased", checked: boolean) => void;
  type: "myItem" | "purchased";
}) => {
  return (
    <div className="flex gap-2 justify-center items-center border-b border-[#f1f1f1c9] px-2 py-2">
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCheckButtonClick(text, type, e.target.checked)}
        type="checkbox"
        defaultChecked={type == "purchased"} />
      <p className="grow">
        {text}
      </p>
      <button className="cursor-pointer" onClick={() => { handleDeleteItem(text, type) }}>
        <Image height={20} width={20} src={"/images/delete.png"} alt="delete icon" />
      </button>
    </div>
  )
}

export default Item