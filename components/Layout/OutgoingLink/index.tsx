import { DetailedHTMLProps, ReactNode, FC, AnchorHTMLAttributes } from 'react'
import cx from 'classnames'

interface OutgoingLinkProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
  href: string
  className?: string
  children: string | ReactNode
}

export const OutgoingLink: FC<OutgoingLinkProps> = ({ href, className, children, ...props }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={cx(className)}
    {...props}
  >
    {children}
  </a>
)
