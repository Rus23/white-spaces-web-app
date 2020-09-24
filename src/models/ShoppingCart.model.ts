import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LineIntem } from './LineItem.model';
import { Product } from './Product.model';

export class ShoppingCart {
  public id: number;
  public datetime: string | Date;
  public state: string;
  public user_id: number;
  public line_items: LineIntem[];

  public static getPackageProduct(shoppingCart: ShoppingCart): Product {
    return shoppingCart.line_items
      .map((li) => li.product)
      .find(
        (prod) =>
          prod.category_id === LocalStorageService.Instance.PackageCategroyId
      );
  }

  public static getPackageLineItem(shoppingCart: ShoppingCart): LineIntem {
    return shoppingCart.line_items.find(
      (line_item) =>
        line_item.product.category_id ===
        LocalStorageService.Instance.PackageCategroyId
    );
  }

  public static getLineItemWithProductId(
    shoppingCart: ShoppingCart,
    productId: number
  ): LineIntem {
    return shoppingCart.line_items.find((lineItem) => {
      return lineItem.product.id === productId;
    });
  }

  public static deleteLineItem(
    shoppingCart: ShoppingCart,
    lineItemId: number
  ): ShoppingCart {
    let newShoppingCart: ShoppingCart = JSON.parse(
      JSON.stringify(shoppingCart)
    );

    newShoppingCart.line_items = newShoppingCart.line_items.filter(
      (lineItem) => {
        console.log(lineItem.id);
        console.log(lineItemId);
        return lineItem.id !== lineItemId;
      }
    );

    console.log(newShoppingCart.line_items);
    return newShoppingCart;
  }
}
