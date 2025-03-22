import { Dispatch, ReactElement, SetStateAction } from "react";

export interface Title {
  id: string;
  description: string;
}

export interface TitleTableProps {
  titles: Title[];
  callback: Dispatch<SetStateAction<boolean>>;
}

export interface AddEditTitleProps {
  titleId?: string;
  titleDescription?: string;
  buttonTitle: string;
  icon: ReactElement;
  confirmButtonTitle: string;
  dialogTitle: string;
  description: string;
  callback: Dispatch<SetStateAction<boolean>>;
}

export interface DeleteTitleProps {
  title: Title;
  callback: Dispatch<SetStateAction<boolean>>;
}
