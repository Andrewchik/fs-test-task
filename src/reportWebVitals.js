function reportWebVitals(onPerfEntry) {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    require('web-vitals').then(function (webVitals) {
      var getCLS = webVitals.getCLS,
        getFID = webVitals.getFID,
        getFCP = webVitals.getFCP,
        getLCP = webVitals.getLCP,
        getTTFB = webVitals.getTTFB;

      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
}

module.exports = reportWebVitals;
