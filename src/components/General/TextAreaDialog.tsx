import type { ChangeEventHandler } from "react";
import { TextAreaInput } from "../Form/TextAreaInput";
import type { ConfirmDialogProps } from "./ConfirmDialog";
import { ConfirmDialog } from "./ConfirmDialog";

type Props = ConfirmDialogProps & {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  inputLabel?: string;
  errorMessage?: string;
  loading?: boolean;
  disableActions?: boolean;
  value?: string;
  id?: string;
};

export const TextAreaDialog = (props: Props) => {
  const { onChange, inputLabel, errorMessage, loading, value, ...rest } = props;

  return (
    <ConfirmDialog {...rest}>
      <TextAreaInput
        inputClassName="resize-none"
        onChange={onChange}
        label={inputLabel}
        required
        errorMessage={errorMessage}
        disabled={loading}
        value={value}
      />
    </ConfirmDialog>
  );
};
