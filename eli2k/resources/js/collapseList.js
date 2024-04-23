document.addEventListener('DOMContentLoaded', () => {
  // Check if the page contains the required element
  const pageContent = document.querySelector('div.page-content.blog.border');
  if (!pageContent) {
    return; // Exit the script if the element is not found
  }

  // Get all the header elements (h3, h4, h5, h6) within the page content
  const headers = pageContent.querySelectorAll('h3, h4, h5, h6');

  // Loop through each header element
  headers.forEach((header) => {
    // Get the parent div of the header
    const parentDiv = header.nextElementSibling;

    // Check if the parent div has any child elements
    const childElements = Array.from(parentDiv.children);
    if (childElements.length) {
      // Hide the child elements by default
      childElements.forEach((child) => {
        child.classList.add('hidden');
      });

      // Add a click event listener to the header element
      header.addEventListener('click', () => {
        // Toggle the display of the child elements
        childElements.forEach((child) => {
          child.classList.toggle('hidden');
        });

        // Toggle the icon and class on the header element
        header.classList.toggle('expanded');
        const iconElement = header.querySelector('.icon');
        if (iconElement) {
          iconElement.innerHTML = (iconElement.innerHTML === '+') ? '-' : '+';
        }
      });

      // Add a plus or minus icon to the header element
      const iconElement = document.createElement('span');
      iconElement.classList.add('icon');
      iconElement.innerHTML = '+';
      header.insertBefore(iconElement, header.firstChild);
    }
  });

  // Get the toggle button
  const toggleButton = document.getElementById('toggle-all-btn');

  // Add the 'show-all' class to the toggle button element by default
  toggleButton.classList.add('show-all');

  // Add a click event listener to the toggle button
  toggleButton.addEventListener('click', () => {
    const shouldExpand = toggleButton.classList.contains('show-all');

    headers.forEach((header) => {
      const parentDiv = header.nextElementSibling;
      const childElements = Array.from(parentDiv.children);

      if (shouldExpand) {
        childElements.forEach((child) => {
          child.classList.remove('hidden');
        });
        header.classList.add('expanded');
        const iconElement = header.querySelector('.icon');
        if (iconElement) {
          iconElement.innerHTML = '-';
        }
      } else {
        childElements.forEach((child) => {
          child.classList.add('hidden');
        });
        header.classList.remove('expanded');
        const iconElement = header.querySelector('.icon');
        if (iconElement) {
          iconElement.innerHTML = '+';
        }
      }
    });

    toggleButton.classList.toggle('show-all');
    toggleButton.classList.toggle('hide-all');
    toggleButton.innerHTML = shouldExpand ? 'Hide All' : 'Show All';
  });
});
