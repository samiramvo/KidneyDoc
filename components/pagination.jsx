"use client";
import "@/styles/globals.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const Pagination = ({ count, ITEM_PER_PAGE }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = searchParams.get("page") || 1;

  const params = new URLSearchParams(searchParams);

  const hasPrev = ITEM_PER_PAGE * (parseInt(page) - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (parseInt(page) - 1) + ITEM_PER_PAGE < count;
  const totalPagesCeil = Math.ceil(count / ITEM_PER_PAGE);

  const handleChangePage = (type) => {
    type === "prev"
      ? params.set("page", parseInt(page) - 1)
      : params.set("page", parseInt(page) + 1);
    replace(`${pathname}?${params}`);
  };
  return (
    <div className="containerpagination">
      <button
        className="buttonpagination text-[13px]"
        disabled={!hasPrev}
        onClick={() => handleChangePage("prev")}
      >
        Previous
      </button>
      <div className="text-center text-base text-[#605BFF]">
        Page {page} sur {totalPagesCeil}
      </div>
      <button
        className="buttonpagination text-[13px]"
        disabled={!hasNext}
        onClick={() => handleChangePage("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
