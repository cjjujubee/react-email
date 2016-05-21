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
        2: {
            id: 2,
            from: "ChEaPFl1ghTZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "WaNt CHEEp FlitZ",
            content: "Theyre CheEp"
        },
        3: {
            id: 3,
            from: "NiKEAIRJordanZ@hotmail.com",
            to: "TeamWoz@Woz.org",
            title: "JorDanz For SAle",
            content: "Theyre REELY CheEp"
        }
    }
};

var EmailView = function(props) {
    var email = INBOX.inbox[props.params.emailId] || INBOX.spam[props.params.emailId];
    console.log(email);
    return (
        <section>
            <div>To: {email.to}</div>
            <div>From: {email.from}</div>
            <div>Subject: {email.title}</div>
            <div>
              <p>{email.content}</p>
            </div>
        </section>
    );
};

var EmailHeader = function(props) {
    return (
      <div>
          <div>
            <b>
              <Link to={'/email/' + props.id}>
                {props.title}
              </Link>
            </b>
            &nbsp;
            · From: {props.from}
          </div>
      </div>
    );
};

var MainInbox = function(props){
    var emails = Object.keys(props.emails).map(function(emailId, index){
        var email = props.emails[emailId];
        return (
            <li key={index}>
                <EmailHeader id={email.id} from={email.from} to={email.to} title={email.title} content={email.content} />
            </li>
        );
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var InboxContainer = function(props) {
    var folder = props.params.folder;
    return (
      <div>
        <MainInbox emails={INBOX[folder]} />
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
            <Route path=":folder" component={InboxContainer} />
            <Route path="email/:emailId" component={EmailView} />
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(routes, document.getElementById('app'));
});
