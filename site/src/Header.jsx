import DownloadButton from './DownloadButton';
import OvertureWordmark from './OvertureWordmark';

export default function Header() {
  return (
    <>
      <div className="header">
       <OvertureWordmark></OvertureWordmark>
        <DownloadButton></DownloadButton>
      </div>
    </>
  );
}
