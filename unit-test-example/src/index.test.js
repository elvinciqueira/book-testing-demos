import { fireEvent } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

let dom;
let container;

describe('index.html', () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: 'dangerously' });
    container = dom.window.document.body;
  });

  it('Uses the arrow keys to focus on other tabs', () => {
    const firstTab = container.querySelector('#nils');
    fireEvent.keyDown(firstTab, { key: 'ArrowRight' });

    expect(firstTab).not.toHaveFocus();
    expect(firstTab).toHaveAttribute('tabindex', '-1');

    const secondTab = container.querySelector('#agnes');
    expect(secondTab).toHaveFocus();
    expect(secondTab).not.toHaveAttribute('tabindex');

    fireEvent.keyDown(secondTab, { key: 'ArrowLeft' });
    fireEvent.keyDown(firstTab, { key: 'ArrowLeft' });
    const thirdTab = container.querySelector('#complex');
    expect(thirdTab).toHaveFocus();
    expect(thirdTab).not.toHaveAttribute('tabindex');
    expect(firstTab).toHaveAttribute('tabindex');
    expect(secondTab).toHaveAttribute('tabindex');
  });

  it('only shows panels for the active tab and activates panels appropriately', () => {
    const firstTab = container.querySelector('#nils');
    const firstTabControls = firstTab.getAttribute('aria-controls');
    const firstPanel = container.querySelector(`#${firstTabControls}`);

    expect(firstPanel).not.toHaveAttribute('hidden');
    expect(firstTab).toHaveAttribute('aria-selected', 'true');

    const secondTab = container.querySelector('#agnes');
    const secondTabControls = secondTab.getAttribute('aria-controls');
    const secondPanel = container.querySelector(`#${secondTabControls}`);
    expect(secondPanel).toHaveAttribute('hidden');
    expect(secondTab).toHaveAttribute('aria-selected', 'false');

    fireEvent.click(secondTab);
    expect(firstTab).toHaveAttribute('aria-selected', 'false');
    expect(secondTab).toHaveAttribute('aria-selected', 'true');
    expect(firstPanel).toHaveAttribute('hidden');
    expect(secondPanel).not.toHaveAttribute('hidden');
  });
});
