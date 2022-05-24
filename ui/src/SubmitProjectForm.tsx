import { ProjectRegistry } from '@graphhack-workshop/contract'
import { FormEventHandler, useState } from 'react'
import { Input, ThemeUICSSObject } from 'theme-ui'
import { useAccount } from 'wagmi'

import { Button } from './Button'
import { Heading } from './Heading'
import { ProjectCard } from './ProjectCard'
import { useSubmitProject } from './useSubmitProject'

const containerStyle: ThemeUICSSObject = {
  maxWidth: '40rem',
  backgroundColor: 'background.card',
  boxShadow: '0px 4px 24px rgba(30, 37, 44, 0.16)',
  p: '2rem',
  borderRadius: '8px',
  mx: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}

type SubmitProjectFormControls = {
  [P in keyof ProjectRegistry.ProjectMetadataStruct]: HTMLInputElement
}
interface SubmitProjectFormControlsCollection extends SubmitProjectFormControls, HTMLFormControlsCollection {}
interface SubmitProjectFormElement extends HTMLFormElement {
  readonly elements: SubmitProjectFormControlsCollection
}

export function SubmitProjectForm() {
  const submitProject = useSubmitProject()
  const account = useAccount()

  const handleSubmit: FormEventHandler<SubmitProjectFormElement> = (event) => {
    event.preventDefault()

    const { name, subtitle, imageUrl, description } = event.currentTarget.elements

    submitProject.write({
      name: name.value,
      subtitle: subtitle.value,
      imageUrl: imageUrl.value,
      description: description.value,
    })
  }

  if (submitProject.error) console.error(submitProject.error)

  if (submitProject.response && submitProject.lastArgs) {
    console.log(submitProject.response)
    const project = submitProject.lastArgs[0]
    const ownerAddress = account.data?.address

    return (
      <div sx={containerStyle}>
        <Heading as="h2" sx={{ fontSize: 'lg', letterSpacing: '-0.4px', color: 'neutral.64' }}>
          Submitted
        </Heading>
        <div sx={{ display: 'flex', gap: '1rem' }}>
          <ProjectCard
            name={project.name}
            owner={ownerAddress?.slice(0, 16) + '...' || ''}
            imageUrl={project.imageUrl}
            sx={{ width: '200px', flexShrink: 0, border: '1px solid', borderColor: 'neutral.32' }}
          />
          <pre
            sx={{
              backgroundColor: 'background',
              borderRadius: '4px',
              color: 'neutral.88',
              flex: 1,
              p: '0.75rem',
              border: '1px solid',
              borderColor: 'neutral.32',
              overflow: 'auto',
            }}
          >
            {JSON.stringify({ ...project, owner: ownerAddress }, null, 2)}
          </pre>
        </div>
        <Button onClick={() => submitProject.reset()}>Add Another Project</Button>
        <a
          href={`https://rinkeby.etherscan.io/tx/${submitProject.response.hash}`}
          target="__blank"
          sx={{
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationColor: 'primary.64',
            borderRadius: '4px',
            p: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            fontWeight: 600,
            ':hover, :focus-visible': {
              backgroundColor: 'primary.08',
            },
          }}
        >
          See Transaction on Etherscan
        </a>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      sx={{
        ...containerStyle,
        '> label': {
          '> div': { pb: '0.5rem', color: 'neutral.64', fontWeight: 500 },
          input: {
            textIndent: '1rem',
            py: '1rem',
            borderColor: 'neutral.32',
            borderWidth: '2px',
          },
        },
      }}
    >
      {submitProject.error && (
        <section sx={{ color: 'red' }}>
          <pre>{submitProject.error.message}</pre>
        </section>
      )}
      <label>
        <div>Name</div>
        <Input name="name" type="text" required autoComplete="off" />
      </label>
      <label>
        <div>Image URL</div>
        <ImageUrlInput />
      </label>
      <label>
        <div>
          Subtitle <small>(optional)</small>
        </div>
        <Input name="subtitle" type="text" />
      </label>
      <label>
        <div>
          Description <small>(optional)</small>
        </div>
        <Input name="description" type="text" />
      </label>
      <Button type="submit" sx={{ mt: '1rem' }} disabled={submitProject.isLoading}>
        {submitProject.isLoading ? 'Submitting' : 'Submit'} Project
      </Button>
    </form>
  )
}

function ImageUrlInput() {
  const [imageUrl, setImageUrl] = useState('')

  return (
    <>
      <div
        sx={{
          height: '8rem',
          backgroundColor: 'background.secondary',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '4px',
          mb: '0.5rem',
        }}
      />
      <Input name="imageUrl" type="text" required onChange={(event) => setImageUrl(event.target.value)} />
    </>
  )
}
