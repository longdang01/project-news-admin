const configSlugify = { locale: "vi", lower: true };

const configToast = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const configSelectStyle = {
  control: (base) => ({
    ...base,
    // border: 0,
    // This line disable the blue border
    boxShadow: "none",
    "&:focus-within": {
      // borderColor: "#f7c6b9",
      borderColor: "#c6c6c6",
      boxShadow: "0 0 0.2rem rgba(233, 105, 71, 0.25)",
    },
  }),
};

export { configSlugify, configToast, configSelectStyle };
