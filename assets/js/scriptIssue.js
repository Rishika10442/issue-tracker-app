// const existingLabels = ['Label 1', 'Label 2', 'Label 3'];

function showLabels(existingLabels) {
  const labelInput = document.getElementById('label');
  const labelDropdown = document.getElementById('label-dropdown');

  // Clear the dropdown first
  labelDropdown.innerHTML = '';
  // If the label input is not empty, show matching existing labels
  if (labelInput.value !== '') {
    const matchingLabels = existingLabels.filter(label => label.toLowerCase().startsWith(labelInput.value.toLowerCase()));
    matchingLabels.forEach(label => {
      const labelOption = document.createElement('div');
      labelOption.innerText = label;
      labelOption.addEventListener('click', () => {
        // Add the selected label to the input field
        labelInput.value = label;
        // Hide the dropdown
        labelDropdown.innerHTML = '';
      });
      labelDropdown.appendChild(labelOption);
    });
  }
}