import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  //html reformat
  const sections = footer.querySelectorAll(".section");
    
  if (sections.length >= 3) {
      const secondSection = sections[1]; // Target the second section
      
      // Move content from the third and fourth sections into the second section
      for (let i = 2; i < sections.length; i++) {
          while (sections[i].firstChild) {
              secondSection.appendChild(sections[i].firstChild);
          }
      }
      
      // Remove the now-empty third and fourth sections
      for (let i = sections.length - 1; i >= 2; i--) {
          sections[i].remove();
      }
  }

  block.append(footer);
}

