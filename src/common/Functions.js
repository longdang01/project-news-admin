import { useRef, useEffect } from "react";

const getOptions = (data, label) => {
  let result = [];
  if (label == "categoryName") {
    result =
      data &&
      data.map(({ _id: value, categoryName: label }) => ({
        value,
        label,
      }));
  }

  if (label == "subCategoryName") {
    result =
      data &&
      data.map(({ _id: value, subCategoryName: label }) => ({
        value,
        label,
      }));
  }

  if (label == "tagName") {
    result =
      data &&
      data.map(({ _id: value, tagName: label }) => ({
        value,
        label,
      }));
  }

  return result;
};

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

// only search for label not it (because id has number)
// exp: _id: 123, label: " new "; because not filterOption -> if enter 1 or 2 or 3, option still show ( -> id)
const filterOption = (option, inputValue) =>
  (option.label.toString().match(inputValue) || []).length > 0;
// not used

const union = (arrays, iteratee) => {
  const map = {};

  arrays.forEach((array) => {
    array.forEach((object) => {
      map[object[iteratee]] = object;
    });
  });

  return Object.values(map);
};

const slugify = (str) => {
  // remove accents
  var from =
      "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
    to =
      "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(RegExp(from[i], "gi"), to[i]);
  }

  str = str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-");

  return str;
};

export { getOptions, usePrevious, filterOption, slugify, union };
