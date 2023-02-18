import { useEffect, useRef, useState } from "react";
import Modal from "../../../utils/modal/Modal";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CategoryService from "../../../services/category.service";
import UploadService from "../../../services/upload.service";
// import { slugify } from "../../../utils/functions/Functions";
var slugify = require("slugify");

const EditForm = (props) => {
  const initFormState = {
    _id: null,
    categoryName: "",
    picture: "",
    path: "",
    description: "",
  };
  const initFormImage = { preview: "", raw: "" };

  const [category, setCategory] = useState(initFormState);
  const [image, setImage] = useState(initFormImage);
  const ref = useRef();

  const getCategory = async (id) => {
    const res = await CategoryService.getById(id);

    setImage({ ...image, ["preview"]: res.data.picture });
    setCategory(res.data);
  };

  useEffect(() => {
    if (props.id) {
      getCategory(props.id);
    }
  }, [props.show, category._id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "categoryName") {
      category.path = slugify(value, { locale: "vi", lower: true });
    }

    setCategory({ ...category, [name]: value });
  };

  const handleChangeImage = (e) => {
    if (e.target.files.length > 0) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const removeImage = () => {
    ref.current.value = "";
    setImage({ preview: "", raw: "" });
  };

  const onSave = async () => {
    if (!category.categoryName || !category.path) return;
    const uploaded = await UploadService.upload(image.raw);
    category.picture = uploaded.data.data ? uploaded.data.data.url : null;

    await CategoryService.update(category._id, category)
      .then((res) => {
        props.updateCategory(res.data);
        removeImage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Modal
        title={props.title}
        onClose={props.onClose}
        show={props.show}
        onSave={onSave}
      >
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="g-col-12 form-group">
              <label className="form-label italic">Tên danh mục cha (*)</label>
              <input
                type="text"
                name="categoryName"
                className="form-control border-[#cccccc] shadow-lg"
                placeholder="Fragile, Maverik"
                required
                onChange={handleInputChange}
                value={category.categoryName}
              />
            </div>
            <div className="g-col-12 form-group">
              <label className="form-label italic">
                Đường dẫn (có thể tùy chỉnh) (*)
              </label>
              <input
                type="text"
                name="path"
                className="form-control border-[#cccccc] shadow-lg"
                placeholder="Fragile, Maverik"
                required
                onChange={handleInputChange}
                value={category.path}
              />
            </div>
          </div>

          <div className="g-col-12 form-group">
            <label className="form-label italic">Hình ảnh</label>
            <input
              type="text"
              name="categoryName"
              className="form-control border-[#cccccc] shadow-lg mb-[8px]"
              required
              value={category.picture || "Chưa có hình ảnh"}
              readOnly
            />
            <input
              type="file"
              accept="image/*"
              className="form-control form-image border-[#cccccc] shadow-lg mb-[8px]"
              onChange={handleChangeImage}
              ref={ref}
            />
            {image.preview && (
              <div>
                <img src={image.preview} alt="Thumb" className="mb-[8px]" />
                <button
                  onClick={removeImage}
                  className="btn btn-secondary w-full"
                >
                  Xóa hình ảnh
                </button>
              </div>
            )}
          </div>

          <div className="g-col-12 form-group">
            <label className="form-label italic">Mô tả</label>
            <CKEditor
              editor={ClassicEditor}
              data={category.description || "<p></p>"}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();

                setCategory({ ...category, description: data });
                // console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                // console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                // console.log("Focus.", editor);
              }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default EditForm;
