"use strict";

let uniLoc = "EN";
function setLangPrefs() {
  let tCounter = 0;
  let lang = window.navigator.language.substring(0, 2).toUpperCase();
  uniLoc = lang;
  let lcr
  function langSwitch(loc) {
    tCounter++;
    switch (lang) {
      case "EN":
        // do nothing. These translations will only matter later
        break;
      case "RU":
        document.getElementsByTagName("title")[0].innerHTML = "ПРОГОРКЛЫЕ-ПТИЦЫ";
        break;
      default:
        lang = "EN"
        if (counter <= 5)
        {
          langSwitch("EN")
        }
        break;
      return lang;
    }
  langSwitch(lang);
  uniLoc = lang;
  }
}

lc++;
