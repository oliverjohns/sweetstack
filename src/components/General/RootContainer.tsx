import { classNames } from "@/utils/class-names";
import { Toolbar } from "../Toolbar";

interface Props {
  className?: string;
  mainClassName?: string;
  children: React.ReactNode;
  hideLogin?: boolean;
}

export const RootContainer = (props: Props) => {
  return (
    <div className={classNames("flex min-h-screen flex-col", props.className)}>
      <Toolbar hideLogin={props.hideLogin} />
      <main
        className={classNames(
          "my-20 flex grow flex-col items-center justify-center px-10",
          props.mainClassName
        )}
      >
        {props.children}
      </main>
    </div>
  );
};
