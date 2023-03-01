import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { toast } from "react-toastify";
import { TOAST_MESSAGE } from "../../common/Variable";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { getOptions } from "../../common/Functions";
import { postFormValidator } from "../../common/Validation";
import {
  configSelectStyle,
  configSlugify,
  configToast,
} from "../../config/ConfigUI";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Select, { createFilter } from "react-select";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import Font from "@ckeditor/ckeditor5-font/src/font";
import UploadService from "../../services/upload.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import PostService from "../../services/post.service";
import SubCategoryService from "../../services/subCategory.service";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

var slugify = require("slugify");

const TITLE = "Thêm, Cập Nhật Bài Viết";
const PostForm = (props) => {
  const initData = {
    _id: "",
    author: localStorage.getItem("admin"),
    subCategory: "",
    title: "",
    metaTitle: "",
    path: "",
    overview: "",
    summary: "",
    thumbnail: "",
    published: "",
    content: "",
  };

  const initImage = { preview: "", raw: "" };

  const { id } = useParams();
  let navigate = useNavigate();
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState(initData);
  const [image, setImage] = useState(initImage);
  const [action, setAction] = useState(0);
  const [title, setTitle] = useState("");
  const [saved, setSaved] = useState(false);
  const ref = useRef();

  // select, option
  const [optionsSubCategory, setOptionsSubCategory] = useState([]);

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state =
      name == "title"
        ? { [name]: value, path: slugify(value, configSlugify) }
        : { [name]: value };

    setLabelInputs(name == "title" ? [name, "path"] : [name]);
    setPost({ ...post, ...state });
  };

  const handleImage = (e) => {
    if (e.target.files.length > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setLabelInputs(["thumbnail"]);
      setPost({ ...post, thumbnail: URL.createObjectURL(e.target.files[0]) });
    }
  };

  const handleImageRemove = (isReset) => {
    if (!isReset) {
      let confirm = window.confirm("Bạn có chắc chắn xóa ảnh không?");
      if (confirm) {
        ref.current.value = "";
        setImage(initImage);
        setPost({ ...post, ["thumbnail"]: "" });
      }
    }

    if (isReset) {
      setPost(initData);
      setLabelInputs([]);
      setErrors([]);
      setSaved(false);
      ref.current.value = "";

      setImage(initImage);
    }
  };

  const getSubCategories = () => {
    SubCategoryService.search({ searchData: "" })
      .then((res) => {
        setSubCategories(res.data.subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPost = async (id) => {
    const data = await PostService.getById(id);
    if (data.data) {
      setPost(data.data);
      setImage({ ...image, ["preview"]: data.data.thumbnail });
    }
  };

  const createPost = (post) => {
    console.log(post);

    PostService.create(post)
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setPost(initData);
        setSaved(true);
        toast.success(TOAST_MESSAGE.success.create, configToast);
      })
      .catch((err) => {
        console.log(err);
        toast.error(TOAST_MESSAGE.error.create, configToast);
      });
  };

  const updatePost = (id, post) => {
    PostService.update(id, post)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
        toast.success(TOAST_MESSAGE.success.update, configToast);
      })
      .catch((err) => {
        toast.error(TOAST_MESSAGE.error.update, configToast);
      });
  };

  const onSave = async () => {
    const validate = postFormValidator(post);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      let uploaded;
      if (image.raw) {
        uploaded = await UploadService.upload(image.raw);
      }

      post.thumbnail =
        uploaded && uploaded.data.data
          ? uploaded.data.data.url
          : post.thumbnail;

      if (action == 0) createPost(post);
      if (action == 1) updatePost(post._id, post);
    }
  };

  useEffect(() => {
    getSubCategories();
    // set options of sub category
    const optionsSubCategory = getOptions(subCategories, "subCategoryName");
    setOptionsSubCategory(optionsSubCategory);
  }, [subCategories]);

  // catch error when change input
  useEffect(() => {
    const validate = postFormValidator(post);
    setErrors(catchErrors(labelInputs, validate, errors));

    if (saved) handleImageRemove(true);
  }, [post]);

  useEffect(() => {
    if (id) {
      getPost(id);
    }
  }, []);

  useEffect(() => {
    if (id) {
      setAction(1);
      setTitle("Cập nhật bài viết");
      // if (!post._id) getPost(id);
      // getPost(id);
      setPost(post);
    }

    if (!post._id) {
      setTitle("Thêm bài viết");
      setAction(0);
      setPost(initData);
    }
  }, [id, post._id]);

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
      <h2 className="intro-y text-lg font-medium mt-10">{title}</h2>
      {/* {post._id && ( */}
      <div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          {/* <!-- BEGIN: Data List --> */}
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <div>
              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Tiêu đề (*)</label>
                  <input
                    type="text"
                    name="title"
                    className={
                      "form-control shadow-lg " +
                      (showError(errors, "title")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    placeholder="Thể thao, Việc làm"
                    required
                    value={post.title}
                    onChange={handleInput}
                  />
                  <small className="text-red-600">
                    {showError(errors, "title") &&
                      showError(errors, "title").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">
                    Đường dẫn (có thể tùy chỉnh) (*)
                  </label>
                  <input
                    type="text"
                    name="path"
                    className={
                      "form-control shadow-lg " +
                      (showError(errors, "path")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    placeholder="/the-thao, /viec-lam"
                    required
                    value={post.path}
                    onChange={handleInput}
                  />
                  <small className="text-red-600">
                    {showError(errors, "path") &&
                      showError(errors, "path").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Meta Title</label>
                  <input
                    type="text"
                    name="metaTitle"
                    className={"form-control shadow-lg border-[#cccccc]"}
                    placeholder="Thể thao, Việc làm"
                    required
                    value={post.metaTitle || ""}
                    onChange={handleInput}
                  />
                  <small className=""></small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">Danh mục (*)</label>
                  <Select
                    styles={configSelectStyle}
                    name="subCategory"
                    className={
                      "form-control shadow-lg border-[2px] " +
                      (showError(errors, "subCategory")
                        ? "border-[#FF0000] focusError"
                        : "border-[#cccccc]")
                    }
                    onChange={(item) =>
                      handleInput(item ? item.value : "", "subCategory")
                    }
                    value={
                      post.subCategory
                        ? optionsSubCategory.find(
                            (item) =>
                              item.value == post.subCategory._id ||
                              item.value == post.subCategory
                          )
                        : ""
                    }
                    options={optionsSubCategory}
                    placeholder="Chọn danh mục"
                    filterOption={createFilter({
                      matchFrom: "any",
                      stringify: (option) => `${option.label}`,
                    })}
                    isSearchable={true}
                    isClearable={true}
                  />

                  <small className="text-red-600">
                    {showError(errors, "subCategory") &&
                      showError(errors, "subCategory").messages.map(
                        (message, index) => (
                          <div key={index}>&bull; {message}</div>
                        )
                      )}
                  </small>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="g-col-12 form-group">
                  <label className="form-label italic">
                    Overview (Tổng quan)
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={post.overview || "<p></p>"}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setPost({ ...post, overview: data });
                    }}
                  />
                  <small className=""></small>
                </div>
                <div className="g-col-12 form-group">
                  <label className="form-label italic">
                    Summary (Tóm lược)
                  </label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={post.summary || "<p></p>"}
                    onChange={(event, editor) => {
                      const data = editor.getData();

                      setPost({ ...post, summary: data });
                    }}
                  />
                  <small className=""></small>
                </div>
              </div>
              <div className="g-col-12 form-group">
                <label className="form-label italic">Hình ảnh</label>
                <input
                  type="text"
                  name="thumbnail"
                  className={
                    "form-control shadow-lg mb-[8px] " +
                    (showError(errors, "thumbnail")
                      ? "border-[#FF0000] focusError"
                      : "border-[#cccccc]")
                  }
                  required
                  value={post.thumbnail || "Chưa có hình ảnh"}
                  readOnly
                />
                <input
                  type="file"
                  accept="image/*"
                  className="form-control form-image border-[#cccccc] shadow-lg mb-[8px]"
                  onChange={handleImage}
                  ref={ref}
                />
                {image.preview && (
                  <div>
                    <img
                      src={image.preview}
                      alt="Thumb"
                      className="mb-[8px] w-full h-[500px] object-contain"
                    />
                    <button
                      onClick={(e) => handleImageRemove(false)}
                      className="btn btn-secondary w-full"
                    >
                      Xóa hình ảnh
                    </button>
                  </div>
                )}
                <small className="text-red-600">
                  {showError(errors, "thumbnail") &&
                    showError(errors, "thumbnail").messages.map(
                      (message, index) => (
                        <div key={index}>&bull; {message}</div>
                      )
                    )}
                </small>
              </div>

              <div className="g-col-12 form-group">
                <label className="form-label italic">Nội dung (*)</label>
                <div
                  className={
                    "ck__editor " +
                    (showError(errors, "content") ? "focusError" : "")
                  }
                >
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data={post.content || "<p></p>"}
                    onReady={(editor) => {
                      // You can store the "editor" and use when it is needed.
                      // console.log("Editor is ready to use!", editor);
                    }}
                    onChange={(event, editor) => {
                      const data = editor.getData();

                      console.log(data);
                      setLabelInputs(["content"]);
                      setPost({ ...post, content: data });

                      // console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                      // console.log("Blur.", editor);
                    }}
                    onFocus={(event, editor) => {
                      // console.log("Focus.", editor);
                    }}
                  /> */}
                  {/* {post.content || post.content != undefined && ( */}
                  <SunEditor
                    autoFocus={false}
                    defaultValue={post.content}
                    setContents={!saved || post._id ? post.content : ""}
                    onChange={(data) => {
                      setLabelInputs(["content"]);
                      setPost((post) => {
                        if (data == "<p><br></p>") {
                          data = "";
                        }
                        return { ...post, content: data };
                      });
                    }}
                    setOptions={{
                      katex: "window.katex",
                      buttonList: [
                        [
                          "undo",
                          "redo",
                          "font",
                          "fontSize",
                          "formatBlock",
                          "paragraphStyle",
                          "blockquote",
                          "bold",
                          "underline",
                          "italic",
                          "strike",
                          "subscript",
                          "superscript",
                          "fontColor",
                          "hiliteColor",
                          "textStyle",
                          "removeFormat",
                          "outdent",
                          "indent",
                          "align",
                          "horizontalRule",
                          "list",
                          "lineHeight",
                          "table",
                          "link",
                          "image",
                          "video",
                          "audio",
                          "math",
                          "imageGallery",
                          "fullScreen",
                          "showBlocks",
                          "codeView",
                          "preview",
                          "print",
                          "save",
                          "template",
                        ],
                      ],
                    }}
                  />
                  {/* )} */}
                </div>

                <small className="text-red-600">
                  {showError(errors, "content") &&
                    showError(errors, "content").messages.map(
                      (message, index) => (
                        <div key={index}>&bull; {message}</div>
                      )
                    )}
                </small>
              </div>
            </div>
          </div>
        </div>
        <div className="customModal-footer flex justify-center items-center">
          <button
            onClick={onSave}
            // className="button btn btn-primary ml-3"
            className={
              isLoading
                ? "button btn btn-primary ml-3 button__loading loading"
                : "button btn btn-primary ml-3 button__loading"
            }
            disabled={props.isLoading}
          >
            Lưu
          </button>
          <Link
            to="/post"
            className="button btn btn-secondary ml-3"
            // onClick={!props.isLoading ? props.onClose : null}
          >
            Xem danh sách bài viết
          </Link>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default PostForm;
