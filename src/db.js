import { createConnection } from "typeorm"

export default async (args) => {
  return createConnection(args)
  .catch(error => {
    console.log("Error: ", error)
  })
}

