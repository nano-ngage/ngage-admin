import Inferno from 'inferno';
import Component from 'inferno-component';

export default class List extends Component {
  render() {
    const ItemType = this.props.itemType;
    const items = this.props.items || [];
    const markupItems = this.createItemsMarkup(items, ItemType);

    return (
      <ul>
        {markupItems}
      </ul>
    );
  }

  createItemsMarkup(items, Type) {
    const markupItems = items.map((item, index) => {
      return (
        <li key={index} >
          <Type data={item} />
        </li>
      );
    });

    return markupItems;
  }
}
