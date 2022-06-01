import { NextPage } from 'next'

import { Heading } from '../../src/Heading'
import { SubmitProjectForm } from '../../src/SubmitProjectForm'

const AddProjectPage: NextPage = () => {
  return (
    <main sx={{ px: '1rem', maxWidth: '920px', mx: 'auto' }}>
      <header sx={{ pb: ['1rem', '3.5rem'] }}>
        <Heading>Add a project</Heading>
      </header>
      <SubmitProjectForm />
    </main>
  )
}

export default AddProjectPage
