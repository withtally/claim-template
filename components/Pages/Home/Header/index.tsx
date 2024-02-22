import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'
import { siteName } from '~/constants/site'

interface HeaderProps {
  onClick: () => void
}

const Header: FC<HeaderProps> = ({ onClick }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-end pr-40">
        <OptimisedImage
          src="/img/home/background-placeholder.jpg"
          alt=""
          layout="cover"
          className="w-[600px] overflow-hidden rounded-md"
        />
      </div>
      <Container className="flex h-svh min-h-[600px] flex-col items-start justify-center">
        <header className="flex flex-col items-start gap-y-6">
          <h1 className="text-display-m">{siteName} Claim Portal</h1>
          <p className="text-title text-gray-400">Check your eligibility to claim tokens</p>
          <Button onClick={onClick}>Check eligibility</Button>
        </header>
      </Container>
    </section>
  )
}

export default Header
