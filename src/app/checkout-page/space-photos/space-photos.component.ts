import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
  appendSpacePhotoImageCheckout,
} from 'src/app/store/actions/checkout.action';
import { UploadConfig } from 'src/app/shared/upload/upload.model';
import { Observable, Subscription } from 'rxjs';
import { CheckoutState } from 'src/app/store/reducers/checkout.reducer';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { Question } from 'src/models/Question.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { Image } from 'src/models/Image.model';
import { IMG_LOADING } from 'src/app/app.config';
import { count, isArray } from 'src/app/shared/Utilities';

const INFO = `Please upload photos of your space.`;

const INFO_DESC_0 = `Take photos from as many different angles as possible.
Take photos in different periods during the day so that we can feel the light changes within the rooms.`;

export const SUPPERTED_FILES = '.jpg, .jpeg, .png ';

const UPLOAD_LIMIT = 16;

@Component({
  selector: 'app-space-photos',
  templateUrl: './space-photos.component.html',
  styleUrls: ['./space-photos.component.scss'],
})
export class SpacePhotosComponent implements OnInit, OnDestroy {
  public $checkoutState: Observable<CheckoutState>;
  public subChekcoutState: Subscription;

  public shoppingCart: ShoppingCart;
  public questions: Question[];
  public uploadConfig: UploadConfig;

  public info: string = INFO;
  public desc: string[] = [INFO_DESC_0];

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$store.dispatch(setInfoCheckout({ info: '', description: [] }));
    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.SPACE_PHOTOS })
    );
    this.$checkoutState = this.$store.select((state) => state.checkout);

    this.uploadConfig = new UploadConfig({
      supportedFileTypes: SUPPERTED_FILES,
      limit: UPLOAD_LIMIT,
    });
  }

  ngOnInit(): void {
    this.subChekcoutState = this.$checkoutState.subscribe((ckState) => {
      this.shoppingCart = ckState.shoppingCart;
      this.questions = ckState.questions;
    });
  }

  ngOnDestroy(): void {
    if (this.subChekcoutState) this.subChekcoutState.unsubscribe();
  }

  public onUploadFilesEvent(files: FileList): void {
    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);

    if (!lineItem.product) {
      alert('Select package');
      return;
    }

    let liSpacePhotos = lineItem.additional_data.images;
    let fileLinks: string[] = isArray(liSpacePhotos) ? liSpacePhotos : [];

    if (count(files) + fileLinks.length > UPLOAD_LIMIT) {
      alert(`Max number of files is ${UPLOAD_LIMIT}.`);
      return;
    }

    Object.values(files).forEach((file) => {
      const loadinImg = new Image({ src: IMG_LOADING });
      this.$store.dispatch(appendSpacePhotoImageCheckout({ image: loadinImg }));

      this.checkoutService
        .uploadFile(file)
        .toPromise()
        .then((file) => {
          fileLinks = [...fileLinks, file.link];

          //#region For shopping cart update II
          const productVM: ProductVM = {
            shopping_cart_id: this.shoppingCart.id,
            line_item_id: lineItem.id,
            quantity: 1,
            additional_data: {
              ...lineItem.additional_data,
              images: fileLinks,
              questions: this.questions
                .filter((q) => q.product_id === lineItem.product.id)
                .map((q) => new QuestionDTO(q)),
            },
          };

          this.checkoutService
            .updateProduct(productVM)
            .toPromise()
            .then((newShoppingCart) => {
              this.$store.dispatch(
                setShoppingCartCheckout({ shoppingCart: newShoppingCart })
              );
            })
            .catch((error) => {
              console.error(error);
              alert(error.message);
            });
          //#endregion
        })
        .catch((error) => {
          console.error(error);
          alert(error.messages);
        });
    });
  }

  public async onDeleteEvent({ image, i }): Promise<void> {
    const lineItem = ShoppingCart.getPackageLineItem(this.shoppingCart);
    let liImages = lineItem.additional_data.images;
    let images = liImages.filter((src) => src !== image.src);

    const productVM: ProductVM = {
      shopping_cart_id: this.shoppingCart.id,
      line_item_id: lineItem.id,
      quantity: 1,
      additional_data: {
        ...lineItem.additional_data,
        images,
      },
    };

    try {
      const shoppingCart = await this.checkoutService
        .updateProduct(productVM)
        .toPromise();
      this.$store.dispatch(setShoppingCartCheckout({ shoppingCart }));
      await this.checkoutService.deleteImage(image.src).toPromise();
    } catch (error) {
      console.error(error);
      alert('Something went wrong...');
    }
  }
}
