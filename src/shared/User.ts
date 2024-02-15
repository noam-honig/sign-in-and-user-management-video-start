import { Entity, Fields } from "remult"

@Entity("users", {
  allowApiCrud: true,
})
export class User {
  @Fields.cuid()
  id = ""

  @Fields.string()
  name = ""

  @Fields.boolean()
  admin = false

  @Fields.createdAt()
  createdAt?: Date
}
