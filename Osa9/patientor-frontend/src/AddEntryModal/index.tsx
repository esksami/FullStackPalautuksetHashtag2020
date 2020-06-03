import React from 'react';
import { Modal, Segment, Menu, MenuItemProps } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { EntryFormValues } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues
) => void;
  error?: string;
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => {
  const [currentEntryType, setCurrentEntryType] = React
    .useState<EntryFormValues['type']>("Hospital");

  const handleItemClick = (_e: unknown, data: MenuItemProps) => {
    if (data.name !== "Hospital" && 
        data.name !== "HealthCheck" &&
        data.name !== "OccupationalHealthcare") {
      return;
    }
    setCurrentEntryType(data.name);
  };
  
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <Menu pointing>
          <Menu.Item
            name='Hospital'
            active={currentEntryType === "Hospital"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='HealthCheck'
            active={currentEntryType === "HealthCheck"}
            onClick={handleItemClick}
          />
          <Menu.Item
            name='OccupationalHealthcare'
            active={currentEntryType === "OccupationalHealthcare"}
            onClick={handleItemClick}
          />
        </Menu>
        <AddEntryForm
          onSubmit={onSubmit}
          onCancel={onClose}
          entryType={currentEntryType}/>
      </Modal.Content>
    </Modal>
  );
};

export default AddEntryModal;


// import React, { Component } from 'react'
// import { Input, Menu, Segment } from 'semantic-ui-react'

// export default class MenuExamplePointing extends Component {
//   state = { activeItem: 'home' }

//   handleItemClick = (e, { name }) => this.setState({ activeItem: name })

//   render() {
//     const { activeItem } = this.state

//     return (
//       <div>
//         <Menu pointing>
//           <Menu.Item
//             name='home'
//             active={activeItem === 'home'}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name='messages'
//             active={activeItem === 'messages'}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Item
//             name='friends'
//             active={activeItem === 'friends'}
//             onClick={this.handleItemClick}
//           />
//           <Menu.Menu position='right'>
//             <Menu.Item>
//               <Input icon='search' placeholder='Search...' />
//             </Menu.Item>
//           </Menu.Menu>
//         </Menu>

//         <Segment>
//           <img src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//         </Segment>
//       </div>
//     )
//   }
// }
