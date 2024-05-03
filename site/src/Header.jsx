import DownloadButton from './DownloadButton';
import OvertureWordmark from './OvertureWordmark';
import DarkModeToggle from './DarkModeToggle';
import PropTypes from 'prop-types';

export default function Header({ mode, setMode }) {
  return (
    <>
      <div className={`header ${mode}` }>
       <OvertureWordmark></OvertureWordmark>
       <DarkModeToggle mode={mode} setMode={setMode}></DarkModeToggle>
        <DownloadButton></DownloadButton>
      </div>
    </>
  );
}

Header.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired
}