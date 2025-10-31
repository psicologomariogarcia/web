import { eq } from "drizzle-orm"
import type { InferInsertModel, InferSelectModel } from "drizzle-orm"

import { transactions } from "@/db/schema"
import { getDbClient } from "@/lib/db"

export type Transaction = InferSelectModel<typeof transactions>
export type NewTransaction = InferInsertModel<typeof transactions>

export const createTransaction = async (payload: NewTransaction) => {
  const db = getDbClient()

  return db.insert(transactions).values(payload).returning()
}

export const updateTransactionStatus = async (
  id: string,
  status: Transaction["status"],
  data: Partial<
    Pick<
      Transaction,
      "providerReference" | "errorCode" | "metadata" | "processedAt"
    >
  > = {}
) => {
  const db = getDbClient()

  return db
    .update(transactions)
    .set({
      status,
      providerReference: data.providerReference,
      errorCode: data.errorCode,
      metadata: data.metadata,
      processedAt: data.processedAt,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(transactions.id, id))
    .returning()
}
