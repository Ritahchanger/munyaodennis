import { forwardRef, useId, type TextareaHTMLAttributes } from "react"
import { cn } from "../../lib/utils"

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            {label}
            {props.required && <span className="ml-0.5 text-red-500">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "min-h-24 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/30",
            className,
          )}
          aria-invalid={Boolean(error)}
          {...props}
        />
        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  },
)
Textarea.displayName = "Textarea"
