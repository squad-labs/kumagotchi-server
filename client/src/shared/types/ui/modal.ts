export type ModalType = "Congratuation";

export type ModalParamManager = {
  [key in ModalType]: CongratuationModalParam | null;
};

export type CongratuationModalParam = {
  key: "Congratuation";
};
