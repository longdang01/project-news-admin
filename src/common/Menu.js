const menus = [
  {
    id: 1,
    name: "Bảng Điều Khiển",
    to: "/dashboard",
    icon: "uil uil-estate",
    subMenus: [],
  },
  {
    id: 2,
    name: "Danh Mục",
    to: null,
    icon: "uil uil-cube",
    subMenus: [
      {
        id: 1,
        name: "Danh Mục Cha",
        to: "/category",
        icon: "uil uil-heart-rate",
      },
      {
        id: 2,
        name: "Danh Mục Con",
        to: "/subCategory",
        icon: "uil uil-heart-rate",
      },
    ],
  },
  {
    id: 3,
    name: "Bài Đăng",
    to: null,
    icon: "uil uil-estate",
    subMenus: [
      {
        id: 1,
        name: "Bài Viết",
        to: "/post",
        icon: "uil uil-heart-rate",
      },
      {
        id: 2,
        name: "Thẻ",
        to: "/tag",
        icon: "uil uil-heart-rate",
      },
    ],
  },
  {
    id: 4,
    name: "Media",
    to: null,
    icon: "uil uil-estate",
    subMenus: [
      {
        id: 1,
        name: "Slide",
        to: "/slide",
        icon: "uil uil-heart-rate",
      },
    ],
  },
];

export { menus };
