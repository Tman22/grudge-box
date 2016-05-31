const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./store-data');

class GrudgeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all()
    };
  }

  render() {
    return(
      <div className="grudgeBox">
        <section className="top-components">
          <header>
            <h1>{this.props.title}</h1>
          </header>
        </section>
        <section className='main-content'>
          <grudgeList ideas={this.state.grudges}/>
        </section>

      </div>
    );
  }
}


const GrudgeList = ({ grudges }) => {
  return (
    <div className="IdeasList">
      {grudges.map(idea => <singleGrudge {...grudge} key={grudge.id}/>)}
    </div>
  );
};


const singleGrudge = ({ id, title, body, active }) => {
  return (
    <div className='singleGrudge'>
      <h3 className='singleGrudge-title'>{title}</h3>
      <div className='singleGrudge-body'>{body}</div>
    </div>
  )
}
ReactDOM.render(<GrudgeBox title='Grudge Box' />, document.querySelector('appliaction'));
