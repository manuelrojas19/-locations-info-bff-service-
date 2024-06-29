import { Field, InputType, Float } from '@nestjs/graphql';

@InputType()
export class BankLocationSearchInput {
    @Field(() => Float, { nullable: true })
    latitude?: number;

    @Field(() => Float, { nullable: true })
    longitude?: number;

    @Field(() => Float, { nullable: true })
    startLatitude?: number;

    @Field(() => Float, { nullable: true })
    startLongitude?: number;

    @Field(() => Float, { nullable: true })
    endLatitude?: number;

    @Field(() => Float, { nullable: true })
    endLongitude?: number;

    @Field({ nullable: true })
    postalCode?: string;

    @Field({ nullable: true })
    state?: string;

    @Field({ nullable: true })
    address?: string;

    @Field(() => [String], { nullable: true })
    types?: string[];
}