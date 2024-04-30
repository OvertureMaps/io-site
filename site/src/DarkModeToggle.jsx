import { setTheme } from './themeUtils';
import PropTypes from 'prop-types';

export default function DarkModeToggle({ mode, setMode }) {

    const toggleDarkMode = () => {

        if (mode === 'theme-dark') {
            setTheme('theme-light', setMode);
        } else {
            setTheme('theme-dark', setMode);
        }
    };

    return (
        <div>
            <button id="toggle" className="toggle--checkbox" onClick={toggleDarkMode} readOnly>
                <img src={mode === 'theme-light' ? '/lightmode.svg' : '/darkmode.svg'} />
            </button>
        </div>
    );
}

DarkModeToggle.propTypes = {
    mode: PropTypes.string.isRequired,
    setMode: PropTypes.func.isRequired
}