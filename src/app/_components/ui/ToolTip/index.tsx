import { Fragment, MouseEventHandler } from "react";

import * as Tooltip from "@radix-ui/react-tooltip";

import Spinner from "../../Spinner";

type Props = {
  children: React.ReactNode;
  label?: string | React.ReactNode;
  type?: "submit" | "button";
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  spinnerStyles?: string;

  triggerStyles?: string;
  position: "start" | "center" | "end";
};

export default function ToolTip({
  children,
  onClick,
  label,
  type,
  loading,
  icon,
  spinnerStyles,
  disabled,
  position,
  triggerStyles,
}: Props) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={onClick}
          type={type}
          disabled={disabled}
          className={triggerStyles}
        >
          {loading ? (
            <Spinner
              className={`inline h-3 w-3 animate-spin ${spinnerStyles} fill-white `}
            />
          ) : (
            <>
              {icon}
              {label}
            </>
          )}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            align={position}
            className="animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-white p-2 text-sm shadow-md dark:border-hc-darkgray-200 dark:bg-hc-darkgray-100"
            sideOffset={5}
          >
            {children}
            <Tooltip.Arrow className="fill-white dark:fill-hc-darkgray-100" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
