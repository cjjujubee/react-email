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

var EmailView = function(props) {
    console.log('hi', props);
    return (
        <section>
            <div>{props.to}</div>
            <div>{props.from}</div>
            <div>{props.title}</div>
            <div>{props.content}</div>
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
    console.log(props);
    var emails = Object.keys(props.emails).map(function(emailId, index){
        var email = props.emails[emailId];
        return (
            <li key={index}>
                <EmailHeader id={email.id} from={email.from} to={email.to} title={email.title} content={email.content} />
            </li>
            )
    });
    return (
        <ul>
            {emails}
        </ul>
    );
};

var InboxContainer = function(props) {
    var folder = props.params.folder;
    console.log(folder);
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
            <Route path=":folder" component={MainInbox}>
              <Route path="/email/:id" component={EmailView} />
            </Route>
        </Route>
    </Router>
);

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(routes, document.getElementById('app'));
});
