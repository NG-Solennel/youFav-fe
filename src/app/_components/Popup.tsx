import { Fragment, ReactNode, ReactElement, MouseEventHandler } from "react";

import { Dialog, DialogContent, DialogTrigger } from "./ui/Dialog";
import ToolTip from "./ui/ToolTip";
import { usePopup } from "../hooks/usePopup";
import cn from "@/utils/className";

interface PopupProps {
  children: ReactElement | ReactElement[];
  buttonStyle?: string;
  buttonText?: string | undefined;
  buttonIcon?: ReactNode | null;
  maxWidth?: string;
  position?: string;
  tooltipPosition?: "start" | "center" | "end";
  tooltipMessage?: string | React.ReactNode;
  isLarge?: boolean;
  hasTooltip?: boolean;
  isSmall?: boolean;
  iconPosition?: "LEFT" | "RIGHT";
  customTrigger?: () => void;
  childrenTrigger?: React.ReactNode;
  triggerCustomStyle?: string;
}
export default function PopUp({
  buttonStyle,
  buttonText,
  buttonIcon,
  isLarge,
  hasTooltip,
  isSmall,
  children,
  tooltipPosition = "center",
  tooltipMessage,
  maxWidth,
  iconPosition,
  customTrigger,
  childrenTrigger,
  triggerCustomStyle,
}: PopupProps) {
  const { isOpen, setIsOpen } = usePopup();
  const openModal: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    if (customTrigger) customTrigger();
    setIsOpen(true);
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {hasTooltip ? (
        <ToolTip
          triggerStyles={buttonStyle}
          onClick={openModal}
          position={tooltipPosition}
          icon={buttonIcon}
        >
          <span className="text-white text-xs">{tooltipMessage}</span>
        </ToolTip>
      ) : childrenTrigger ? (
        <DialogTrigger className={triggerCustomStyle}>
          {childrenTrigger}
        </DialogTrigger>
      ) : (
        <DialogTrigger onClick={openModal} className={buttonStyle}>
          {iconPosition === "LEFT" && buttonIcon}
          <span className="text-xs bg-primary px-2 py-1 rounded-md hover:bg-header transition-all ease-in duration-150">
            {buttonText}
          </span>
          {iconPosition === "RIGHT" && buttonIcon}
        </DialogTrigger>
      )}
      <DialogContent
        className={cn(
          maxWidth ? maxWidth : "",
          isLarge ? "overflow-y-auto" : "",
          isSmall ? "min-w-[35%] " : "min-w-[50%] 4xl:min-w-[40%]",
          " relative max-h-[96vh] border-light rounded-xl bg-dark px-5 text-left align-middle text-white shadow-xl transition-all scrollbar-thin scrollbar-track-hc-gray-100 scrollbar-thumb-hc-gray-200  dark:bg-hc-darkgray-50  dark:text-hc-darkgray-400  dark:scrollbar-track-hc-darkgray-50 dark:scrollbar-thumb-hc-darkgray-100"
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
}
