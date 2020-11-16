import { Question } from 'src/models/Question.model';
import { QuestionDTO } from 'src/models/QuestionDTO.model';
import { TabbarText } from 'src/models/TabbarText.model';
import { BREAKING_POINT_PX } from '../app.config';
import { TabbarButton } from './tabbar/tabbar.content';

/**
 * Generates arraye with ragne values for start to end
 * @param {numbet} start value where range starts
 * @param {numbet} end value where range ends
 * @return {number[]} range of number between start and end including them.
 */
export const range = (start: number, end: number): number[] => {
  const ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

export const convertQuestionsDTOListToQuestionsList = (
  questionDTOList: Record<string, QuestionDTO[]>,
  product: { id: number }
): Question[] => {
  let buffQuestions: Question[] = [];

  Object.keys(questionDTOList).forEach((key) => {
    buffQuestions = [
      ...buffQuestions,
      ...questionDTOList[key].map((question) => {
        return new Question({
          id: question.id,
          product_id: product.id,
          question: question.question,
          image_required: question.image_required,
          section: key,
        });
      }),
    ];
  });

  return buffQuestions;
};

export const formatQuestionDictToList = (
  questionDTOList: Record<string, QuestionDTO[]>
): QuestionDTO[] => {
  let buffQuestions: QuestionDTO[] = [];

  Object.values(questionDTOList).forEach((list) => {
    buffQuestions = [...buffQuestions, ...list];
  });

  return buffQuestions;
};

export const updateTabbarBtnComplitedState = (
  tabbarBtnList: TabbarButton[],
  btnText: TabbarText,
  isComplited: boolean = true
): TabbarButton[] => {
  return tabbarBtnList.map((btn: TabbarButton) => {
    return btn.text === btnText
      ? { ...btn, isCompleted: isComplited }
      : { ...btn };
  });
};

export const calculateFinishedQuestions = (questions: Question[]): number => {
  return questions && questions.length
    ? questions.filter((q) => isQuestionFullyAnswerd(q)).length
    : 0;
};

// Image is not required...
export const isQuestionFullyAnswerd = (question: Question): boolean => {
  return question.isAnswerd;
};

export const getClientWidthPX = (): number => {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
};

export const isHandset = (
  breakingPoint: number = BREAKING_POINT_PX
): boolean => {
  return breakingPoint > getClientWidthPX();
};

export const firstToUpperCase = (str: string): string => {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();
};

export const clone = (x: Object | Array<any>): Object | Array<any> => {
  return JSON.parse(JSON.stringify(x));
};
