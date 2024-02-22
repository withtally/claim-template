import { FC } from 'react'
import Container from '~/components/Layout/Container'
import { socialIcons } from '~/components/Layout/Nav/Navbar/presets'
import ChevronDownIcon from '~/public/img/icons/chevron-down.svg'
import EthIcon from '~/public/img/icons/eth.svg'

const Navbar: FC = () => {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-b-gray-500 bg-black/70 backdrop-blur-lg">
      <nav>
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-x-20">
            <button onClick={() => window.location.reload()}>
              <span className="cursor-pointer select-none text-2xl font-bold">zkSync Claims</span>
            </button>
            <ul className="flex items-center gap-x-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <li
                  key={i}
                  className="cursor-pointer transition-colors hover:text-blue"
                >
                  <span>Link</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-x-10">
            <button className="inline-flex h-10 items-center justify-center gap-x-4 rounded-full bg-white/20 p-2 px-2">
              <EthIcon className="size-7" />
              <span>nevergonnagiveyouup.eth</span>
              <ChevronDownIcon className="mr-1 size-3.5" />
            </button>
            <ul className="flex items-center gap-x-6">
              {socialIcons.map((Icon, i) => (
                <button>
                  <Icon
                    key={i}
                    className="size-8 text-white transition-colors hover:text-blue"
                  />
                </button>
              ))}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  )
}

export default Navbar
