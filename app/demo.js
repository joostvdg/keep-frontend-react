/*jshint esversion: 6 */


import React from 'react';
import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/lib/Jumbotron';
import Button from 'react-bootstrap/lib/Button';
import PageHeader from 'react-bootstrap/lib/PageHeader';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Table from 'react-bootstrap/lib/Table';

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

function ShowAvatar(props) {
    return <img className="Avatar" src={props.author.avatarUrl} alt={props.author.name}/>
}

function Comment(props) {
    return (
        <div className="Comment">
            <div className="UserInfo">
                <ShowAvatar author={props.author}/>
                <div className="UserInfo-name">
                    <h1 >
                        {props.author.name}
                    </h1>
                </div>
            </div>
            <div className="Comment-text">
                <p>
                    {props.text}
                </p>
            </div>
            <div className="Comment-date">
                <p>
                    {formatDate(props.date)}
                </p>
            </div>
        </div>
    );
}

class TimeTicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({date: new Date()});
    }

    render() {
        return (
            <div>
                <h2>
                    It is {this.state.date.toLocaleTimeString()}.
                </h2>
            </div>
        );
    }
}

function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) => <li key={number.toString()}>
        {number}
    </li>);
    return (
        <ul>
            {listItems}
        </ul>
    );
}

class CollapsiblePannel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            numbers: [1, 2, 3, 4, 5]
        };

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState(prevState => ({
            open: !prevState.open
        }));
    }

    render() {
        return (
            <div >
                <Button onClick={this.handleClick}>
                    click
                </Button>
                <Panel collapsible expanded={this.state.open}>
                    <NumberList numbers={this.state.numbers}/>
                </Panel>
            </div>
        );
    }
}

function LoginButton(props) {
    return (
        <Button bsStyle="success" onClick={props.onClick}>
            Login
        </Button>
    );
}

function LogoutButton(props) {
    return (
        <Button bsStyle="warning" onClick={props.onClick}>
            Logout
        </Button>
    );
}

class LoginControll extends React.Component {
    constructor(props) {
        super(props)
        this.handleLoginClick = this.handleLoginClick.bind(this)
        this.handleLogoutClick = this.handleLogoutClick.bind(this)
        this.state = {
            isLoggedIn: false
        }
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true})
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false})
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;

        let button = null; // init for later use
        if (isLoggedIn) {
            button = <LogoutButton onClick = {
                this.handleLogoutClick
            }
            />;
        } else {
            button = < LoginButton onClick = { this.handleLoginClick }
            / >;
        }

        return (
            <div>
                {button}
            </div>
        );
    }
}

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value})
    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>
            The water would boil.
        </p>;
    }
    return <p>
        The water would not boil.
    </p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: '23'
        };
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const value = this.state.value;
        return (
            <fieldset >
                <legend >
                    Enter temperature in Celsius:
                </legend>
                <input value={value} onChange={this.handleChange}/>
                <BoilingVerdict celsius={parseFloat(value)}/>
            </fieldset>
        );
    }
}

function WatchItem(props) {
    const watchItem = props.watchItem;
    return (
        <tr key={watchItem.identifier}>
            <td>{watchItem.identifier}</td>
            <td>{watchItem.title}</td>
            <td>{watchItem.type}</td>
        </tr>
    )
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
        console.log('watchItems: ', watchItemList);
        const watchItems = arr.map((watchItem) =>
          <WatchItem watchItem={watchItem}/>
        );
        //var watchItems = this.state.watchItemList(watchItem =>
	//		<WatchItem key={watchItem.identifier} watchItem={watchItem}/>
	//	);

        return (
            <Table responsive>
    			<thead >
    				<tr>
    					<th>Id</th>
    					<th>Title</th>
    					<th>Type</th>
    				</tr>
    			</thead>
    			<tbody>
                    {watchItems}
    			</tbody>
    		</Table>
        );
    }
}

class TestRestJS extends React.Component {

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
            console.log('response: ', response.entity);
            this.setState({welcomeResponse: response.entity});
        });

        //rest('http://192.168.99.100:8181/welcome').then(function(response) {
        //  console.log('response: ', response);
        //});
        // With Fetch()
        /*
        fetch("http://192.168.99.100:8181/welcome")
                .then( (response) => {
                    return response.json() })
                        .then( (json) => {
                            console.log('response: ', json);
                        });
        */
    }

    render() {
        const welcomeResponse = this.state.welcomeResponse;
        console.log('welcomeResponse: ', welcomeResponse);
        return (
            <Table responsive>
    			<thead >
    				<tr>
    					<th>Id</th>
    					<th>Timestamp</th>
    					<th>Greeting</th>
    				</tr>
    			</thead>
    			<tbody>
    				<tr>
    					<td>{welcomeResponse.id}</td>
    					<td>{welcomeResponse.timestamp}</td>
    					<td>{welcomeResponse.content}</td>
    				</tr>
    			</tbody>
    		</Table>
        );
    }
}

function MainPage(props) {
    const comment = {
        date: new Date(),
        text: 'I hope you enjoy learning React!',
        author: {
            name: 'Hello Kitty',
            avatarUrl: 'http://placekitten.com/g/64/64'
        }
    };

    return (
        <Grid >
            <MainPageHeader name="Joost"/>
            <Jumbotron>
                <GetWachtItems />
            </Jumbotron>
            <Jumbotron>
                <TestRestJS />
            </Jumbotron>
            <Jumbotron >
                <TimeTicker/>
                <LoginControll/>
            </Jumbotron>
            <Jumbotron >
                <NameForm/>
                <Calculator/>
            </Jumbotron>
            <Jumbotron >
                <CollapsiblePannel/>
            </Jumbotron>
            <Jumbotron >
                <Comment date={comment.date} text={comment.text} author={comment.author}/>
            </Jumbotron>
        </Grid>
    );
}

// Render the APP itself
const app = <App name="Joost"/>;
ReactDOM.render(app, document.getElementById('root'));

// setInterval(app, 100);
