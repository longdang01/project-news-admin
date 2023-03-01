// import { useEffect, useRef, useState } from "react";
// import Modal from "../../utils/modal/Modal";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CategoryService from "../../services/category.service";
// import UploadService from "../../services/upload.service";
// // import { slugify } from "../../../utils/functions/Functions";
// var slugify = require("slugify");

// const AddForm = (props) => {
//   const initFormState = {
//     _id: null,
//     categoryName: "",
//     picture: "",
//     path: "",
//     description: "",
//   };
//   const initFormImage = { preview: "", raw: "" };

//   const [category, setCategory] = useState(initFormState);
//   const [image, setImage] = useState(initFormImage);
//   const ref = useRef(); // remove value of input file

//   // remove field when closing modal
//   useEffect(() => {
//     setCategory(initFormState);
//     setImage(initFormImage);
//     removeImage();
//   }, [props]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     if (name == "categoryName") {
//       category.path = slugify(value, { locale: "vi", lower: true });
//     }

//     setCategory({ ...category, [name]: value });
//   };

//   const handleChangeImage = (e) => {
//     if (e.target.files.length > 0) {
//       setImage({
//         preview: URL.createObjectURL(e.target.files[0]),
//         raw: e.target.files[0],
//       });
//     }
//   };

//   const removeImage = () => {
//     ref.current.value = "";
//     setImage(initFormImage);
//   };

//   const onSave = async () => {
//     if (!category.categoryName || !category.path) return;
//     const uploaded = await UploadService.upload(image.raw);
//     category.picture = uploaded.data.data ? uploaded.data.data.url : null;

//     await CategoryService.create(category)
//       .then((res) => {
//         props.addCategory(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <>
//       <Modal
//         title={props.title}
//         onClose={props.onClose}
//         onSave={onSave}
//         show={props.show}
//       >
//         <div>
//           <div className="grid grid-cols-2 gap-5">
//             <div className="g-col-12 form-group">
//               <label className="form-label italic">Tên danh mục cha (*)</label>
//               <input
//                 type="text"
//                 name="categoryName"
//                 className="form-control border-[#cccccc] shadow-lg"
//                 placeholder="Fragile, Maverik"
//                 required
//                 value={category.categoryName}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="g-col-12 form-group">
//               <label className="form-label italic">
//                 Đường dẫn (có thể tùy chỉnh) (*)
//               </label>
//               <input
//                 type="text"
//                 name="path"
//                 className="form-control border-[#cccccc] shadow-lg"
//                 placeholder="Fragile, Maverik"
//                 required
//                 value={category.path}
//                 onChange={handleInputChange}
//               />
//             </div>
//           </div>

//           <div className="g-col-12 form-group">
//             <label className="form-label italic">Hình ảnh</label>
//             <input
//               type="file"
//               accept="image/*"
//               className="form-control form-image border-[#cccccc] shadow-lg mb-[8px]"
//               onChange={handleChangeImage}
//               ref={ref}
//             />
//             {image.preview && (
//               <div>
//                 <img src={image.preview} alt="Thumb" className="mb-[8px]" />
//                 <button
//                   onClick={removeImage}
//                   className="btn btn-secondary w-full"
//                 >
//                   Xóa hình ảnh
//                 </button>
//               </div>
//             )}
//           </div>

//           <div className="g-col-12 form-group">
//             <label className="form-label italic">Mô tả</label>
//             <CKEditor
//               editor={ClassicEditor}
//               data={category.description || "<p></p>"}
//               onReady={(editor) => {
//                 // You can store the "editor" and use when it is needed.
//                 // console.log("Editor is ready to use!", editor);
//               }}
//               onChange={(event, editor) => {
//                 const data = editor.getData();

//                 setCategory({ ...category, description: data });
//                 // console.log({ event, editor, data });
//               }}
//               onBlur={(event, editor) => {
//                 // console.log("Blur.", editor);
//               }}
//               onFocus={(event, editor) => {
//                 // console.log("Focus.", editor);
//               }}
//             />
//           </div>
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default AddForm;
