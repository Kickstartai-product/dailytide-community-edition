const MIN_PASSWORD_LENGTH = 8;
const QUERY_LIMIT = 100;
const MS_PER_DAY = 86400000; //86400000 = 24u*60m*60s*1000ms.
const MIN_COMMENT_LENGTH = 2;
const MAX_COMMENT_LENGTH = 500;

const SERVER_CONNECTION = "Daily Tide backend server running, processor : ";
const DATABASE_CONNECTION = "Connected to database";
const HEALTHY = "Healthy";

const INVALID_ID = "Invalid ID.";
const NOT_FOUND = "Not Found.";
const INVALID_REQUEST = "Invalid request.";
const INVALID_ACCOUNT_DATA = "The email or password does not fulfill the requirements.";
const INVALID_EMAIL = "Invalid email.";

const SUCCESS = "Success";
const ALREADY_EXISTS = "This email is already registered.";
const SERVER_ERROR = "Unable to process your request, please try again later.";
const PASSWORD_LENGTH_ERROR = `Password length should be at least ${MIN_PASSWORD_LENGTH} characters.`;
const INVALID_TOKEN = "Invalid token.";
const AUTHENTICATION_ERROR = "Authentication Failed.";
const LENGTH_ERROR = "Length Error.";
const GENERATE_KEY_ERROR = "There was a problem generating an activation key.";
const EMAIL_WHITELIST_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ACTIVATION_EMAIL_TITLE: string = "Activate your account now!";
const ACTIVATION_EMAIL_SENDER = {
  name: "The Daily Tide",
  email: "noreply@thedailytide.ai",
};
const ACTIVATION_KEY_INVALID = "This activation key is not valid or is malformated.";
const ACTIVATION_FAILED = "User already active or key is invalid.";
const ACTIVATION_SUCCESS = "User has been activated successfuly.";
const ACTIVATION_SERVICE_DOWN = "The activation service is down, please try again later.";

const ERRORS = {
  USER_NOT_FOUND: "User not found.",
  INVALID_PASSWORD: "Invalid password.",
  USER_ALREADY_EXISTS: "User already exists.",
  REGISTRATION_FAILED: "Registration failed.",
  INTERNAL_SERVER_ERROR: "Internal Server Error.",
};

const JWT = {
  lifetime: 24 * 60 * 60,
};

export {
  SERVER_CONNECTION,
  DATABASE_CONNECTION,
  HEALTHY,
  INVALID_ID,
  NOT_FOUND,
  QUERY_LIMIT,
  MS_PER_DAY,
  INVALID_REQUEST,
  INVALID_ACCOUNT_DATA,
  SUCCESS,
  ALREADY_EXISTS,
  SERVER_ERROR,
  PASSWORD_LENGTH_ERROR,
  INVALID_TOKEN,
  AUTHENTICATION_ERROR,
  ERRORS,
  JWT,
  LENGTH_ERROR,
  MAX_COMMENT_LENGTH,
  MIN_COMMENT_LENGTH,
  GENERATE_KEY_ERROR,
  ACTIVATION_EMAIL_TITLE,
  ACTIVATION_EMAIL_SENDER,
  ACTIVATION_KEY_INVALID,
  ACTIVATION_FAILED,
  ACTIVATION_SUCCESS,
  ACTIVATION_SERVICE_DOWN,
  INVALID_EMAIL,
  EMAIL_WHITELIST_REGEX,
};
