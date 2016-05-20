var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var hashHistory = router.hashHistory;
var IndexRoute = router.IndexRoute;
var Link = router.Link;

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

var GoodEmail = function(props) {
    return (
        <div>
            <b>
                {props.title} · From: {props.from}
            </b>
        </div>
    )
};

var SpamEmail = function(props){
    return (
        <div>
            <b>
                {props.title} · From: {props.from}
            </b>
        </div>
    )
};

var MainInbox = function(props){
    console.log(props);
    var emails = Object.keys(props.emails).map(function(emailId, index){
        var email = props.emails[emailId];
        return (
            <li key={index}>
                <GoodEmail id={email.id} from={email.from} to={email.to} title={email.title} content={email.content} />
            </li>
            )
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var SpamInbox = function(props) {
    console.log('spamz', props);
    var spams = Object.keys(props.spams).map(function(spamId, index) {
        var spam = props.spams[spamId];
        return (
            <li key={index}>
              <SpamEmail id={spam.id} from={spam.from} to={spam.to} title={spam.title} content={spam.content} />
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
    return (
      <div>
        <MainInbox emails={INBOX.inbox} />
      </div>
    );
};

var SpamContainer = function(){
    return (
      <div>
        <SpamInbox spams={INBOX.spam} />
      </div>
    );
};

var App = function(props) {
    return (
        <div>
            <h1>
                Inbox App
            </h1>
            <nav>
                <li><Link to="/spam">Go to your spamz</Link></li>
                <li><Link to="/inbox">Go to your real email</Link></li>
            </nav>
            <div>
                {props.children}
            </div>
        </div>
    );
};

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={InboxContainer} />
            <Route path="inbox" component={InboxContainer}>
                 <Route path="email/:id" />
            </Route>
            <Route component={SpamContainer}>
                <Route path="spam/:id" />
            </Route>
            <Route path="spam" component={SpamContainer} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(routes, document.getElementById('app'));
});
