import { useContext } from "react";

import { PopupContext } from "@/Context/PopupContext";

export function usePopup() {
  return useContext(PopupContext);
}
