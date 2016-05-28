const React = require('react');
const ReactDOM = require('react-dom');

class GrudgeBox extends React.Component {

  render() {
    return(
      <div className="GrudgeBox">
        <section className="top-components">
          <header>
          <h1>{this.props.title}</h1>
          </header>
        </section>
        <section className='main-content'>
        </section>

      </div>
    )
  }
}


ReactDOM.render(<GrudgeBox title='Grudge Box' />, document.querySelector('appliaction'));
