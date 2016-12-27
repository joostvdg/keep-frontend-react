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
import {WatchItem, ShowWatchItemModal, ShowWatchItem} from './watchitem.js';

const rest = require('rest');
const mime = require('rest/interceptor/mime');

function formatDate(date) {
    return date.toLocaleDateString();
}

function MainPageHeader(props) {
    return (
        <PageHeader>
            KEEP Frontend ReactJS
            <small>Hello, {props.name}</small>
        </PageHeader>
    );
}

function App(props) {
    return (<MainPage name="Joost"/>);
}



class GetWachtItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            watchItems: ''
        }
    }

    componentDidMount() {
        let client = rest.wrap(mime);
        client({ path: 'http://192.168.99.100:8181/WatchItems',
            headers: {'Accept': 'application/json'}}).then(response => {
            this.setState({watchItems: response.entity});
        });
    }

    render() {
        const watchItemList = this.state.watchItems;
        const arr = watchItemList instanceof Array ? watchItemList : [watchItemList];
        const watchItems = arr.map((watchItem) =>
          <WatchItem watchItem={watchItem}/>
        );

        return (
            <Table responsive>
    			<thead >
    				<tr>
                        <th>Title</th>
                        <th>Year</th>
                        <th>Type</th>
                        <th>Genre</th>
                        <th>Seen</th>
                        <th>Reference</th>
                        <th>Actions</th>
    				</tr>
    			</thead>
    			<tbody>
                    {watchItems}
    			</tbody>
    		</Table>
        );
    }
}

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            welcomeResponse: ''
        }
    }

    componentDidMount() {
        // With rest.js
        var welcomeResponse = null;
        let client = rest.wrap(mime);
        client({ path: 'http://192.168.99.100:8181/welcome' }).then(response => {
            this.setState({welcomeResponse: response.entity});
        });
    }

    render() {
        const welcomeResponse = this.state.welcomeResponse;
        return (
            <h2>{welcomeResponse.content}</h2>
        );
    }
}

function MainPage(props) {
    return (
        <Grid >
            <MainPageHeader name="Joost"/>
            <Jumbotron>
                <Welcome />
            </Jumbotron>
            <Jumbotron>
                <GetWachtItems />
            </Jumbotron>
        </Grid>
    );
}

// Render the APP itself
const app = <App name="Joost"/>;
ReactDOM.render(app, document.getElementById('root'));

// setInterval(app, 100);
