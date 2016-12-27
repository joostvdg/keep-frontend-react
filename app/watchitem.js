/*jshint esversion: 6 */

import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';
import Modal from 'react-bootstrap/lib/Modal';
import Tooltip from 'react-bootstrap/lib/Tooltip';
import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

export function ShowWatchItem(props) {
    const watchItem = props.watchItem;
    return (
        <table>
            <tbody>
                <tr>
                    <th>Identifier</th>
                    <td>{watchItem.identifier}</td>
                </tr>
                <tr>
                    <th>Title</th>
                    <td>{watchItem.title}</td>
                </tr>
                <tr>
                    <th>Sub-Title</th>
                    <td>{watchItem.subtile}</td>
                </tr>
                <tr>
                    <th>Type</th>
                    <td>{watchItem.type}</td>
                </tr>
                <tr>
                    <th>Genre</th>
                    <td>{watchItem.genre}</td>
                </tr>
                <tr>
                    <th>Author</th>
                    <td>{watchItem.author}</td>
                </tr>
                <tr>
                    <th>Publisher</th>
                    <td>{watchItem.publisher}</td>
                </tr>
                <tr>
                    <th>Released In</th>
                    <td>{watchItem.releasedIn}</td>
                </tr>
                <tr>
                    <th>Rating</th>
                    <td>{watchItem.rating}</td>
                </tr>
                <tr>
                    <th>Seen</th>
                    <td>{watchItem.seen}</td>
                </tr>
                <tr>
                    <th>Location</th>
                    <td>{watchItem.location}</td>
                </tr>
                <tr>
                    <th>Is a series</th>
                    <td>{watchItem.isSeries}</td>
                </tr>
                <tr>
                    <th>Number read</th>
                    <td>{watchItem.numberRead}</td>
                </tr>
                <tr>
                    <th>Reference</th>
                    <td>{watchItem.reference}</td>
                </tr>
                <tr>
                    <th>Comment</th>
                    <td>{watchItem.comment}</td>
                </tr>
            </tbody>
        </table>
    );
}

export class ShowWatchItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    close() {
      this.setState({ showModal: false });
    }

    open() {
      this.setState({ showModal: true });
    }

    render() {
      return (
        <div>
            <Button bsStyle="primary" onClick={this.open}>
                show
            </Button>

            <Modal show={this.state.showModal} onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title>WatchItem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ShowWatchItem watchItem={this.props.watchItem} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                </Modal.Footer>
          </Modal>
        </div>
      );
    }
}


export function WatchItem(props) {
    const watchItem = props.watchItem;
    return (
        <tr key={watchItem.identifier}>
            <th>{watchItem.title}</th>
            <td>{watchItem.releasedIn}</td>
            <td>{watchItem.watchType}</td>
            <td>{watchItem.genre}</td>
            <td>{watchItem.seen}</td>
            <td><a href="{watchItem.referenceLink}">{watchItem.referenceLink}</a></td>
            <td>
                <ShowWatchItemModal watchItem={watchItem} />
                <Button bsStyle="danger">Delete</Button>
            </td>
        </tr>
    );
}
