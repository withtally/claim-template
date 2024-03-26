import DiscordIcon from '~/public/img/icons/discord.svg'
import TelegramIcon from '~/public/img/icons/telegram.svg'
import TwitterIcon from '~/public/img/icons/twitter.svg'
import { FC } from 'react'

interface Props {
  messenger: string;
  className: string;
}

export const SocialIcon:FC<Props> = ({ messenger, className }) => {
  switch (messenger) {
    case 'twitter':
      return <TwitterIcon className={className}/>;
    case 'telegram':
      return <TelegramIcon className={className}/>
    case 'discord':
      return <DiscordIcon className={className}/>

  }
}

