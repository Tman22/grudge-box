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

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges })
    })
  }

  render() {
    return(
      <div className="grudgeBox">
        <section className="top-components">
          <header>
            <h1>{this.props.title}</h1>
            <CreateGrudge/>
            <GrudgeList grudges={this.state.grudges}/>
          </header>
        </section>
        <section className='main-content'>
        </section>

      </div>
    );
  }
}


class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      body: '',
      status: 'Kill??'
    };
  }

  updateProperties(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState({ title: '', body: '' })
  }

  render() {
    return (
      <div className='createGrudge'>
        <input className='createGrudge-title'
          name='title'
          placeholder='Title'
          value={this.state.title}
          onChange={(e) => this.updateProperties(e)}
        />

        <textarea className='createGrudge-body'
                  name='body'
                  placeholder='Body'
                  value={this.state.body}
                  onChange={(e) => this.updateProperties(e)}
        />

        <input className='createGrudge-submit'
               type='submit'
               onClick={(e) => this.createGrudge(e)}
        />

      </div>
    )
  }
}

const GrudgeList = ({ grudges }) => {
  return (
    <div className="IdeasList">
      <div>Total: {grudges.length}</div>
      <div>Status Kill ;)??: {store.statusKill(grudges).length}</div>
      <div>Status SAVE: {store.statusSave(grudges).length}</div>
      {grudges.map(grudge => <SingleGrudge {...grudge} key={grudge.id}/>)}
    </div>
  );
}


const SingleGrudge = ({ id, title, body, status }) => {
  return (
    <div className='singleGrudge'>
      <h3 className='singleGrudge-title'>{title}</h3>
      <div className='singleGrudge-body'>{body}</div>
      <div className='singleGrudge-status'>Status: {status}</div>
      <button onClick = {() => store.destroy(id)}>Delete</button>
      <button onClick = {() => store.update(id, status)}>Change Status</button>
    </div>
  )
}

ReactDOM.render(<GrudgeBox title="Grudge Box" />, document.querySelector('.application'));
