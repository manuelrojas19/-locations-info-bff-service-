import { Field, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class OpeningTime {
    @Field()
    open: string;

    @Field()
    close: string;
}
;
