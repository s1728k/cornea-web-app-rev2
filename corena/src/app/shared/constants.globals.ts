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
/*** for Rate Analysis Screens (Display and Create) ***/
export const BASE_URL_GLOBAL_RATE_ANALYSIS = 'http://49.50.76.29/api';
export const SERVICE_NAME_GLOBAL_RATE_ANALYSIS = '/gra';
export const APPENDS_QUERY_GRA_WITH_BOQ_ID = 'appends[]=mainRateAnalysis&appends[]' +
  '=materialRateAnalysis&appends[]=labourRateAnalysis';
export const CONDITION_BOQ_ID = '&conditions[boq_id]=';
export const QUERY_SYMBOL = '?';
export const APPENDS_LINE_ITEM  = 'appends[]=lineItems';
export const HIDDEN_CREATED_AT_UPDATED_AT = 'hidden[]=created_at&hidden[]=updated_at';
export const URL_QUERY_ADDITION = '&';
export const VISIBLE_NAME_ID = 'visible[]=name&visible[]=id';
export const VISIBLE_TITLE_ID = 'visible[]=title&visible[]=id';
export const SERVICE_NAME_REPORT = '/report';
