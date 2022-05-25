import { ComponentPropsWithoutRef } from 'react'

export interface ProjectCardProps extends ComponentPropsWithoutRef<'article'> {
  name: string
  imageUrl: string
  owner: string
  createdAt?: string
}

export function ProjectCard({ name, imageUrl, owner, createdAt, ...rest }: ProjectCardProps) {
  return (
    <article
      sx={{
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: 'background.card',
        boxShadow: '0px 4px 24px rgba(30, 37, 44, 0.16)',
        transition: 'box-shadow 250ms linear, transform 250ms linear',

        height: '222px',
        display: 'flex',
        flexDirection: 'column',

        ':hover, a:focus-visible > &': {
          boxShadow: '0px 4px 36px rgba(30, 37, 44, 0.32)',
          transform: 'scale(1.050)',

          '> img': {
            opacity: 0,
            height: 0,
          },
          '> div': {
            backgroundColor: 'background.secondary',
          },
          h2: {
            color: 'neutral.88',
            pt: '1rem',
          },
          '.ProjectCard__Details': {
            opacity: 1,
            height: '4rem',
          },
        },
      }}
      {...rest}
    >
      <img
        width="100%"
        alt=""
        role="presentation"
        src={imageUrl}
        sx={{
          objectFit: 'cover',
          height: '150px',
          transition: 'height 350ms ease, opacity 350ms ease',
        }}
      />
      <div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: '1rem 0.5rem',
          m: '0.5rem',
          borderRadius: '4px',
          transition: 'background-color 250ms linear',
          flex: 1,
          overflow: 'hidden',
        }}
      >
        <h2
          sx={{
            fontWeight: 700,
            fontSize: '1rem',
            textAlign: 'center',
            color: 'neutral.32',
            transition: 'color 250ms linear, padding 350ms ease',
          }}
        >
          {name}
        </h2>
        <div
          className="ProjectCard__Details"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            opacity: 0,
            height: 0,
            transition: 'height 350ms ease, opacity 350ms linear',
            pt: '0.5rem',
            fontSize: 'sm',
            color: '#515B64',
            fontWeight: 400,
          }}
        >
          <span>{owner}</span>
          <span>{createdAt}</span>
        </div>
      </div>
    </article>
  )
}
