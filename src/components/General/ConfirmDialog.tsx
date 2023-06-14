import { Button } from "./Button";
import type { BaseDialogProps } from "./Dialog";
import { Dialog } from "./Dialog";

export type ConfirmDialogProps = BaseDialogProps & {
  onOk?: () => void;
  loading?: boolean;
  id?: string;
};

export const ConfirmDialog = (props: ConfirmDialogProps) => {
  return (
    <Dialog
      {...props}
      actions={
        <div className="flex flex-row-reverse gap-2">
          <Button
            text="Ok"
            onClick={props.onOk}
            className="w-24"
            loading={props.loading}
          />
          <Button
            text="Cancel"
            className="w-24"
            onClick={() => props.onClose(false)}
            disabled={props.loading}
          />
        </div>
      }
    />
  );
};
