import { ReactNode } from "react";

export interface MenuItemParams {
  icon: ReactNode;
  text: ReactNode;

  onClose: () => void;
  onClick?: Function;

  LinkComponent?: React.FunctionComponent<any>;
  href?: string;
}
