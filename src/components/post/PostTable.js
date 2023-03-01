import { useState, useMemo } from "react";
import { PAGE_SIZE } from "../../common/Variable";
import Pagination from "../../utils/pagination/Pagination";
import * as moment from "moment";
import { Link } from "react-router-dom";

const List = (props) => {
  const { posts, handleShow, deletePost } = props;

  const PageSize = PAGE_SIZE;
  const [currentPage, setCurrentPage] = useState(1);

  const data = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;

    return posts.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, posts]);

  return (
    <>
      <table className="table table-report -mt-2">
        <thead>
          <tr>
            <th className="whitespace-nowrap capitalize text-center">STT</th>
            <th className="whitespace-nowrap capitalize ">Ảnh</th>
            <th className="whitespace-nowrap capitalize ">Tên Bài Viết</th>
            <th className="text-center whitespace-nowrap capitalize ">
              Đường Dẫn
            </th>
            <th className="text-center whitespace-nowrap capitalize ">
              Ngày đăng
            </th>
            <th className="text-center whitespace-nowrap capitalize ">
              Tác Vụ
            </th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            data.map((post, index) => (
              <tr className="intro-x" key={index}>
                <td className="w-20 text-center">
                  {(currentPage - 1) * PAGE_SIZE + index + 1}
                </td>
                <td className="w-40">
                  {post.thumbnail ? (
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <img
                          alt=""
                          className="tooltip rounded-full"
                          src={post.thumbnail}
                          title="Uploaded at 5 October 2022"
                        />
                      </div>
                    </div>
                  ) : (
                    <small>(Chưa có ảnh)</small>
                  )}
                </td>
                <td>
                  <a href="" className="font-medium whitespace-nowrap">
                    {post.title}
                  </a>
                  <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                    {post.subCategory && post.subCategory.subCategoryName}
                  </div>
                </td>
                <td className="text-center"> {post.path}</td>
                <td className="text-center w-20">
                  {moment(post.published).format("DD/MM/YYYY")}
                </td>
                <td className="table-report__action w-56">
                  <div className="flex justify-center items-center">
                    <Link
                      className="flex items-center mr-3"
                      href={undefined}
                      to={"/post/edit/" + post._id}
                    >
                      <i className="uil uil-edit"></i>
                    </Link>

                    <a
                      className="flex items-center text-danger mr-3"
                      href="#!"
                      data-tw-toggle="modal"
                      data-tw-target="#delete-confirmation-modal"
                      onClick={() => deletePost(post._id)}
                    >
                      <i className="uil uil-trash"></i>
                    </a>
                    <a
                      className="flex items-center text-warning "
                      href={undefined}
                      onClick={() => handleShow(1, true, post._id)}
                    >
                      <i className="uil uil-tag-alt"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="intro-x">
              <td>Chưa có bài viết</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={props.posts.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default List;
