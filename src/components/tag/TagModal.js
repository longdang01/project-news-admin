import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { tagModalValidator } from "../../common/Validation";
import { configSlugify } from "../../config/ConfigUI";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../../utils/modal/Modal";
var slugify = require("slugify");

const TagModal = (props) => {
  const initData = {
    _id: "",
    tagName: "",
    path: "",
    description: "",
  };

  const initImage = { preview: "", raw: "" };

  const { createTag, updateTag, action, show, setIsLoading } = props;
  const [tag, setTag] = useState(initData);
  const [image, setImage] = useState(initImage);
  const [title, setTitle] = useState("");
  const ref = useRef();

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state =
      name == "tagName"
        ? { [name]: value, path: slugify(value, configSlugify) }
        : { [name]: value };

    setLabelInputs(name == "tagName" ? [name, "path"] : [name]);
    setTag({ ...tag, ...state });
  };

  const onSave = async () => {
    const validate = tagModalValidator(tag);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      if (action == 0) createTag(tag);
      if (action == 1) updateTag(tag._id, tag);
    }
  };

  // catch error when change input
  useEffect(() => {
    const validate = tagModalValidator(tag);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [tag]);

  useEffect(() => {
    setLabelInputs([]);
    setErrors([]);

    if (action == 1 && props.tag._id) {
      setTag(props.tag);
      setTitle("Cập Nhật Thẻ");
    }

    if (action == 0 && !props.tag._id) {
      setTag(initData);
      setTitle("Thêm Thẻ");
    }
  }, [show, action, tag._id]);

  return (
    <>
      <Modal
        onSave={onSave}
        title={title}
        onClose={props.onClose}
        show={props.show}
        isLoading={props.isLoading}
      >
        <div>
          <div className="grid grid-cols-2 gap-5">
            <div className="g-col-12 form-group">
              <label className="form-label italic">Tên thẻ (*)</label>
              <input
                type="text"
                name="tagName"
                className={
                  "form-control shadow-lg " +
                  (showError(errors, "tagName")
                    ? "border-[#FF0000] focusError"
                    : "border-[#cccccc]")
                }
                placeholder="Thể thao, Việc làm"
                required
                value={tag.tagName}
                onChange={handleInput}
              />
              <small className="text-red-600">
                {showError(errors, "tagName") &&
                  showError(errors, "tagName").messages.map(
                    (message, index) => <div key={index}>&bull; {message}</div>
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
                value={tag.path}
                onChange={handleInput}
              />
              <small className="text-red-600">
                {showError(errors, "path") &&
                  showError(errors, "path").messages.map((message, index) => (
                    <div key={index}>&bull; {message}</div>
                  ))}
              </small>
            </div>
          </div>

          <div className="g-col-12 form-group">
            <label className="form-label italic">Mô tả</label>
            <CKEditor
              editor={ClassicEditor}
              data={tag.description || "<p></p>"}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();

                setTag({ ...tag, description: data });
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

export default TagModal;
