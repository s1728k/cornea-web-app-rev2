/**
 * Created by abhijeet on 31/5/17.
 */
export const projectManager = 'Project Manager';
export const supervisor = 'Supervisor';
export const executive = 'Executive';
export const projectManagerId = 1;
export const supervisorId = 2;
export const executiveId = 3;
export const GET_METHOD = 'get';
export const POST_METHOD = 'post';
export const DELETE_METHOD = 'delete';
export const PUT_METHOD = 'put';
export const USER_END_POINT = 'http://192.168.0.205:8070/api';
export const LOGIN_END_POINT = 'http://49.50.76.29:8080/v1/login';
export const USER_SERVICE_NAME = '/users';
export const ACTION_ALL = '/all';
/*** Keys for storing user data in StorageService ***/
export const USER_OBJECT = 'user_object';
export const USER_FULL_NAME = 'user_full_name';
export const USER_FIRST_NAME = 'first_name';
export const USER_LAST_NAME = 'last_name';
export const USER_ID = 'id';
export const USER_IS_SMP = 'is_smp';
export const USER_API_TOKEN = 'api_token';
export const USER_COMPANY_ID = 'company_id';
export const USER_GROUP_ID = 'group_id';
export const USER_EMAIL = 'email';
/*** for boq upload screen ***/
export const BASE_URL_PROJECT = 'http://49.50.76.29:8090/api';
export const SERVICE_NAME_PROJECT = '/project';
export const SERVICE_NAME_BOQ = '/boq';
export const BASE_URL_BOQ = 'http://49.50.76.29:80/api';
export const APPENDS_LINE_ITEMS_BOQ = 'appends[]=lineitems';

// HTTP Error Messages
export const BAD_REQUEST_TITLE = '400 Bad Request';
export const HTTP_ERROR_TITLE =  'HTTP ERROR';
export const BAD_REQUEST_DESCRIPTION = 'The request cannot be fulfilled due to bad syntax';
export const UNAUTHORIZED_TITLE = '401 Unauthorized';
export const UNAUTHORIZED_DESCRIPTION = 'The request was a legal request, but the server is refusing to respond to it.'
export const NOT_FOUND_TITLE = '404 Not Found';
export const NOT_FOUND_DESCRIPTION = 'The requested page could not be found but may be available again in the future';
export const INTERNAL_SERVER_ERROR_TITLE = '500 Internal Server Error';
export const INTERNAL_SERVER_ERROR_DESCRIPTION = 'Internal Server Error has occured';
export const NETWORK_AUTHENTICATION_TITLE = '511 Network Authentication Required';
export const NETWORK_AUTHENTICATION_DESCRIPTION = 'The client needs to authenticate to gain network access';
export const PAYMENT_REQUIRED_TITLE = '402 Payment Required';
export const PAYMENT_REQUIRED_DESCRIPTION = 'Reserved for future use';
export const FORBIDDEN_TITLE = '403 Forbidden';
export const FORBIDDEN_DESCRIPTION = 'The request was a legal request, but the server is refusing to respond to it';
export const SERVERNOTFOUND = 'Server Not Found';
export const USERNOTEXIST = 'USER NOT EXIST';
export const SERVICE_UNAVAILABLE_TITLE = '503 Service Unavailable';
export const SERVICE_UNAVAILABLE_DESCRIPTION = 'The server is currently unavailable (overloaded or down)';
export const INVALID_USERNAME_PASSWORD = 'INVALID USERNAME AND PASSWORD';
export const SERVER_PROBLEM = 'There is some problem in the server';
export const TITLE = 'This is an Alert Dialog';
