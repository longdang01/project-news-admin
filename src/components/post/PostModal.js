import { useEffect, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { getOptions } from "../../common/Functions";
import { getErrors, showError, catchErrors } from "../../common/Error";
import { postTagModalValidator } from "../../common/Validation";
import { configSelectStyle, configSlugify } from "../../config/ConfigUI";
import Select, { createFilter } from "react-select";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Modal from "../../utils/modal/Modal";
import UploadService from "../../services/upload.service";
var slugify = require("slugify");

const Form = (props) => {
  const initData = {
    _id: "",
    post: "",
    tag: "",
  };

  const { createPostTag, deletePostTag, action, show, setIsLoading } = props;
  const [postTag, setPostTag] = useState(initData);
  const [title, setTitle] = useState("");
  const ref = useRef();

  // select, option
  const [optionsTag, setOptionsTag] = useState([]);

  // validate
  let [errors, setErrors] = useState([]);
  const [labelInputs, setLabelInputs] = useState([]);

  const handleInput = (e, label) => {
    // check input tag or select tag
    const { name, value } = e.target ? e.target : { name: label, value: e };

    const state = { [name]: value, post: props.post._id };

    setLabelInputs([name]);
    setPostTag({ ...postTag, ...state });
  };

  const onSave = async () => {
    const validate = postTagModalValidator(postTag);

    if (validate.error) {
      const errors = getErrors(validate);
      setErrors(errors);
      setIsLoading(false);
    }

    if (!validate.error) {
      setIsLoading(true);

      createPostTag(postTag);
    }
  };

  // after saved
  useEffect(() => {
    setPostTag({ ...postTag, tag: "" });
    setLabelInputs([]);
    setErrors([]);
  }, [setIsLoading]);

  // catch error when change input
  useEffect(() => {
    const validate = postTagModalValidator(postTag);
    setErrors(catchErrors(labelInputs, validate, errors));
  }, [postTag]);

  useEffect(() => {
    // set options of tag
    const optionsTag = getOptions(props.tags, "tagName");
    setOptionsTag(optionsTag);

    setLabelInputs([]);
    setErrors([]);

    setPostTag({ ...postTag, tag: "" });

    setTitle("Danh sách thẻ");
  }, [show, action, postTag._id]);

  return (
    <>
      <Modal
        // onSave={onSave}
        title={title}
        onClose={props.onClose}
        show={props.show}
        isLoading={props.isLoading}
        disabledButtonSave={true}
      >
        <div>
          <div className="g-col-12 form-group">
            <label className="form-label italic">Tên thẻ (*)</label>
            <Select
              styles={configSelectStyle}
              name="tag"
              className={
                "form-control shadow-lg border-[2px] " +
                (showError(errors, "tag")
                  ? "border-[#FF0000] focusError"
                  : "border-[#cccccc]")
              }
              onChange={(item) => handleInput(item ? item.value : "", "tag")}
              value={
                postTag.tag
                  ? optionsTag.find(
                      (item) =>
                        item.value == postTag.tag._id ||
                        item.value == postTag.tag
                    )
                  : null
              }
              options={optionsTag}
              placeholder="Chọn thẻ"
              filterOption={createFilter({
                matchFrom: "any",
                stringify: (option) => `${option.label}`,
              })}
              isSearchable={true}
              isClearable={true}
            />
            <small className="text-red-600">
              {showError(errors, "tag") &&
                showError(errors, "tag").messages.map((message, index) => (
                  <div key={index}>&bull; {message}</div>
                ))}
            </small>
          </div>
          <div className=" mb-5">
            <button
              onClick={onSave}
              className={
                props.isLoading
                  ? "button btn btn-primary w-full button__loading loading"
                  : "button btn btn-primary w-full button__loading"
              }
              disabled={props.isLoading}
            >
              Thêm
            </button>
          </div>
        </div>
        <div className="g-col-12 form-group">
          <label className="form-label italic">Danh sách thẻ</label>
          <table className="table table-report mt-3 shadow-lg border-2 border-[#cccccc] rounded">
            <thead>
              <tr>
                <th className="whitespace-nowrap capitalize text-center w-20">
                  STT
                </th>
                <th className="whitespace-nowrap capitalize ">Thẻ</th>
                <th className="text-center whitespace-nowrap capitalize ">
                  Tác Vụ
                </th>
              </tr>
            </thead>
            <tbody>
              {props.post.tags &&
                props.post.tags.map((tag, index) => (
                  <tr className="" key={index}>
                    <td className="w-20 text-center">{index + 1}</td>

                    <td>
                      <a
                        href={undefined}
                        className="font-medium whitespace-nowrap"
                      >
                        {tag.tag.tagName}
                      </a>
                    </td>

                    <td className="table-report__action w-20">
                      <div className="flex justify-center items-center">
                        <a
                          className="flex items-center text-danger mr-3"
                          href="#!"
                          data-tw-toggle="modal"
                          data-tw-target="#delete-confirmation-modal"
                          onClick={() => {
                            // setIsLoading(true);
                            deletePostTag(tag._id);
                          }}
                        >
                          <i className="uil uil-trash"></i>
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </>
  );
};

export default Form;
