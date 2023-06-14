import { Dialog as HeadlessDialog, Transition } from "@headlessui/react";
import type { ReactNode } from "react";
import { Fragment, useRef } from "react";

export type BaseDialogProps = {
  visible: boolean;
  onClose: (state: boolean) => void;
  description?: string;
  title?: string;
};

type Props = {
  children?: ReactNode;
  actions?: ReactNode;
  icon?: ReactNode;
  id?: string;
} & BaseDialogProps;

export const Dialog = ({
  title,
  visible,
  onClose,
  icon,
  description,
  actions,
  children,
  id,
}: Props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={visible} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto ">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <HeadlessDialog.Panel className="relative transform bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div id={id} className="relative border bg-white p-6">
                  <div className="mb-5 sm:flex sm:items-start">
                    {icon ? (
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        {icon}
                      </div>
                    ) : null}
                    <div className="text-center sm:text-left">
                      {title ? (
                        <HeadlessDialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {title}
                        </HeadlessDialog.Title>
                      ) : null}
                      {description ? (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">{description}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {children}
                  {actions ? (
                    actions
                  ) : (
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => onClose(false)}
                      >
                        Ok
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => onClose(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition.Root>
  );
};
