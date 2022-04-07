//Show options and install message on first install only.
function handleInstalled(details) {
    if (details.reason == 'install') {
        let createData = {
            focused: true,
            type: "popup",
            url: "popup/install.html",
            width: 365,
            height: 750,
        };
        let creating = chrome.windows.create(createData);
    }
}

chrome.runtime.onInstalled.addListener(handleInstalled);

//Block amazon ad requests
chrome.webRequest.onBeforeRequest.addListener(
  function(requestDetails) {
      if (requestDetails.url.includes('amazon.co.uk')) {
  if (requestDetails.url.includes('aradb-21')) {
  return null;
  }
  if (requestDetails.url.length < 33 || requestDetails.url.includes('amazon.co.uk/gp/feature.html')) {
  return null;
  }
  return {
    redirectUrl: "https://links.amazonapps.workers.dev/"+requestDetails.url
  };
  }
  return {
    cancel: true
  };
  },
  {urls: ["*://*.amazon.co.uk/*"]},
  ["blocking"]
);
