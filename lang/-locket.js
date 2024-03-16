"use strict";

function setLangPrefs() {
  let lang = window.navigator.language.substring(0, 2).toUpperCase();
  switch (lang) {
    case "EN":
      // do nothing. These translations will only matter later
      break;
    case "RU":
      document.getElementsByTagName("title")[0].innerHTML = "ПРОГОРКЛЫЕ-ПТИЦЫ";
      break;
    default:
      break;
  }
}

lc++;