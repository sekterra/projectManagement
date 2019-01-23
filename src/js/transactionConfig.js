/**
 * 수정용 config
 */
let transactionConfig = {
  menus: {
    insert: {
      url: '/menus',
      param: {
        name: null,
        path: null,
        orderNo: 0
      }
    },
    edit: {
      url: '/menus/{0}'
      // param: {}
    },
    delete: {
      url: '/menus/{0}'
    }
  },
  apiContents: {
    insert: {
      url: '/menus/{0}/api_contents'
    },
    edit: {
      url: '/menus/{0}/api_contents/{1}',
      param: {
        id: null,
        content: null
      }
    },
    delete: {
      url: '/menus/{0}/api_contents/{1}'
    }
  }
};

export default transactionConfig;
