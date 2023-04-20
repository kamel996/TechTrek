import { CARD_ADD_ITEM, CARD_REMOVE_ITEM } from "../constants/cartContant";

export const cartReducer = (state = { cardItems: [] }, action) => {
    console.log("initial state:", state);

  switch (action.type) {
    case CARD_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cardItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cardItems: state.cardItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else
        return {
          ...state,
          cardItems: [...state.cardItems, item],
        };

    case CARD_REMOVE_ITEM:
      return {
        ...state,
        cardItems: state.cardItems.filter((x) => x.product !== action.payload),
      };
    default:
      
      return state;
  }
};
