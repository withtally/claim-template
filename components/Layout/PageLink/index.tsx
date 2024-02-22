import cx from 'classnames'
import Link from 'next/link'
import { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode, forwardRef } from 'react'

interface PageLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  href: string
  className?: string
  children: ReactNode | string
}

export const PageLink = forwardRef<HTMLAnchorElement, PageLinkProps>(({ href, className, children, ...props }, ref) => (
  <>
    {!href && (
      <div
        ref={ref}
        className={cx(className)}
        {...(props as any)}
      >
        {children}
      </div>
    )}
    {href && (
      <>
        {href.startsWith('#') || href.startsWith('mailto') ? (
          <a
            ref={ref}
            href={href}
            className={cx(className)}
            {...props}
          >
            {children}
          </a>
        ) : (
          <Link
            href={href}
            scroll={false}
            passHref
            legacyBehavior
          >
            <a
              ref={ref}
              className={cx(className)}
              {...props}
            >
              {children}
            </a>
          </Link>
        )}
      </>
    )}
  </>
))
