import overtureLogo from '/omf_logo_transparent.png';

export default function OvertureWordmark() {
  return (
    <>
      <div className='wordmark'>
        <a href="https://overturemaps.org" target="_blank">
          <img
            src={overtureLogo}
            className="logo overture"
            alt="Overture Maps logo"
          />
        </a>
        <div>Overture Maps</div>
      </div>
    </>
  );
}
