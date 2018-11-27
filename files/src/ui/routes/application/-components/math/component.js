import Component, { tracked } from 'sparkles-component';

export default class Math extends Component {
  @tracked baseNumber = 1;
  @tracked multiplier = 2;

  @tracked('baseNumber', 'multiplier')
  get result() {
    return this.baseNumber * this.multiplier;
  }
}