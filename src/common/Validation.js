import Joi from "joi";

const categoryModalValidator = (data) => {
  const schema = Joi.object().keys({
    categoryName: Joi.string().required(),
    path: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const subCategoryModalValidator = (data) => {
  //check category is object? -> type: string
  // if (data.category) {
  data.category =
    data.category && data.category._id ? data.category._id : data.category;
  // }

  const schema = Joi.object().keys({
    category: Joi.string().required(),
    subCategoryName: Joi.string()
      .pattern(/^\d+$/, { invert: true })
      .min(3)
      .max(100)
      .required(),
    path: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const postFormValidator = (data) => {
  //check category is object? -> type: string
  data.subCategory =
    data.subCategory && data.subCategory._id
      ? data.subCategory._id
      : data.subCategory;

  const schema = Joi.object().keys({
    subCategory: Joi.string().required(),
    title: Joi.string().required(),
    path: Joi.string().required(),
    thumbnail: Joi.string().required(),
    content: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const tagModalValidator = (data) => {
  const schema = Joi.object().keys({
    tagName: Joi.string().required(),
    path: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const slideModalValidator = (data) => {
  const schema = Joi.object().keys({
    slideName: Joi.string().required(),
    picture: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const postTagModalValidator = (data) => {
  const schema = Joi.object().keys({
    post: Joi.string().required(),
    tag: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

const userModalValidator = (data) => {
  const schema = Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  return schema
    .messages({
      //   "string.base": `"a" should be a type of 'text'`,
      //   "string.min": `"a" should have a minimum length of {#limit}`,
      "string.empty": `Không được để trống`,
      "any.required": `Bắt buộc phải nhập`,
    })
    .validate(data, { abortEarly: false, allowUnknown: true });
};

export {
  categoryModalValidator,
  subCategoryModalValidator,
  postFormValidator,
  tagModalValidator,
  slideModalValidator,
  postTagModalValidator,
  userModalValidator,
};
