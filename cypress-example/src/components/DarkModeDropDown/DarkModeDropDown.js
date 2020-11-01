import React, { useState, useEffect, useRef } from "react";

const DarkModeDropDown = () => {
  const storageKey = "color-scheme";
  const [colorScheme, setColorScheme] = useState("system-default");
  const menuWrapper = useRef(null);

  useEffect(() => {
    const storedColorScheme = localStorage.getItem(storageKey);
    if (storedColorScheme) {
      setColorScheme(storedColorScheme);
    }

    document.body.dataset.colorScheme = colorScheme;
  }, [colorScheme]);

  const switchColorScheme = (e) => {
    const targetColorScheme = e.target.getAttribute("id");
    setColorScheme(targetColorScheme);
    localStorage.setItem(storageKey, targetColorScheme);
  };

  const focusOnMenu = () => {
    menuWrapper.current.focus();
  };

  return (
    <div id="user-preferences">
      <button className="button" id="color-scheme" onClick={focusOnMenu}>
        Theme
      </button>
      <fieldset id="radio-wrapper" ref={menuWrapper} tabIndex="-1">
        <legend className="sr-only">Theme</legend>
        <div>
          <input
            id="system-default"
            type="radio"
            name="theme"
            onClick={switchColorScheme}
          />
          <label htmlFor="system-default">System Default</label>
        </div>
        <div>
          <input
            id="light"
            type="radio"
            name="theme"
            onClick={switchColorScheme}
          />
          <label htmlFor="light">Light</label>
        </div>
        <div>
          <input
            id="dark"
            type="radio"
            name="theme"
            onClick={switchColorScheme}
          />
          <label htmlFor="dark">Dark</label>
        </div>
      </fieldset>
    </div>
  );
};

export default DarkModeDropDown;
