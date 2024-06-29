import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Location {
    @Field()
    latitude: number;

    @Field()
    longitude: number;
}
;
