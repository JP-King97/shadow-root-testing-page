const host1 = document.getElementById('shadow-host-1')!;
const shadow1 = host1.attachShadow({ mode: 'open' });
shadow1.innerHTML = `
  <div>
    <p>This is Shadow Root 1</p>
    <select>
      <option value="item1">item1</option>
      <option value="item2">item2</option>
      <option value="item3">item3</option>
      <option value="item4">item4</option>
    </select>
    <label style="display:block;margin-top:10px;">
      <input type="checkbox" /> Check me
    </label>
    <div id="nested-host"></div>
  </div>
`;

const nestedHost = shadow1.getElementById('nested-host')!;
const nestedShadow = nestedHost.attachShadow({ mode: 'open' });
nestedShadow.innerHTML = `
  <p>This is a nested Shadow Root</p>
  <input id="letters-input" type="text" placeholder="Only letters" />
  <span id="letters-warning" style="color:red;display:none;">Only letters allowed</span>
  <input id="numbers-input" type="text" placeholder="Only numbers" />
  <span id="numbers-warning" style="color:red;display:none;">Only numbers allowed</span>
`;

const lettersInput = nestedShadow.getElementById('letters-input') as HTMLInputElement;
const lettersWarning = nestedShadow.getElementById('letters-warning')!;
lettersInput.addEventListener('input', () => {
  if (/^[A-Za-z]*$/.test(lettersInput.value)) {
    lettersWarning.style.display = 'none';
  } else {
    lettersWarning.style.display = 'inline';
    lettersInput.value = lettersInput.value.replace(/[^A-Za-z]/g, '');
  }
});

const numbersInput = nestedShadow.getElementById('numbers-input') as HTMLInputElement;
const numbersWarning = nestedShadow.getElementById('numbers-warning')!;
numbersInput.addEventListener('input', () => {
  if (/^[0-9]*$/.test(numbersInput.value)) {
    numbersWarning.style.display = 'none';
  } else {
    numbersWarning.style.display = 'inline';
    numbersInput.value = numbersInput.value.replace(/[^0-9]/g, '');
  }
});

const host2 = document.getElementById('shadow-host-2')!;
const shadow2 = host2.attachShadow({ mode: 'open' });
shadow2.innerHTML = `
  <p>This is Shadow Root 2</p>
  <button id="btn1">Button 1</button>
  <button id="btn2">Button 2</button>
  <span id="tooltip-target" style="margin-left:10px;position:relative;cursor:pointer;">Hover me
    <span id="tooltip" style="display:none;position:absolute;left:0;top:20px;background:#333;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;z-index:10;">This is a tooltip!</span>
  </span>
`;

const tooltipTarget = shadow2.getElementById('tooltip-target');
const tooltip = shadow2.getElementById('tooltip');
if (tooltipTarget && tooltip) {
  tooltipTarget.addEventListener('mouseenter', () => {
    tooltip.style.display = 'block';
  });
  tooltipTarget.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });
}

const showMessage = (msg: string) => {
  alert(msg);
};

// Add button click logic for 2nd shadow root
const btn1 = shadow2.getElementById('btn1');
const btn2 = shadow2.getElementById('btn2');
if (btn1) {
  btn1.addEventListener('click', () => {
    showMessage("you've succesfully press Button 1 (2nd shadow-root)");
  });
}
if (btn2) {
  btn2.addEventListener('click', () => {
    showMessage("you've succesfully press Button 2 (2nd shadow-root)");
  });
}

// Side panel button logic
const sidePanel = document.getElementById('side-panel');
if (sidePanel) {
  const buttons = sidePanel.querySelectorAll('button');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const msg = `you've succesfully press ${btn.textContent} (side panel)`;
      let msgDiv = document.createElement('div');
      msgDiv.textContent = msg;
      msgDiv.style.position = 'fixed';
      msgDiv.style.top = '20px';
      msgDiv.style.right = '20px';
      msgDiv.style.background = '#222';
      msgDiv.style.color = '#fff';
      msgDiv.style.padding = '12px 20px';
      msgDiv.style.borderRadius = '6px';
      msgDiv.style.zIndex = '9999';
      document.body.appendChild(msgDiv);
      setTimeout(() => {
        msgDiv.remove();
      }, 5000);
    });
  });
}

