export const RENDER_TYPES = {
  DOM: 'dom',
  STRING: 'string',
  TMPL: 'tmpl',
};

const routerPrexix = '/api/v1';
export const routerPaths = {
  menu: `${routerPrexix}/`,
  signin: `${routerPrexix}/signin`,
  signup: `${routerPrexix}/signup`,
  profile: `${routerPrexix}/users`,
  scoreboard: `${routerPrexix}/users`,
  rules: `${routerPrexix}/rules`,
  authors: `${routerPrexix}/authors`,
  store: `${routerPrexix}/store`,
};
