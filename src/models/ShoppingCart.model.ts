import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PackagesBox } from 'src/app/shared/side-card-packages/side-card-packages-box/side-card-packages-box.component';
import { clone } from 'src/app/shared/Utilities';
import { LineIntem } from './LineItem.model';
import { Product } from './Product.model';
import { Question } from './Question.model';

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

  public static convertPackageProductToPackageBox(
    product: Product
  ): PackagesBox {
    if (!product) {
      return null;
    }

    const buffQuestions = Question.convertQuestionsDTOListToQuestionsList(
      product.additional_data.questions,
      product
    );
    const box = new PackagesBox(
      product.name,
      product.price,
      product.data.description,
      product.additional_data.type,
      buffQuestions,
      product.id
    );
    return box;
  }

  public static getPackageLineItem(shoppingCart: ShoppingCart): LineIntem {
    return shoppingCart.line_items.find(
      (line_item) =>
        line_item.product.category_id ===
        LocalStorageService.Instance.PackageCategroyId
    );
  }

  public static getAddOnLineItemList(shoppingCart: ShoppingCart): LineIntem[] {
    const isAddOn = (categoryId) =>
      categoryId === LocalStorageService.Instance.AddOnCategroyId;

    return shoppingCart.line_items.filter((li) =>
      isAddOn(li.product.category_id)
    );
  }

  public static getAddOnProductList(shoppingCart: ShoppingCart): Product[] {
    const isAddOn = (categoryId) =>
      categoryId === LocalStorageService.Instance.AddOnCategroyId;

    return shoppingCart.line_items
      .map((li) => li.product)
      .filter((prod) => isAddOn(prod.category_id));
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
    let newShoppingCart: ShoppingCart = clone<ShoppingCart>(shoppingCart);

    newShoppingCart.line_items = newShoppingCart.line_items.filter(
      (lineItem) => lineItem.id !== lineItemId
    );

    return newShoppingCart;
  }
}
