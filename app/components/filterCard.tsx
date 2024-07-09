import { open } from "@/app/redux/reducers/filterCardOpen";
import { setProductId } from "@/app/redux/reducers/selectProduct";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface FilterCardProps {
  rowData: any;
  index: number;
}

const FilterCard: React.FC<FilterCardProps> = ({ rowData, index }) => {
  // console.log(rowData, "rowldatarowdata");
  const dispatch = useDispatch();

  return (
    <div className="flex flex-wrap w-72 gap-2 justify-center">
      {rowData.productFilter.length === 0 ? (
        <div className="flex flex-col h-52 justify-center items-center gap-2 w-52">
          <div
            className="relative group items-center flex gap-2 shadow p-2 rounded cursor-pointer"
            onClick={() => {
              dispatch(setProductId(index));
              dispatch(open());
            }}
          >
            <Plus />
            Add Product Filters
          </div>
        </div>
      ) : (
        rowData.productFilter.map((item: any, index: number) => (
          <div
            key={index}
            className={cn(
              "p-2 shadow rounded",
              index % 2 !== 0 ? "bg-green-200" : ""
            )}
          >
            {item}
          </div>
        ))
      )}
    </div>
  );
};

export default FilterCard;
