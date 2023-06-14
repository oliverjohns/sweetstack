import { createAvatar } from "@dicebear/core";
import * as identicon from "@dicebear/identicon";
import { Disclosure, Menu } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { classNames } from "../utils/class-names";
import { Button } from "./General/Button";
import { Dropdown, type DropdownItem } from "./General/Dropdown";
import { Logo } from "./General/Logo";

interface NavigationItem {
  name: string;
  href: string;
}

const navigationItems: NavigationItem[] = [{ name: "Users", href: "/users" }];

interface Props {
  hideLogin?: boolean;
}

export const Toolbar = ({ hideLogin }: Props) => {
  const router = useRouter();
  const user = useUser();
  const authClient = useSupabaseClient();

  const avatar = useMemo(() => {
    if (!user) return null;
    const result = createAvatar(identicon, {
      seed: user.id,
    });
    const dataUri = result.toDataUriSync();
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={dataUri} className="h-6 w-6 bg-white" alt="avatar"></img>;
  }, [user]);

  const isSignedIn = !!user;

  const isHrefActivated = (href: string) => href === router.pathname;

  const dropdownItems: DropdownItem[] = [
    {
      onClick: () => authClient.auth.signOut(),
      hasDivider: true,
      name: "Sign out",
    },
  ];

  return (
    <Disclosure
      as="nav"
      className="sticky top-0 z-10 w-screen border-b border-solid border-slate-300 bg-white bg-opacity-90"
    >
      {({ open }) => (
        <>
          <div className="px-10 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between p-5">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                {isSignedIn && (
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/20 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Logo />
                {isSignedIn && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isHrefActivated(item.href)
                              ? "font-bold text-primary underline"
                              : "text-black",
                            "h-max rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={
                            isHrefActivated(item.href) ? "page" : undefined
                          }
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {hideLogin ? null : (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {isSignedIn ? (
                    <Dropdown
                      position="bottom-left"
                      dropdownButton={
                        <Menu.Button>
                          <>
                            <span className="sr-only">Open user menu</span>
                            <div>{avatar}</div>
                          </>
                        </Menu.Button>
                      }
                      items={dropdownItems}
                    />
                  ) : (
                    <Button
                      onClick={() => router.push("/auth/signin")}
                      text={"Sign in"}
                      className="invisible rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white sm:visible"
                    />
                  )}
                </div>
              )}
            </div>
          </div>

          {isSignedIn && (
            <Disclosure.Panel className="sm:hidden">
              <div className="flex flex-col">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      isHrefActivated(item.href)
                        ? "bg-gray-100 text-black"
                        : "text-gray-400 hover:bg-gray-100",
                      "block px-3 py-2 text-base font-medium"
                    )}
                    aria-current={
                      isHrefActivated(item.href) ? "page" : undefined
                    }
                  >
                    Placeholder
                  </Link>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};
