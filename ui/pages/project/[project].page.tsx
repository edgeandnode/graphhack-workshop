import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from '../../src/Button'
import { Heading } from '../../src/Heading'

const ProjectPage: NextPage = () => {
  const { query } = useRouter()
  const projectAddress = String(query.project)

  console.log({ projectAddress })

  const name = 'Project Details Page'
  const imageUrl = 'https://placekitten.com/1200/500'
  const subtitle = 'Lorem ipsum dolor sit amet'
  const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  const owner = '0xb3321f0E1591083943Ae2d20AA36adBDD3d55a70'

  const handleClick = () => {
    window.alert('Upvote!')
  }

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <header sx={{ pb: '2rem' }}>
        <Heading>{name}</Heading>
        <p sx={{ height: '1.5rem' }}>{subtitle}</p>
      </header>
      <img
        width="100%"
        alt=""
        role="presentation"
        src={imageUrl}
        sx={{
          height: '304px',
          objectFit: 'cover',
        }}
      />
      <section sx={{ py: '2rem', display: 'flex', flexDirection: 'row', gap: '2rem' }}>
        <div>
          <Heading as="h2" sx={{ fontSize: 'xl' }}>
            Project Description
          </Heading>
          <p sx={{ lineHeight: 2, fontWeight: 400 }}>{description}</p>
        </div>
        <dl>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Owner</dt>
            <dt>{owner}</dt>
          </div>
        </dl>
      </section>
      <Button onClick={handleClick}>Upvote</Button>
    </main>
  )
}

export default ProjectPage
