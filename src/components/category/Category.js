import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CategoryTable from "./CategoryTable";
import CategoryModal from "./CategoryModal";
import CategoryService from "../../services/category.service";

const TITLE = "Quản Lý Danh Mục Cha";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setSearchData(e);
  };

  const handleShow = async (action, show, id) => {
    const data = id ? await getCategory(id) : {};
    setCategory(data);
    setAction(action);
    setShow(show);
  };

  const getCategories = () => {
    CategoryService.search({ searchData: searchData })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategory = async (id) => {
    const data = await CategoryService.getById(id);
    return data.data;
  };

  const createCategory = (category) => {
    CategoryService.create(category)
      .then((res) => {
        setCategories([...categories, res.data]);
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.create, configToast);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGE.error.create, configToast);
      });
  };

  const updateCategory = (id, category) => {
    CategoryService.update(id, category)
      .then((res) => {
        setCategories(
          categories.map((item) => (item._id == res.data._id ? res.data : item))
        );
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGE.error.update, configToast);
      });
  };

  const deleteCategory = (id) => {
    let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    if (confirm) {
      CategoryService.remove(id)
        .then((res) => {
          setCategories(categories.filter((category) => category._id !== id));
          toast.success(TOAST_MESSAGE.success.delete, configToast);
        })
        .catch((err) => {
          toast.error(TOAST_MESSAGE.error.delete, configToast);
        });
    }
  };

  useEffect(() => {
    getCategories();
  }, [searchData]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <meta charset="utf-8" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <title>{TITLE + " / Fragile - Blog, News and Magazine"}</title>
        </Helmet>
      </HelmetProvider>

      <CategoryModal
        show={show}
        onClose={() => setShow(false)}
        action={action}
        category={category}
        createCategory={createCategory}
        updateCategory={updateCategory}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />
      <h2 className="intro-y text-lg font-medium mt-10">Danh mục cha</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => handleShow(0, true, "")}
          >
            Thêm danh mục cha
          </button>

          <div className="hidden md:block mx-auto text-slate-500">
            Hiển thị {PAGE_SIZE} / {categories.length} danh mục cha
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
              <i className="uil uil-search w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"></i>
              {/* <i class="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0" data-lucide="search"></i> */}
            </div>
          </div>
        </div>
        {/* <!-- BEGIN: Data List --> */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <CategoryTable
            categories={categories}
            deleteCategory={deleteCategory}
            handleShow={handleShow}
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
