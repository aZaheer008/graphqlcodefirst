import { CoffeesService } from './coffees.service';
import { Query, Resolver, Args, ID, Mutation } from '@nestjs/graphql';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Resolver()
export class CoffeesResolver {
    constructor(private readonly CoffeesService : CoffeesService){}

    @Query(() => [Coffee], { name : 'coffees'})
    async findAll() {
        return this.CoffeesService.findAll();
    }

    @Query(() => Coffee, { name : 'coffee', nullable : true})
    async findOne(@Args('id', { type: () => ID }, ParseIntPipe) id: number){
        return this.CoffeesService.findOne(id);
    }

    @Mutation(() => Coffee, { name: 'createCoffee', nullable : true })
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput){
        return this.CoffeesService.create(createCoffeeInput);
    }
}
