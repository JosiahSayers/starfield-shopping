import { JSDOM } from 'jsdom';
import { writeFile } from 'fs/promises';
import path from 'path';

const urls = {
  resources: 'https://inara.cz/starfield/resources/'
};

async function scrape() {
  const resourcesRes = await fetch(urls.resources);
  const text = await resourcesRes.text();
  const dom = new JSDOM(text);
  const table = dom.window.document.querySelector('table');
  const rows = table?.querySelectorAll('tr');
  const resources = Array.from(rows)
    .map(row => {
      const dataNodes = row.querySelectorAll('td');
      return {
        name: dataNodes[0]?.textContent,
        shortName: dataNodes[1]?.textContent,
        rarity: dataNodes[2]?.textContent,
        type: dataNodes[3]?.textContent,
        mass: Number(dataNodes[4]?.textContent),
        value: Number(dataNodes[5]?.textContent),
        valueToMass: Number(dataNodes[6]?.textContent)
      };
    })
    .filter(resource => Object.values(resource).some(value => !!value));
  await writeFile(path.join(process.cwd(), 'src', 'data', 'resources.json'), JSON.stringify(resources, null, 2), { encoding: 'utf8' });
}

scrape();
