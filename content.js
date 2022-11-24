
const removeScriptsFromContent = (strCode) => {
    return strCode.replace(/<script.*?>.*?<\/script>/gim, "");
  };


function step() {
    messageTitle = messageTitle.substring(1) + messageTitle.substring(0,1);
    document.title = messageTitle.substring(0,15);
}

  var messageTitle = '';

const article = document.querySelector("body");

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  

 var content =
      document.body["innerText" in document.body ? "innerText" : "textContent"];
    content = removeScriptsFromContent(content);
    var regex = /(poca disponibilidad|con disponibilidad|disponible)[\s.,]/gi;
  
    var totalCats = content.match(regex)?.length ?? 0;

    if(totalCats > 0) {
        //msg = `🚨 ${totalCats} zonas disponibles`;
        //document.title = msg;
        //alert(msg);
  
        const badge = document.createElement("h1");
        // Use the same styling as the publish information in an article's header
        badge.classList.add("color-secondary-text", "type--caption");
        
        messageTitle = `🚨 🚨 🚨  ${totalCats} zonas disponibles A T E N C I Ó N `;

        badge.textContent = messageTitle;

        // Support for API reference docs
        const heading = article.querySelector("h1");
        // Support for article docs with date
        const date = article.querySelector("time")?.parentNode;

        (date ?? heading).insertAdjacentElement("afterend", badge);

        
        //image
        const img = document.createElement("img");
        img.src = chrome.runtime.getURL('images/alert.gif');
        img.style = 'position:fixed; top: 0; right: 0;';

        article.insertAdjacentElement("afterend",img);

    } else
    {
        messageTitle = 'Sin disponibilidad de boletos';
    }

    setTimeout(()=>{
        document.title=messageTitle;

        chrome.runtime.sendMessage({message: "hi"}, (response) => {
            console.log(response.message);
          });

        if(messageTitle.startsWith('🚨')) {
            setInterval(step, 50);
        }

    },2500);
}
