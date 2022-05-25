import { isAddress } from 'ethers/lib/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button } from '../../src/Button'
import { Heading } from '../../src/Heading'
import { ProjectQuery, useProjectQuery } from './[project].queries.generated'

const ProjectPage: NextPage = () => {
  const { query } = useRouter()
  const projectId = String(query.project)

  const { data, error } = useProjectQuery({ id: projectId })

  const handleClick = () => {
    window.alert('Upvote!')
  }

  if (error) {
    return (
      <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
        <header sx={{ pb: '2rem' }}>
          <Heading>Something went wrong</Heading>
        </header>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    )
  }

  let project = data?.project

  if (!isAddress(projectId)) {
    project = placeholderData()
  }

  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <header sx={{ pb: '2rem' }}>
        <Heading>{project?.name || 'Loading...'}</Heading>
        <p sx={{ height: '1.5rem' }}>{project?.subtitle}</p>
      </header>
      <img
        width="100%"
        alt=""
        role="presentation"
        src={project?.imageUrl}
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
          <p sx={{ lineHeight: 2, fontWeight: 400 }}>{project?.description}</p>
        </div>
        <dl>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Owner</dt>
            <dt>{project?.owner?.id}</dt>
          </div>
          <div>
            <dt sx={{ color: 'neutral.64' }}>Created At</dt>
            <dt>{project?.createdAt}</dt>
          </div>
        </dl>
      </section>
      <Button onClick={handleClick}>Upvote</Button>
    </main>
  )
}

export default ProjectPage

function placeholderData(): ProjectQuery['project'] {
  const name = 'Project Details Page'
  const imageUrl = 'https://placekitten.com/1200/500'
  const subtitle = 'Lorem ipsum dolor sit amet'
  const description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.'
  const owner = { id: '0xb3321f0E1591083943Ae2d20AA36adBDD3d55a70' }
  const upvotes = 5
  const downvotes = 2
  const createdAt = new Date().toString()

  return { name, imageUrl, subtitle, description, owner, upvotes, downvotes, createdAt }
}
