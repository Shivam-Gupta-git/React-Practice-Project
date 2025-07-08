 import { createContext, useReducer } from "react";
import { DEFAULT_ITEM_DATA } from "../Components/Project3DATA";

export const FoodItems = createContext({
  foodItems: [],
  filterFoodItems: () => {},
  searchItem: () => {},
});

const FoodItemsReducer = (currentFoodItems, action) => {
  let newFoodItem = currentFoodItems;
  if (action.type === "SEARCH_FOODITEMS") {
    const searchQuery = action.payload.search.toLowerCase();
  
    if (!searchQuery) {
      return DEFAULT_ITEM_DATA;
    }
    return DEFAULT_ITEM_DATA.filter((foodItem) =>
      foodItem.name.toLowerCase().includes(searchQuery)
    );
  }
  if(action.type === 'FILTER_FOODITEMS'){
    const filterQuery = action.payload.filter;
    if(!filterQuery){
      return DEFAULT_ITEM_DATA;
    }
    else if( filterQuery === 'All'){
     return DEFAULT_ITEM_DATA
    }
    return DEFAULT_ITEM_DATA.filter((foodItem) => foodItem.type.includes(filterQuery));
    
  }
  
  return newFoodItem;
};

const FoodItemsProvider = ({ children }) => { 
  const [foodItems, dispatchFoodItems] = useReducer(
    FoodItemsReducer,
    DEFAULT_ITEM_DATA
  );

  const filterFoodItems = (filter) => {
   dispatchFoodItems({
    type:'FILTER_FOODITEMS',
    payload:{
      filter,
    }
   })
   console.log(filter)
  };

  const searchItem = (search) => {
    dispatchFoodItems({
      type: "SEARCH_FOODITEMS",
      payload: { search },
    });
  };

  return (
    <FoodItems.Provider value={{ 
      foodItems, 
      filterFoodItems, 
      searchItem 
      }}>
      {children}
    </FoodItems.Provider>
  );
};

export default FoodItemsProvider;