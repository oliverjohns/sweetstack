import { classNames } from "@/utils/class-names";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";

export interface DropdownItem {
  show?: boolean;
  name: string;
  href?: string;
  onClick?: () => void;
  locale?: string;
  icon?: JSX.Element;
  hasDivider?: boolean;
}

interface Props {
  dropdownButton: JSX.Element;
  items: DropdownItem[];
  position?: "bottom-right" | "bottom-left";
}

export const Dropdown = ({
  dropdownButton,
  items,
  position = "bottom-right",
}: Props) => {
  return (
    <Menu as="div" className="relative">
      {dropdownButton}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={classNames(
            "absolute z-50 mt-2 w-48 origin-top-right cursor-pointer rounded-md",
            "bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
            position === "bottom-right" && "left-0",
            position === "bottom-left" && "right-0"
          )}
        >
          {items
            .filter((item) => item.show === undefined || item.show)
            .map((item) => (
              <span key={item.name}>
                {item.hasDivider ? (
                  <div className="mx-2 w-auto border-b border-solid border-gray-500"></div>
                ) : null}
                <Menu.Item>
                  {({ active }) =>
                    item.href ? (
                      <Link
                        href={item.href}
                        locale={item.locale}
                        onClick={item.onClick}
                        className={classNames(
                          active && "bg-gray-100",
                          "block whitespace-normal px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <span className="flex h-6 items-center gap-2">
                          <span>{item.icon}</span>
                          <span>{item.name}</span>
                        </span>
                      </Link>
                    ) : (
                      <div
                        onClick={item.onClick}
                        className={classNames(
                          active && "bg-gray-100",
                          "block px-4 py-2 text-sm text-gray-700"
                        )}
                      >
                        <span className="flex h-6 items-center gap-2">
                          {item.icon}
                          <span className="">{item.name}</span>
                        </span>
                      </div>
                    )
                  }
                </Menu.Item>
              </span>
            ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
