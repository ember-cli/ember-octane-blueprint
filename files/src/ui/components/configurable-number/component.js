import Component from 'sparkles-component';

export default class Math extends Component {
  add() {
    const { value, onChange } = this.args;

    onChange(value + 1);
  }

  subtract() {
    const { value, onChange } = this.args;

    onChange(value - 1);
  }
}