import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RestaurantService } from './restaurant.service';
import { Category } from './entities/category.entity';
import { AllCategoriesOutputDto } from './dtos/all-categories.dto';
import { CategoryDto, CategoryOutput } from './dtos/get-categories.dto';

//This is Resolver of Category for graphQL
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @ResolveField(() => Number)
  restaurantCount(@Parent() category: Category): Promise<number> {
    console.log(category);
    return this.restaurantService.countRestaurants(category);
  }

  @Query(() => AllCategoriesOutputDto)
  async categories_all(): Promise<AllCategoriesOutputDto> {
    try {
      const categories = await this.restaurantService.allCategories();
      return {
        ok: true,
        categories,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  @Query(() => CategoryOutput)
  category(@Args('input') categoryInput: CategoryDto): Promise<CategoryOutput> {
    return this.restaurantService.findCategoryBySlug({
      slug: categoryInput.slug,
      page: categoryInput.page,
    });
  }
}
