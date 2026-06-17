import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import styles from './Button.module.css'

type BaseProps = {
  variant?: 'primary' | 'ghost'
  children: React.ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button'; href?: never; to?: never }

type ButtonAsAnchor = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string; to?: never }

type ButtonAsLink = BaseProps &
  Omit<LinkProps, 'children' | 'className'> & { as: 'link'; to: string; href?: never }

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', children, as: Tag = 'button', className = '', ...rest }, ref) => {
    const cls = [
      styles.btn,
      variant === 'ghost' ? styles.ghost : styles.primary,
      className,
    ]
      .filter(Boolean)
      .join(' ')

    if (Tag === 'link') {
      const { to, ...linkRest } = rest as ButtonAsLink
      return (
        <Link
          to={to}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(linkRest as Omit<LinkProps, 'to' | 'children' | 'className'>)}
        >
          {children}
        </Link>
      )
    }

    if (Tag === 'a') {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cls}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
