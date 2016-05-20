var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;

var routes = (
    <Router history={hashHistory}>
        <Route path="/inbox" component={InboxContainer} />
        <Route path="/sky" component={Sky} />
    </Router>
);

var INBOX = {
    inbox: {
        0: {
            id: 0,
            from: "billg@microsoft.com",
            to: "TeamWoz@Woz.org",
            title: "Possible work opportunity",
            content: "Dear Woz.  Fancy a job at Mister Softee?  Bill x"
        },
        1: {
            id: 1,
            from: "zuck@facebook.com",
            to: "TeamWoz@Woz.org",
            title: "Do you know PHP?",
            content: "Dear Woz.  We are in need of a PHP expert.  Fast.  Zuck x"
        }
    },
    spam: {
        0: {
            id: 0,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        1: {
            id: 1,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};

var Sky = function(props) {
    return (
        <div className="sky"><p>This is a representation of the sky</p></div>
    );
};

var Main = function(props) {
    return (
        <div>
            <b>
                {props.title}
            </b>
        </div>
    )
};

var Spam = function(props){
    return (
        <div>
            <b>
                {props.title}
            </b>
        </div>
    )  
};

var MainInbox = function(props){
    console.log(props);
    var emails = Object.keys(props.inbox).map(function(emailId, index){
        var email = props.emails[emailId];
        return (
            <li key={index}>
                <Email id={email.id} from={email.from} to={email.to} title={email.title} content={email.content} />
            </li>
            )
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var SpamInbox = function(props){
    var spams = Object.keys(props.spam).map(function(spamId, index){
        var spam = props.spams[spamId];
        return (
            <li key={index}>
                <Spam id={spam.id} from={spam.from} to={spam.to} title={spam.title} content={spam.content} />
            </li>
            )
    });
    return (
        <ul>
            {spams}
        </ul>
    );
};

var InboxContainer = function(){
    return <MainInbox emails={INBOX.inbox} />;
};

// var InboxContainer = function(props){
//     console.log(props);
//     return (
//         <div><Inbox /></div>
//     )
// }
//
// var Inbox = function() {
//     return <div><p>"Hello"</p></div>
// }

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(routes, document.getElementById('app'));
});
