
import { useProjectRegistry } from './useProjectRegistry';

export function useSubmitProject() {
  return useProjectRegistry('submitProject', {
    description: (submittedProject) => {
      const projectName = submittedProject?.name && `"${submittedProject.name}"`
      return `Submit ${projectName || 'Project'}`
    },
  })
}
