/**
 * 조회용 config
 */
let selectConfig = {
  menus: {
    list: {
      url: '/menus',
      // param: {}
    },
    get: {
      url: '/menus/{0}'
    }
  },
  apiContents: {
    list: {
      url: '/menus/{0}/api_contents',
      // param: {}
    }
  }
};

export default selectConfig;
