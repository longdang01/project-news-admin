import { useEffect, useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE, PAGE_SIZE } from "../../common/Variable";
import { configToast } from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import TagTable from "./TagTable";
import TagModal from "./TagModal";
import TagService from "../../services/tag.service";

const TITLE = "Quản Lý Thẻ";

const Tag = () => {
  const [tags, setTags] = useState([]);
  const [tag, setTag] = useState({});
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(0);
  const [searchData, setSearchData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e) => {
    setSearchData(e);
  };

  const handleShow = async (action, show, id) => {
    const data = id ? await getTag(id) : {};
    setTag(data);
    setAction(action);
    setShow(show);
  };

  const getTags = () => {
    TagService.search({ searchData: searchData })
      .then((res) => {
        setTags(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTag = async (id) => {
    const data = await TagService.getById(id);
    return data.data;
  };

  const createTag = (tag) => {
    TagService.create(tag)
      .then((res) => {
        setTags([res.data, ...tags]);
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.create, configToast);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGE.error.create, configToast);
      });
  };

  const updateTag = (id, tag) => {
    TagService.update(id, tag)
      .then((res) => {
        setTags(
          tags.map((item) => (item._id == res.data._id ? res.data : item))
        );
        setIsLoading(false);
        setShow(false);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGE.error.update, configToast);
      });
  };

  const deleteTag = (id) => {
    let confirm = window.confirm("Bạn có chắc chắn xóa không?");
    if (confirm) {
      TagService.remove(id)
        .then((res) => {
          setTags(tags.filter((tag) => tag._id !== id));
          toast.success(TOAST_MESSAGE.success.delete, configToast);
        })
        .catch((err) => {
          toast.error(TOAST_MESSAGE.error.delete, configToast);
        });
    }
  };

  useEffect(() => {
    getTags();
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

      <TagModal
        show={show}
        onClose={() => setShow(false)}
        action={action}
        tag={tag}
        createTag={createTag}
        updateTag={updateTag}
        isLoading={isLoading}
        setIsLoading={(state) => setIsLoading(state)}
      />
      <h2 className="intro-y text-lg font-medium mt-10">Thẻ</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => handleShow(0, true, "")}
          >
            Thêm thẻ
          </button>

          <div className="hidden md:block mx-auto text-slate-500">
            Hiển thị {PAGE_SIZE} / {tags.length} thẻ
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
            </div>
          </div>
        </div>
        {/* <!-- BEGIN: Data List --> */}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <TagTable tags={tags} deleteTag={deleteTag} handleShow={handleShow} />
        </div>
      </div>
    </>
  );
};

export default Tag;
