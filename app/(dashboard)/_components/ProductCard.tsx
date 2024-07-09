"use client";

import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/commonComponents/table";

import { PlusIcon } from "lucide-react";
import DraggableRow from "@/app/(dashboard)/_components/table/DraggableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  addRow,
  removeRow,
  removeVariant,
  setTableData,
} from "@/app/redux/reducers/products";
import { DndContext, closestCorners } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import toast from "react-hot-toast";

const ProductCard: React.FC = () => {
  const data = useSelector((state: any) => state.product);
  const dispatch = useDispatch();

  function handleAddNewProduct() {
    toast.success("State added");
    // console.log("ihihi");
    dispatch(addRow());
  }

  function handleDeleteVariant(index: number) {
    setDropdownVisible(null);
    setDropdownOpen(null);
    dispatch(removeVariant({ arrayIndex: index }));
    toast.success("Variant removed");
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    // console.log(active, over);

    const tableData = data.filter((_: any, i: number) => i === active.id - 1);

    if (active.id - 1 !== over.id - 1) {
      dispatch(removeRow({ arrayIndex: active.id - 1 }));

      dispatch(setTableData({ insertAtIndex: over.id - 1, row: tableData[0] }));
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleDropdown = (index: number) => {
    if (dropdownOpen === index) {
      setDropdownVisible(null);
      setTimeout(() => setDropdownOpen(null), 200); // Match this timeout to the transition duration
    } else {
      setDropdownOpen(index);
      setDropdownVisible(index);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownOpen !== null &&
        dropdownRefs.current[dropdownOpen] &&
        !dropdownRefs.current[dropdownOpen]!.contains(event.target as Node)
      ) {
        setDropdownVisible(null);
        setTimeout(() => setDropdownOpen(null), 200); // Match this timeout to the transition duration
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="w-full p-5  bg-white">
      <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <SortableContext
          items={data.map((_: any, index: number) => index + 1)}
          strategy={verticalListSortingStrategy}
        >
          <Table className="h-full border rounded-2xl bg-gray-50">
            <TableHeader className="">
              <TableRow className="">
                <TableHead className="md:sticky md:z-40 md:left-0 bg-gray-50"></TableHead>
                <TableHead className="text-center md:sticky md:z-40 md:left-16  bg-gray-50 ">
                  Product Filter
                </TableHead>
                {data[0].products.map((_row: [], index: number) => {
                  return (
                    <TableHead className="text-center w-full" key={index + 1}>
                      <div className="flex w-full jusitify-between relative">
                        <p className="w-full"> Variant {index + 1}</p>
                        <div ref={(el) => (dropdownRefs.current[index] = el)}>
                          <button
                            id="dropdownMenuIconButton"
                            onClick={() => toggleDropdown(index)}
                            className="inline-flex shadow-lg items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-300 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button"
                          >
                            <svg
                              className="w-4 h-4"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 4 15"
                            >
                              <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                          </button>

                          {dropdownOpen === index && (
                            <div
                              id="dropdownDots"
                              className="absolute top-full animate-out mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-30 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <button
                                onClick={() => handleDeleteVariant(index)}
                                className="block px-4 py-2.5 w-24 text-left hover:bg-red-700 dark:hover:bg-gray-600 hover:text-white rounded"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>

            <TableBody className="">
              {data.map((row: [], index: number) => (
                <DraggableRow rowData={row} index={index} key={index} />
              ))}

              <TableRow>
                <TableCell className="sticky z-40 left-0">
                  <button
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    onClick={handleAddNewProduct}
                  >
                    <PlusIcon />
                  </button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ProductCard;
