import * as React from "react";
import { useIMask } from "react-imask";
import { type ControllerRenderProps } from "react-hook-form";
import { Input } from "../../components/ui/input";

interface CurrencyInputProps
  extends Omit<React.ComponentProps<typeof Input>, "value" | "onChange"> {
  field: ControllerRenderProps<any, any>;
}

const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ field, ...props }, ref) => {
    const { ref: iMaskRef } = useIMask(
      {
        mask: "R$ num",
        lazy: false,
        blocks: {
          num: {
            mask: Number,
            scale: 2,
            thousandsSeparator: ".",
            padFractionalZeros: true,
            radix: ",",
            mapToRadix: [","],
          },
        },
      },
      { onAccept: (_value, mask) => field.onChange(mask.unmaskedValue) }
    );

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        const formRef = field.ref as React.RefCallback<HTMLInputElement>;
        formRef(node);

        if (typeof iMaskRef !== "function") {
          iMaskRef.current = node;
        }

        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [iMaskRef, field.ref, ref]
    );

    return (
      <Input
        {...props}
        ref={setRefs}
        name={field.name}
        onBlur={field.onBlur}
        defaultValue={field.value}
      />
    );
  }
);
CurrencyInput.displayName = "CurrencyInput";
export { CurrencyInput };
