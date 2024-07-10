import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/app/components/commonComponents/dialog";
import { Plus, X } from "lucide-react";
import { addFilters, updateData } from "@/app/redux/reducers/productReducer";
import { close } from "@/app/redux/reducers/filterCardOpen";

const FilterCard = () => {
  const isOpen = useSelector((state: any) => state.filter);
  const selectProduct = useSelector((state: any) => state.select);
  const dispatch = useDispatch();

  const [filterValue, setFilterValue] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const handleInsertVariant = ({ productImage, productLabel }: any) => {
    dispatch(
      updateData({
        index: selectProduct.productId,
        itemIndex: selectProduct.variantId,
        productImage,
        productLabel,
      })
    );
    dispatch(close());
    toast.success("Variant template updated");
  };

  const handleAddFilter = () => {
    if (filter) {
      setFilterValue([...filterValue, filter]);
      setFilter("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSaveChanges = () => {
    dispatch(addFilters({ filterData: filterValue, index: selectProduct }));
    dispatch(close());
    setFilterValue([]);
  };

  const handleCloseDialog = () => {
    dispatch(close());
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseDialog}>
      <DialogTrigger asChild />
      <DialogContent className="sm:max-w-[425px] z-[90]">
        <DialogHeader>
          <DialogTitle>Add filters</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <input
              id="name"
              className="col-span-3 p-2 rounded-md text-sm border-slate-500	border"
              value={filter}
              onChange={handleInputChange}
            />
            <Plus
              onClick={handleAddFilter}
              className="cursor-pointer hover:bg-gray-100 p-1"
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {filterValue.map((value, index) => (
              <div
                className="bg-gray-50 p-2 rounded shadow relative"
                key={index}
              >
                <p className="pr-5">{value}</p>
                <X
                  className="absolute top-1 right-1 cursor-pointer"
                  width={15}
                  onClick={() =>
                    setFilterValue(filterValue.filter((_, i) => i !== index))
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <button
            className="text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            type="button"
            onClick={handleSaveChanges}
          >
            Save changes
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterCard;
