import React from 'react';
import { Button } from 'react-bootstrap';
import './BetaOverlay.css';

const BetaOverlay = () => {
    return (
        <div className='beta-banner'>
            <span className="beta-text px-2 p-1">🚀 Beta Access Available!</span>
            <Button
                className="beta-button"
                href="https://tally.so/r/w5lMRN"
                target="_blank"
                rel="noreferrer"
                size='sm'
            >

                Sign Up Now
            </Button>
        </div>
    );
};

export default BetaOverlay;