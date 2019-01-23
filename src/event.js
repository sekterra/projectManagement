export default [
  {
    name: 'APP_LOGIN_SUCCESS',
    callback: function (e) {
      this.$router.push({ path: 'dashboard' });
    }
  },
  {
    name: 'APP_LOGOUT',
    callback: function (e) {
      this.snackbar = {
        show: true,
        color: 'green',
        text: 'Logout successfully.'
      };
      this.$router.replace({ path: '/login' });
    }
  },
  {
    name: 'APP_PAGE_LOADED',
    callback: function (e) {
    }
  },
  {
    name: 'APP_AUTH_FAILED',
    callback: function (e) {
      this.$router.push('/login');
      this.$message.error('Token has expired');
    }
  },
  {
    name: 'APP_BAD_REQUEST',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
    }
  },
  {
    name: 'APP_ACCESS_DENIED',
    // @error api response data
    callback: function (msg) {
      this.$message.error(msg);
      this.$router.push('/forbidden');
    }
  },
  {
    name: 'APP_RESOURCE_DELETED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    }
  },
  {
    name: 'APP_RESOURCE_UPDATED',
    // @error api response data
    callback: function (msg) {
      this.$message.success(msg);
    },
  },
  /** 아래 부터 추가된 이벤트 **/
  // axios 및 기타 요청 실패
  {
    name: 'APP_REQUEST_ERROR',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'error',
        text: _message
      };

      //  vue dialog에서 에러 표시
      // this.dialog = {
      //   show: true,
      //   type: 'error',
      //   text: _message
      // }
    }
  },
  // axios 및 기타 요청 설공
  {
    name: 'APP_REQUEST_SUCCESS',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'success',
        text: _message
      };

      //  vue dialog에서 에러 표시
      // this.dialog = {
      //   show: true,
      //   type: 'error',
      //   text: _message
      // }
    }
  },
  // 유효성 검사 오류
  {
    name: 'APP_VALID_ERROR',
    callback: function (_message) {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'warning',
        text: _message
      };
    }
  },
  // axios 및 기타 요청 실패
  {
    name: 'APP_ON_READY',
    callback: function () {
      // snackbar에서 에러 표시
      this.snackbar = {
        show: true,
        color: 'warning',
        text: '해당 기능은 준비중입니다.'
      };
    }
  },
];
