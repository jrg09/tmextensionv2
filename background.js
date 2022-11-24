chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {

      console.log('hi from background.js');
      
      if (request.message === "hi")
        sendResponse({message: "hi to you"});
        chrome.windows.update(-2, {drawAttention: true});

        

    });