// Add a new shadow host for 4-level nested shadow roots
const mainDiv = document.getElementById('main');
if (mainDiv) {
  const host3 = document.createElement('div');
  host3.id = 'shadow-host-3';
  host3.className = 'shadow-host';
  mainDiv.appendChild(host3);

  // Helper for select options
  const getSelect = (level: number) => `
    <select>
      <option value="option1">Level ${level} - Option 1</option>
      <option value="option2">Level ${level} - Option 2</option>
      <option value="option3">Level ${level} - Option 3</option>
    </select>
  `;

  // Helper for message
  const showShadowMsg = (btnText: string, location: string) => {
    let msgDiv = document.createElement('div');
    msgDiv.textContent = `you've succesfully press ${btnText} (${location})`;
    msgDiv.style.position = 'fixed';
    msgDiv.style.top = '20px';
    msgDiv.style.right = '20px';
    msgDiv.style.background = '#222';
    msgDiv.style.color = '#fff';
    msgDiv.style.padding = '12px 20px';
    msgDiv.style.borderRadius = '6px';
    msgDiv.style.zIndex = '9999';
    document.body.appendChild(msgDiv);
    setTimeout(() => {
      msgDiv.remove();
    }, 5000);
  };

  // Level 1
  const shadow3_1 = host3.attachShadow({ mode: 'open' });
  shadow3_1.innerHTML = `
    <div>
      <button id="btn-l1">Level 1 Button</button>
      <input id="input-l1" maxlength="30" placeholder="Max 30 characters" />
      ${getSelect(1)}
      <div id="host-l2"></div>
    </div>
  `;
  const btnL1 = shadow3_1.getElementById('btn-l1');
  if (btnL1) {
    btnL1.addEventListener('click', () => showShadowMsg('Level 1 Button', 'shadow-root level 1'));
  }

  // Level 2
  const hostL2 = shadow3_1.getElementById('host-l2');
  const shadow3_2 = hostL2!.attachShadow({ mode: 'open' });
  shadow3_2.innerHTML = `
    <div>
      <button id="btn-l2">Level 2 Button</button>
      <input id="input-l2" maxlength="30" placeholder="Max 30 characters" />
      ${getSelect(2)}
      <div id="host-l3"></div>
    </div>
  `;
  const btnL2 = shadow3_2.getElementById('btn-l2');
  if (btnL2) {
    btnL2.addEventListener('click', () => showShadowMsg('Level 2 Button', 'shadow-root level 2'));
  }

  // Level 3
  const hostL3 = shadow3_2.getElementById('host-l3');
  const shadow3_3 = hostL3!.attachShadow({ mode: 'open' });
  shadow3_3.innerHTML = `
    <div>
      <button id="btn-l3">Level 3 Button</button>
      <input id="input-l3" maxlength="30" placeholder="Max 30 characters" />
      ${getSelect(3)}
      <div id="host-l4"></div>
    </div>
  `;
  const btnL3 = shadow3_3.getElementById('btn-l3');
  if (btnL3) {
    btnL3.addEventListener('click', () => showShadowMsg('Level 3 Button', 'shadow-root level 3'));
  }

  // Level 4
  const hostL4 = shadow3_3.getElementById('host-l4');
  const shadow3_4 = hostL4!.attachShadow({ mode: 'open' });
  shadow3_4.innerHTML = `
    <div>
      <button id="btn-l4">Level 4 Button</button>
      <input id="input-l4" maxlength="30" placeholder="Max 30 characters" />
      ${getSelect(4)}
    </div>
  `;
  const btnL4 = shadow3_4.getElementById('btn-l4');
  if (btnL4) {
    btnL4.addEventListener('click', () => showShadowMsg('Level 4 Button', 'shadow-root level 4'));
  }
}
