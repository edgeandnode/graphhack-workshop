import { NextPage } from 'next'

import { Heading } from '../../src/Heading'
import { SubmitProjectForm } from '../../src/SubmitProjectForm'

const SubmitProjectPage: NextPage = () => {
  return (
    <main sx={{ px: '1rem', maxWidth: '$container', mx: 'auto' }}>
      <header sx={{ pb: '3.5rem' }}>
        <Heading>Add a Project</Heading>
      </header>
      <SubmitProjectForm />
    </main>
  )
}

export default SubmitProjectPage
