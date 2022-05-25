import { useProjectRegistryWrite } from './useProjectRegistryWrite'

export function useSubmitProject() {
  return useProjectRegistryWrite('submitProject', {
    description: (submittedProject) => {
      const projectName = submittedProject?.name && `"${submittedProject.name}"`
      return `Submit ${projectName || 'Project'}`
    },
  })
}
