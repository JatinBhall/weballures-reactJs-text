"use client"

import { useState } from "react"
import Item from "./components/item";

const Page = () => {

  const [myItems, setMyItems] = useState<string[]>([]);
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const myItemsComponent: Array<React.ReactNode> = [];
  const purchasedItemsComponent: Array<React.ReactNode> = [];

  myItems.map((item: string) => {
    myItemsComponent.push(<Item key={item} text={item} type={"myItem"} handleDeleteItem={handleDeleteItem} handleCheckButtonClick={handleCheckButtonClick} />)
  });
  purchasedItems.map((item: string) => {
    purchasedItemsComponent.push(<Item key={item} text={item} type={"purchased"} handleDeleteItem={handleDeleteItem} handleCheckButtonClick={handleCheckButtonClick} />)
  });

  const handleNewItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (newItem == "") {
      return;
    }
    if (myItems.includes(newItem.toLowerCase())) {
      return;
    } else {
      setMyItems([newItem.toLowerCase(), ...myItems]);
      setNewItem("");
    }
  }

  function handleDeleteItem(item: string, type: "myItem" | "purchased") {
    if (type == "myItem") {
      const index = myItems.findIndex((x) => x == item);
      myItems.splice(index, 1)
      if (index < 0) {
        return;
      }
      setMyItems([...myItems])
    } else {
      const index = purchasedItems.findIndex((x) => x == item);
      purchasedItems.splice(index, 1)
      if (index < 0) {
        return;
      }
      setPurchasedItems([...purchasedItems])
    }
  }

  function handleCheckButtonClick(item: string, type: "myItem" | "purchased", checked: boolean) {
    if (type == "myItem" && checked) {
      const index = myItems.findIndex((x) => x == item);
      myItems.splice(index, 1)
      setMyItems([...myItems])
      setPurchasedItems([item, ...purchasedItems])
    } else if (type == "purchased" && !checked) {
      const index = purchasedItems.findIndex((x) => x == item);
      purchasedItems.splice(index, 1)
      setPurchasedItems([...purchasedItems])
      setMyItems([item, ...myItems])
    }
  }

  return (
    <main className="flex flex-col justify-center items-center gap-4 rounded-xl shadow-2xl max-w-[600px] mx-auto my-10 py-12 px-16">
      <div className="text-2xl font-medium text-[#0080ff] ">Grocery List</div>

      {/* input/ add items */}
      <div className="w-full flex gap-2">
        <input className="grow focus:outline-none border-2 border-[#d9d9d9] rounded-md px-2 py-1"
          type="text"
          placeholder="Add an item..."
          value={newItem}
          onChange={handleNewItemChange} />
        <button onClick={handleAddButtonClick} className="min-w-[100px] bg-[#08a12c] py-1 px-2 text-white cursor-pointer font-semibold rounded-md">Add</button>
      </div>

      {/* show items */}

      <div className="w-full flex flex-col">
        <div className="w-full text-[#003e96] font-semibold text-lg rounded-md bg-[#006aff1d] border-b-4 border-[#006affc1] px-2 py-1">My Items</div>
        <div className="mt-2">{myItemsComponent}</div>
      </div>

      {/* show Purchased items */}
      <div className="w-full flex flex-col">
        <div className="w-full text-[#4d4d4d] font-semibold text-lg rounded-md bg-[#acacac1d] border-b-4 border-[#c7c7c7c1] px-2 py-1">Purchased</div>
        <div>{purchasedItemsComponent}</div>
      </div>

    </main>
  )
}

export default Page