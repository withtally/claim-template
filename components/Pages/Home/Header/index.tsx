import { FC } from 'react'
import Button from '~/components/Layout/Button'
import Container from '~/components/Layout/Container'
import { OptimisedImage } from '~/components/Layout/OptimisedImage'

interface HeaderProps {
  onClick: () => void
}

const Header: FC<HeaderProps> = ({ onClick }) => {
  return (
    <section className="relative overflow-hidden">
      <OptimisedImage
        src="/img/home/background.jpg"
        alt=""
        layout="cover"
        className="inset-0 xxs:absolute"
      />
      <Container className="flex h-svh min-h-[600px] flex-col items-start justify-center">
        <header className="flex flex-col items-start gap-y-6">
          <h1 className="text-display-m">zkSync Claim Portal</h1>
          <p className="text-title text-gray-400">Check your eligibility to claim tokens</p>
          <Button onClick={onClick}>Check eligibility</Button>
        </header>
      </Container>
    </section>
  )
}

export default Header
