import {
  generateSchemaTypes,
  generateReactQueryComponents,
} from '@openapi-codegen/typescript'
import { defineConfig } from '@openapi-codegen/cli'
export default defineConfig({
  generatedApi: {
    from: {
      source: 'url',
      url: 'http://localhost:8000/openapi?format=openapi-json',
    },
    outputDir: 'src/api/generated',
    to: async (context) => {
      const filenamePrefix = 'generatedApi'
      const { schemasFiles } = await generateSchemaTypes(context, {
        filenamePrefix,
      })
      await generateReactQueryComponents(context, {
        filenamePrefix,
        schemasFiles,
      })
    },
  },
})
