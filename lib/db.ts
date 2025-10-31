import { cache } from "react"

import { getDb } from "../db"

export const getDbClient = cache(() => getDb())
