import { useState, useMemo } from "react";
import Pagination from "../../../utils/pagination/Pagination";

const List = (props) => {
  const PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return props.categories.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, props.categories]);

  return (
    <>
      <table className="table table-report -mt-2">
        <thead>
          <tr>
            <th className="whitespace-nowrap capitalize ">Ảnh</th>
            <th className="whitespace-nowrap capitalize ">Tên Danh Mục Cha</th>
            <th className="text-center whitespace-nowrap capitalize ">
              Đường Dẫn
            </th>
            <th className="text-center whitespace-nowrap capitalize ">
              Tác Vụ
            </th>
          </tr>
        </thead>
        <tbody>
          {props.categories.length > 0 ? (
            currentTableData.map((category, index) => (
              <tr className="intro-x" key={index}>
                <td className="w-40">
                  <div className="flex">
                    <div className="w-10 h-10 image-fit zoom-in">
                      <img
                        alt=""
                        className="tooltip rounded-full"
                        src={category.picture}
                        title="Uploaded at 5 October 2022"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <a href="" className="font-medium whitespace-nowrap">
                    {category.categoryName}
                  </a>
                  {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    Photography
                  </div> */}
                </td>
                <td className="text-center"> {category.path}</td>
                <td className="table-report__action w-56">
                  <div className="flex justify-center items-center">
                    <a
                      className="flex items-center mr-3"
                      href={undefined}
                      onClick={() => props.handleEdit(category._id)}
                    >
                      <i className="uil uil-edit"></i>
                    </a>
                    <a
                      className="flex items-center text-danger"
                      href={undefined}
                      data-tw-toggle="modal"
                      data-tw-target="#delete-confirmation-modal"
                      onClick={() => props.onDelete(category._id)}
                    >
                      <i className="uil uil-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="intro-x">
              <td>Chưa có danh mục cha</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={props.categories.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default List;
