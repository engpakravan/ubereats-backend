import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Dish } from './dish.entity';
import { Order } from '../../order/entities/oder.entity';

@InputType('RestaurantInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Restaurant extends CoreEntity {
  @Column()
  @Field(() => String)
  @IsString()
  @Length(5)
  name: string;

  @Column()
  @Field(() => String, { defaultValue: 'Online' })
  @IsString()
  @Length(5)
  address: string;

  @Column()
  @Field(() => String, { defaultValue: 'default-avatar.png' })
  @IsString()
  avatar: string;

  @Column({ default: false })
  @Field(() => Boolean)
  verified: boolean;

  //Restaurant has one Category
  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.restaurants, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  category: Category;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.restaurants)
  owner: User;

  @RelationId((restaurant: Restaurant) => restaurant.owner)
  ownerId: number;

  //Restaurant Have many dishes
  @Field(() => [Dish])
  @OneToMany(() => Dish, (dish) => dish.restaurant)
  @JoinColumn()
  dishes: Dish[];

  //Restaurant has many order
  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.restaurant)
  @JoinColumn()
  order: Order[];

  // @RelationId((dish: Dish) => dish.restaurant)
  // restaurantId: number;
}
