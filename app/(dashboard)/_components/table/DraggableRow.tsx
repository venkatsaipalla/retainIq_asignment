import { TableCell, TableRow } from "@/app/components/commonComponents/table";
import FilterCard from "@/app/components/filterCard";
import ProductImage from "@/app/components/productImage";
import SerialNumber from "@/app/components/serialNumber";
import { PlusIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { addVariant, setTableData } from "@/app/redux/reducers/products";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import toast from "react-hot-toast";

interface Product {
  productImage: string;
  productLabel: string;
}

interface DraggableRowProps {
  rowData: any;
  index: number;
}

const DraggableRow: React.FC<DraggableRowProps> = ({ rowData, index }) => {
  const dipatch = useDispatch();

  function createVariant() {
    dipatch(addVariant());
    toast.success("Variant added");
  }

  const { setNodeRef, transform } = useSortable({
    id: index + 1,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  // console.log(rowData);

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 border-b-0 group "
      key={index}
    >
      <TableCell className="group relative md:sticky md:z-40 md:left-0 bg-gray-50 ">
        <SerialNumber index={index} />
      </TableCell>
      <TableCell className="md:sticky md:z-40 md:left-16 bg-gray-50">
        <FilterCard rowData={rowData} index={index} />
      </TableCell>
      {rowData.products.map((row: any, variantId: number) => (
        <TableCell key={variantId} className="text-center ">
          <ProductImage {...row} productId={index} variantId={variantId} />
        </TableCell>
      ))}

      <TableCell className="md:sticky md:z-40 md:left-0">
        <button className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-1.5 py-1.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
          <PlusIcon onClick={createVariant} />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default DraggableRow;
