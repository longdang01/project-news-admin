import { useState, useMemo } from "react";
import { PAGE_SIZE } from "../../common/Variable";
import Pagination from "../../utils/pagination/Pagination";

const TagTable = (props) => {
  const { tags, handleShow, deleteTag } = props;

  const PageSize = PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);

  const data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return tags.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, tags]);

  return (
    <>
      <table className="table table-report -mt-2">
        <thead>
          <tr>
            <th className="whitespace-nowrap capitalize text-center">STT</th>
            <th className="whitespace-nowrap capitalize ">Tên Thẻ</th>
            <th className="text-center whitespace-nowrap capitalize ">
              Đường Dẫn
            </th>
            <th className="text-center whitespace-nowrap capitalize ">
              Tác Vụ
            </th>
          </tr>
        </thead>
        <tbody>
          {tags.length > 0 ? (
            data.map((tag, index) => (
              <tr className="intro-x" key={index}>
                <td className="w-20 text-center">
                  {(currentPage - 1) * PAGE_SIZE + index + 1}
                </td>
                <td>
                  <a href="" className="font-medium whitespace-nowrap">
                    {tag.tagName}
                  </a>
                  {/* <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    Photography
                  </div> */}
                </td>
                <td className="text-center"> {tag.path}</td>
                <td className="table-report__action w-56">
                  <div className="flex justify-center items-center">
                    <a
                      className="flex items-center mr-3"
                      href={undefined}
                      onClick={() => handleShow(1, true, tag._id)}
                    >
                      <i className="uil uil-edit"></i>
                    </a>
                    <a
                      className="flex items-center text-danger"
                      href={undefined}
                      data-tw-toggle="modal"
                      data-tw-target="#delete-confirmation-modal"
                      onClick={() => deleteTag(tag._id)}
                    >
                      <i className="uil uil-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="intro-x">
              <td>Chưa có thẻ</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={props.tags.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default TagTable;
