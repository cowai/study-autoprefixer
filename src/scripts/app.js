// scripts
import {
  groupBy
} from 'lodash/collection';
import people from './people';

require('./styles/style.scss');

// images
import codeURL from '../images/code.png'
const img = document.createElement('img')
img.src = codeURL
img.style.backgroundColor = "#2B3A42"
img.style.padding = "20px"
img.width = 32
document.body.appendChild(img)

const managerGroups = groupBy(people, 'manager');
const root = document.querySelector('#root');
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`
