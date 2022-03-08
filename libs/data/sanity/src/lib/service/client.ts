// skQ4QSrOJDXpVnVXP3xGbH86Cj4NocTfUC7BxSQxX5zPIH6T3L8r0XIRBhWSeY1mmCIQKveGvHcc346jxL9a7GN6dMSxELhDy4tux6jCjz84p1Lm7j683fsQiu9vWllohF9JYKKwPzR9dMLvl5jWZgviwNvZWFMkqSdYay0qvCCBsUG86IyT
import sanityClient from '@sanity/client'
const  PROJECT_ID= "kmjcfpvs";

export const client = sanityClient({
  projectId: PROJECT_ID,
  dataset: 'production',
  apiVersion: '2022-03-04', // use current UTC date - see "specifying API version"!
  token: 'skQ4QSrOJDXpVnVXP3xGbH86Cj4NocTfUC7BxSQxX5zPIH6T3L8r0XIRBhWSeY1mmCIQKveGvHcc346jxL9a7GN6dMSxELhDy4tux6jCjz84p1Lm7j683fsQiu9vWllohF9JYKKwPzR9dMLvl5jWZgviwNvZWFMkqSdYay0qvCCBsUG86IyT',
   // or leave blank for unauthenticated usage
  useCdn: true, // `false` if you want to ensure fresh data
})
