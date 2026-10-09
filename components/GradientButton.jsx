import Link from "next/link";

export default function GradientButton({
  href,
  children,
  className = "",
  type = "button",
  showArrow = true,
  ...rest
}) {
  const classes = `btn-gradient ${className}`.trim();

  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <span className="btn-arrow" aria-hidden="true">
          →
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} {...rest}>
      {content}
    </button>
  );
}
