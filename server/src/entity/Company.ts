import { ObjectId } from "mongodb";
import { Field, ID, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("companies")
export class Company extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectId;

  @Field(() => ID)
  @Column()
  accountId: ObjectId;

  @Field()
  @Column()
  companyName: string;

  @Field({ nullable: true })
  @Column()
  companyImage: string;
}

@InputType()
export class EditCompanyInput {
  @Field({ nullable: true })
  companyName: string;

  @Field({ nullable: true })
  companyImage: string;
}