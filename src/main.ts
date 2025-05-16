const host1 = document.getElementById('shadow-host-1')!;
const shadow1 = host1.attachShadow({ mode: 'open' });
shadow1.innerHTML = `
  <div>
    <p>This is Shadow Root 1</p>
    <div id="nested-host"></div>
  </div>
`;

const nestedHost = shadow1.getElementById('nested-host')!;
const nestedShadow = nestedHost.attachShadow({ mode: 'open' });
nestedShadow.innerHTML = `<p>This is a nested Shadow Root</p>`;

const host2 = document.getElementById('shadow-host-2')!;
const shadow2 = host2.attachShadow({ mode: 'open' });
shadow2.innerHTML = `<p>This is Shadow Root 2</p>`;
