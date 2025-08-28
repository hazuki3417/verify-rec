import { type ActionType, assertUnreachableActionType } from "./util";

export type DrawRotateActionType = "left" | "right" | "reset";
export interface DrawRotateState {
  current: {
    angle: number;
  };
  initial: {
    angle: number;
  };
  meta: {
    action: ActionType<DrawRotateActionType>;
  };
}

export type DrawRotateAction =
  | { type: "left" }
  | { type: "right" }
  | { type: "reset" };

export const drawRotateReducer = (
  state: DrawRotateState,
  action: DrawRotateAction,
): DrawRotateState => {
  switch (action.type) {
    case "left":
      return {
        ...state,
        current: { angle: state.current.angle - 90 },
        meta: { action: "left" },
      };
    case "right":
      return {
        ...state,
        current: { angle: state.current.angle + 90 },
        meta: { action: "left" },
      };
    case "reset":
      return {
        ...state,
        current: { angle: state.initial.angle },
        meta: { action: "reset" },
      };
    default:
      throw assertUnreachableActionType(action);
  }
};
