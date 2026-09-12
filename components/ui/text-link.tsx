import type { ComponentProps } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const textLinkVariants = cva(
  "cursor-pointer rounded-sm underline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  {
    variants: {
      variant: {
        // Inline links beside a field label — forgot password, and similar.
        default: "text-sm font-medium text-brand-ink hover:text-ring",
        // Quieter links in supporting copy.
        muted: "text-sm text-muted-foreground hover:text-foreground",
        // The one link on a page you actually want followed.
        emphasis: "font-bold text-brand-ink hover:text-ring",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TextLinkProps = ComponentProps<typeof Link> &
  VariantProps<typeof textLinkVariants>;

export function TextLink({ className, variant, ...props }: TextLinkProps) {
  return (
    <Link
      data-slot="text-link"
      className={cn(textLinkVariants({ variant }), className)}
      {...props}
    />
  );
}

export { textLinkVariants };
