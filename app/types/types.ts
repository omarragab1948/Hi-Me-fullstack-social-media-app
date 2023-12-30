export type LoginInputs = {
  email: string;
  password: string;
};
export type SignUpInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
};
export type UserType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  gender: string;
};
export type SignUp = {
  json():
    | {
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        dob: any;
        gender: any;
        image: string;
      }
    | PromiseLike<{
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        dob: any;
        gender: any;
        image: string;
      }>;
};
export type MenuTypes = {
  title: string;
  list: string[];
};
