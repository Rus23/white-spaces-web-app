import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  setInfoCheckout,
  updateQuestionCheckout,
  setCurrentIndexCheckout,
  setShoppingCartCheckout,
  selectTabbarButtonCheckout,
} from 'src/app/store/actions/checkout.action';
import { Observable, Subscription } from 'rxjs';
import { Question } from 'src/models/Question.model';
import { CheckoutService } from 'src/app/services/checkout.service.ts.service';
import { UploadData } from 'src/app/shared/upload/upload.model';
import { ProductVM } from 'src/models/ProductVM.model';
import { ShoppingCart } from 'src/models/ShoppingCart.model';
import { AdditionalDataLineItem } from 'src/models/AdditionalData.model';
import { formatQuestionDictToList } from 'src/app/shared/Utilities';
import { TabbarText } from 'src/models/TabbarText.model';

const INFO = `Feel free to load us with information so that we
can truly get to know both you and your space
and extend its pontential to maximum.`;

const INFO_DESC = `Note that providing us with lots of information will lead
to complete understanding of your needs and 100% project success`;

const IMAGE_IS_REQUIRED = 'Image is required.';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.scss'],
})
export class QuestionnaireComponent implements OnInit {
  @Input()
  public toShowIndex: number = 0;

  public $shoppingCartState: Observable<ShoppingCart>;
  public $subShoppingCartState: Subscription;
  public shoppingCart: ShoppingCart;

  public $questions: Observable<Question[]>;
  public $subQuestions: Subscription;
  public questions: Question[];

  public uploadData: UploadData;

  constructor(
    private readonly $store: Store<AppState>,
    private readonly checkoutService: CheckoutService
  ) {
    this.$questions = this.$store.select((state) => state.checkout.questions);
    this.$shoppingCartState = this.$store.select(
      (state) => state.checkout.shoppingCart
    );

    this.$store.dispatch(
      setInfoCheckout({ info: INFO, description: [INFO_DESC] })
    );

    this.$store.dispatch(
      selectTabbarButtonCheckout({ btnText: TabbarText.QUESTIONNARIE })
    );

    this.uploadData = new UploadData({
      limit: 1,
      info: '',
      bottomInfo: IMAGE_IS_REQUIRED,
      uppercaseButtonText: true,
    });
  }

  ngOnDestroy(): void {
    if (this.$subQuestions) this.$subQuestions.unsubscribe();
    if (this.$subShoppingCartState) this.$subShoppingCartState.unsubscribe();
  }

  ngOnInit(): void {
    this.$subShoppingCartState = this.$shoppingCartState.subscribe(
      (shoppingCart) => {
        this.shoppingCart = shoppingCart;
      }
    );

    this.$subQuestions = this.$questions.subscribe((questions) => {
      this.questions = questions;
      this.chagneUploadInfo();
    });

    this.chagneUploadInfo();
  }

  public onChangeAnswer(question: Question): void {
    const lineItem = ShoppingCart.getLineItemWithProductId(
      this.shoppingCart,
      question.product_id
    );

    const newQuestions: Question[] = JSON.parse(JSON.stringify(this.questions))
      .filter((q) => q.product_id === lineItem.product.id)
      .map((q) => {
        return q.id === question.id ? { ...question } : { ...q };
      });

    const productVM: ProductVM = {
      shopping_cart_id: this.shoppingCart.id,
      product_id: question.product_id,
      line_item_id: lineItem.id,
      additional_data: {
        ...lineItem.additional_data,
        questions: newQuestions,
      },
      quantity: 1,
    };

    console.log('Q - answer', { productVM });

    this.checkoutService
      .updateProduct(productVM)
      .toPromise()
      .then((newShoppingCart) => {
        this.$store.dispatch(
          setShoppingCartCheckout({ shoppingCart: newShoppingCart })
        );
        this.$store.dispatch(
          updateQuestionCheckout({ question: { ...question } })
        );
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
      });
  }

  public moveQuestionTo(index: number): void {
    this.toShowIndex =
      index >= 0 ? index % this.questions.length : this.questions.length - 1;

    this.$store.dispatch(
      setCurrentIndexCheckout({ currentIndex: this.toShowIndex })
    );

    this.chagneUploadInfo();
  }

  public onUploadEvent(fileList: FileList): void {
    this.checkoutService
      .uploadFile(fileList[0])
      .toPromise()
      .then((linkObj) => {
        const newQuestion = {
          ...this.questions[this.toShowIndex],
          images: [linkObj.link],
          image_name: fileList[0].name,
        };

        const lineItem = ShoppingCart.getLineItemWithProductId(
          this.shoppingCart,
          newQuestion.product_id
        );
        const additionalData = JSON.parse(
          JSON.stringify(lineItem.product.additional_data)
        );

        const newQuestions: Question[] = JSON.parse(
          JSON.stringify(this.questions)
        )
          .filter((q) => q.product_id === lineItem.product.id)
          .map((q) => {
            return q.id === newQuestion.id ? { ...newQuestion } : { ...q };
          });

        const productVM: ProductVM = {
          shopping_cart_id: this.shoppingCart.id,
          product_id: newQuestion.product_id,
          line_item_id: lineItem.id,
          additional_data: {
            ...lineItem.additional_data,
            questions: newQuestions,
          },
          quantity: 1,
        };

        console.log('Q - upload', { productVM });

        this.checkoutService
          .updateProduct(productVM)
          .toPromise()
          .then((newShoppingCart) => {
            this.$store.dispatch(
              setShoppingCartCheckout({ shoppingCart: newShoppingCart })
            );
            console.log('Pogledaj state');

            this.$store.dispatch(
              updateQuestionCheckout({ question: { ...newQuestion } })
            );
          })
          .catch((err) => {
            console.error(err);
            alert(err.message);
          });
      });
  }

  private chagneUploadInfo(): void {
    const imageIsUploaded = !!this.questions[this.toShowIndex]?.images?.length;
    this.uploadData.bottomInfo = imageIsUploaded
      ? this.questions[this.toShowIndex].image_name ?? IMAGE_IS_REQUIRED
      : IMAGE_IS_REQUIRED;
  }
}
