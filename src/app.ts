if (window.__POWERED_BY_QIANKUN__ && window.__AMIS_BASE__) {
  if (process.env.NODE_ENV === 'development') {
    __webpack_public_path__ = '//localhost:9000/fe/amis/static/';
  } else {
    __webpack_public_path__ =
      window.resourceBaseUrl ||
      window.publicPath ||
      window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
  }
  // eslint-disable-next-line no-undef
  window.routerBase = window.__AMIS_BASE__;
}
