import Page from '../../components/page';
import { selectors } from '../../components/selectors';
import Table from '../../components/table-winners';

export default class WinnersPage extends Page {
  table: Table;
  
  constructor (id: string) {
    super(id);
    this.createHeaderTitle(selectors.winnersPageTitle,'winners-page-title', 'winners-count-cars');
    this.createPageNumberContainer();
    this.table = new Table();
    this.container.append(this.table.container);
  }

  render() {  
    return this.container;
  } 
}