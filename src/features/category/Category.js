import List from "./components/List";
import AddForm from "./components/AddForm";
import EditForm from "./components/EditForm";
import CategoryService from "../../services/category.service";
import { useEffect, useState, useMemo, useCallback } from "react";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [currentID, setCurrentID] = useState("");

  useEffect(() => {
    getCategories();
  }, [searchData]);

  const getCategories = () => {
    CategoryService.search({ searchData: searchData })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addCategory = (category) => {
    setCategories([...categories, category]);
    setShow(false);
  };

  const updateCategory = (category) => {
    setCategories(
      categories.map((item) => (item._id == category._id ? category : item))
    );
    setShow(false);
  };

  const deleteCategory = (id) => {
    let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    if (confirm) {
      CategoryService.remove(id)
        .then((res) => {
          setCategories(categories.filter((category) => category._id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearch = (e) => {
    setSearchData(e);
  };

  const handleEdit = (id) => {
    console.log(id);
    setCurrentID(id);
    setAction(1);
    setShow(true);
  };

  return (
    <>
      {action == 0 ? (
        <AddForm
          title="Thêm Danh Mục Cha"
          onClose={() => {
            setShow(false);
          }}
          show={show}
          addCategory={addCategory}
        />
      ) : (
        <EditForm
          title="Cập Nhật Danh Mục Cha"
          onClose={() => {
            setShow(false);
          }}
          show={show}
          id={currentID}
          updateCategory={updateCategory}
        />
      )}
      <h2 className="intro-y text-lg font-medium mt-10">Danh mục cha</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => {
              setAction(0);
              setShow(true);
            }}
          >
            Thêm danh mục cha
          </button>

          <div className="hidden md:block mx-auto text-slate-500">
            Hiển thị 10 / 150 danh mục
          </div>
          <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
            <div className="w-56 relative text-slate-500">
              <input
                type="text"
                className="form-control w-56 box pr-10"
                placeholder="Tìm kiếm..."
                value={searchData}
                onChange={(e) => handleSearch(e.target.value)}
              />
              <i
                className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
                data-lucide="search"
              ></i>
            </div>
          </div>
        </div>
        {/* <!-- BEGIN: Data List --> */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <List
            // categories={searchData == "" ? categories : filterCategories}
            categories={categories}
            onDelete={deleteCategory}
            handleEdit={handleEdit}
          />
        </div>
        {/* <!-- END: Data List --> */}
        {/* <!-- BEGIN: Pagination --> */}
        {/* <div className="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
          <nav className="w-full sm:w-auto sm:mr-auto">
            <ul className="pagination">
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="w-4 h-4" data-lucide="chevrons-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="w-4 h-4" data-lucide="chevron-left"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  ...
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="w-4 h-4" data-lucide="chevron-right"></i>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  <i className="w-4 h-4" data-lucide="chevrons-right"></i>
                </a>
              </li>
            </ul>
          </nav>
          <select className="w-20 form-select box mt-3 sm:mt-0">
            <option>10</option>
            <option>25</option>
            <option>35</option>
            <option>50</option>
          </select>
        </div> */}
        {/* <!-- END: Pagination --> */}
      </div>
      {/* <!-- BEGIN: Delete Confirmation Modal --> */}
      <div id="delete-confirmation-modal" className="modal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body p-0">
              <div className="p-5 text-center">
                <i
                  data-lucide="x-circle"
                  className="w-16 h-16 text-danger mx-auto mt-3"
                ></i>
                <div className="text-3xl mt-5">Are you sure?</div>
                <div className="text-slate-500 mt-2">
                  Do you really want to delete these records? <br />
                  This process cannot be undone.
                </div>
              </div>
              <div className="px-5 pb-8 text-center">
                <button
                  type="button"
                  data-tw-dismiss="modal"
                  className="btn btn-outline-secondary w-24 mr-1"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger w-24">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- END: Delete Confirmation Modal --> */}
    </>
  );
};

export default Category;
