export interface ProjectCardProps {
  name: string
  imageUrl: string
}

export function ProjectCard({ name, imageUrl }: ProjectCardProps) {
  return (
    <article
      sx={{ borderRadius: '4px', width: '180px', overflow: 'hidden', boxShadow: '0px 4px 24px rgba(30, 37, 44, 0.16)' }}
    >
      <img width="100%" alt="" role="presentation" src={imageUrl} sx={{ objectFit: 'cover', height: '150px' }} />
      <h2 sx={{ fontWeight: 700, fontSize: '1rem', textAlign: 'center', color: 'neutral.32', p: '1.5rem 1rem' }}>
        {name}
      </h2>
    </article>
  )
}
