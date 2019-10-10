export const DOMAIN = 'http://34.87.118.132/';
// export const DOMAIN = 'http://localhost:8000/';
export const API_URL = `${DOMAIN}api/` ;
export const BASE_URL = `${DOMAIN}api/admin/`;

export const ACCESS_TOKEN_SECRET_KEY = '12asf47asj123kfhc17mxzbja0131klj';

export const AUTH_STATE_KEY = 'AJKFSH3Q897ASKJBVXZZ462187asjfba';

export enum ERouters {
  users = 'users',
  transactions = 'transactions',
  vip_packages = 'vip-packages',
  banners = 'banners',
  auth = 'auth',
  login = 'login',
  dashboard = 'dashboard',
  products = 'products',
  articles = 'articles',
  create = 'create',
  edit = 'edit',
  delete = 'delete',
  list = 'list',
  detail = 'detail',
  policies = 'policies',
  add_member = 'add-member',
  single = 'single',
  notifications = 'notifications',
  action_logs = 'action-logs',
  member_groups = 'member-groups',
  bank_accounts = 'bank-accounts',
  schedule_templates = 'schedule-templates',
  voyages = 'voyages',
  customer_types = 'customer-types',
  schedules = 'schedules',
  orders = 'order'
}
