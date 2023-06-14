import type { ChangeEventHandler } from "react";
import { TextInput } from "../Form/TextInput";
import type { ConfirmDialogProps } from "./ConfirmDialog";
import { ConfirmDialog } from "./ConfirmDialog";

type Props = ConfirmDialogProps & {
  onChange: ChangeEventHandler<HTMLInputElement>;
  inputLabel?: string;
  errorMessage?: string;
  loading?: boolean;
  disableActions?: boolean;
  value?: string;
  id?: string;
};

export const TextInputDialog = (props: Props) => {
  const { onChange, ...rest } = props;

  return (
    <ConfirmDialog {...rest}>
      <TextInput
        onChange={onChange}
        label={props.inputLabel}
        required
        errorMessage={props.errorMessage}
        disabled={props.loading}
        value={props.value}
      />
    </ConfirmDialog>
  );
};
