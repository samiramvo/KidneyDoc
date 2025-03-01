// "use client";
// import "@/styles/globals.css";
// import { usePathname, useRouter, useSearchParams } from "next/navigation";
// const Pagination = ({ count, ITEM_PER_PAGE }) => {
//   const searchParams = useSearchParams();
//   const { replace } = useRouter();
//   const pathname = usePathname();

//   const page = searchParams.get("page") || 1;

//   const params = new URLSearchParams(searchParams);

//   const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
//   const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
//   const totalPagesCeil = Math.ceil(count / ITEM_PER_PAGE);

//   const handleChangePage = (type) => {
//     type === "prev"
//       ? params.set("page", parseInt(page) - 1)
//       : params.set("page", parseInt(page) + 1);
//     replace(`${pathname}?${params}`);
//   };
//   return (
//     <div className="containerpagination">
//       <button
//         className="buttonpagination text-[13px]"
//         disabled={!hasPrev}
//         onClick={() => handleChangePage("prev")}
//       >
//         Previous
//       </button>
//       <div className="text-center text-base text-[#605BFF]">
//         Page {page} sur {totalPagesCeil}
//       </div>
//       <button
//         className="buttonpagination text-[13px]"
//         disabled={!hasNext}
//         onClick={() => handleChangePage("next")}
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Pagination;
"use client";
import "@/styles/globals.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count, ITEM_PER_PAGE }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = page > 1;
  const hasNext = page < Math.ceil(count / ITEM_PER_PAGE);

  const handleChangePage = (newPage) => {
    params.set("page", newPage);
    replace(`${pathname}?${params}`);
  };

  return (
    <div className="flex items-center justify-center mt-4 space-x-4">
      <button
        className={`${
          hasPrev ? "bg-violettitle dark:bg-darkbackground" : "bg-gray-300 cursor-not-allowed dark:bg-darkgris"
        } text-white rounded-full w-8 h-8 flex items-center justify-center text-lg`}
        onClick={() => hasPrev && handleChangePage(page - 1)}
        disabled={!hasPrev}
      >
        &#8592;
      </button>
      <div className="text-center text-base text-textSecondary">
        Page {page} sur {Math.ceil(count / ITEM_PER_PAGE)}
      </div>
      <button
        className={`${
          hasNext ? "bg-violettitle dark:bg-darkbackground" : "bg-gray-300 cursor-not-allowed dark:bg-darkgris"
        } text-white rounded-full w-8 h-8 flex items-center justify-center text-lg`}
        onClick={() => hasNext && handleChangePage(page + 1)}
        disabled={!hasNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default Pagination;
