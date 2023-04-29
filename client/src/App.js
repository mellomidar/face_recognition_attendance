import './App.css';
import myImage from './assets/icons/bisu-logo.png'
import Webcam from './components/Camera';
import Container from './components/Container';
import DateTime from './components/DateTime';
import AttendanceData from './components/AttendanceData';

function App() {

  return (
    <div className='App padding-half-rem flexed'>
      <Container className='cstm-border main-bg-clr main-wrapper'>
        <Container className='logo-org-wrapper height-20 flexed'>
          <img src={myImage} alt='bisu logo' className='company-logo'/>
          <h1 className='ft-15 comp-name'>Bohol Island State University</h1>
        </Container>
        <Container className='cam-feed-wrapper height-70 flexed'>
          <AttendanceData duration={3000}/>
          <DateTime/>
          <Webcam className='cam-feed'></Webcam>
        </Container>
        <Container className='status-wrapper flexed height-10'>
          <label className='flexed ft-12'>
            Detected : 
            <input className='ft-12' type='text' defaultValue={0}/>
          </label>
          <label className='flexed ft-12'>
            Recognized : 
            <input className='ft-12' type='text' defaultValue={0}/>
          </label>
        </Container>
      </Container>
    </div>
  );
}


export default App;
