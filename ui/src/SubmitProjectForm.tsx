import { ProjectRegistry } from '@graphhack-workshop/contract'
import { FormEventHandler, useState } from 'react'
import { Input } from 'theme-ui'

import { Button } from './Button'
import { useSubmitProject } from './useSubmitProject'

type SubmitProjectFormControls = {
  [P in keyof ProjectRegistry.ProjectMetadataStruct]: HTMLInputElement
}
interface SubmitProjectFormControlsCollection extends SubmitProjectFormControls, HTMLFormControlsCollection {}
interface SubmitProjectFormElement extends HTMLFormElement {
  readonly elements: SubmitProjectFormControlsCollection
}

export function SubmitProjectForm() {
  const submitProject = useSubmitProject()

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

  return (
    <form
      onSubmit={handleSubmit}
      sx={{
        maxWidth: '40rem',
        backgroundColor: 'background.card',
        boxShadow: '0px 4px 24px rgba(30, 37, 44, 0.16)',
        p: '2rem',
        borderRadius: '8px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',

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
      <Button type="submit" sx={{ mt: '1rem' }}>
        Submit Project
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
