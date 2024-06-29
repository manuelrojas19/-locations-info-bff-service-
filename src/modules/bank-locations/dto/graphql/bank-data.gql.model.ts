import { Field, ObjectType } from "@nestjs/graphql";
import { Location } from "./location.gql.model";
import { OpeningTime } from "./opening-time.gql.model";

@ObjectType()
export class BankLocations {
    @Field()
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    street: string;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    state: string;

    @Field({ nullable: true })
    postalCode: string;

    @Field({ nullable: true })
    type: string;

    @Field(type => Location, { nullable: true }) // Use () => for forward reference
    location: Location;

    @Field(type => OpeningTime, { nullable: true }) // Use () => for forward reference
    openingTime: OpeningTime;
}

