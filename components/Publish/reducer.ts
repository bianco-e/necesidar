export const SET_FIELD = "SET_FIELD";

export interface PublishState {
  currentStep: number;
  title: string;
  description: string;
  publicationType?: number;
  images?: string[];
  location: {
    province: string;
    city: string;
  };
  urgency?: number;
  can_move?: boolean;
  email: string;
  phone: string;
}

export const initialState: PublishState = {
  currentStep: 0,
  title: "",
  description: "",
  publicationType: undefined,
  images: undefined,
  location: {
    province: "",
    city: "",
  },
  urgency: undefined,
  can_move: undefined,
  email: "",
  phone: "",
};

export const reducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  const { payload } = action;
  switch (action.type) {
    case SET_FIELD:
      return { ...state, [payload.field]: payload.value };
    default:
      return state;
  }
};
