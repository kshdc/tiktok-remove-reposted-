const initiateRepostsVideosRemoval = async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const stopScript = (message, error = "") => {
      console.log(`${message}. Stopping script...`, error && { error });
    };
  
    const clickElement = async (selector, errorMsg) => {
      const el = document.querySelector(selector);
      el ? (el.click(), console.log(`Successfully clicked: ${selector}.`)) : stopScript(errorMsg);
      await sleep(5000);
    };
  
    try {
      console.log("Script started: Initiating actions...");
      await clickElement('[class*="PRepost"]', "Unable to locate the 'Reposts' tab.");
      await clickElement('[class*="DivPlayerContainer"]', "your reposted videos list is empty");
      
      const interval = setInterval(async () => {
        const repostButton = document.querySelector('[data-e2e="video-share-repost"]');
        const nextVideoButton = document.querySelector('[data-e2e="arrow-right"]');
        repostButton ? repostButton.click() && console.log("Successfully removed the reposted from the current video.") : (clearInterval(interval), stopScript("error"));
  
        if (!nextVideoButton || nextVideoButton.disabled) {
          clearInterval(interval);
          const closeVideoButton = document.querySelector('[data-e2e="browse-close"]');
          closeVideoButton ? closeVideoButton.click() && console.log("closed the video.") : stopScript("error");
          return;
        }
        nextVideoButton.click();
        console.log("next reposted video.");
      }, 2000);
      
    } catch (error) {
      stopScript("Error", error);
    }
  };
  
  initiateRepostsVideosRemoval();
  
