import React from 'react';
import { Button, OverlayTrigger, Popover} from 'react-bootstrap';
import './BetaOverlay.css';

const BetaOverlay = () => {
    const customPopover = {
        maxWidth: '500px', 
        width: '450px'      
    };

    return (
        <div className='beta-banner'>
            <span className="beta-text px-2 p-1">🚀 Join Our Beta Program!</span>

            <Button className="beta-button" size='sm'>
                <OverlayTrigger
                    trigger="click"
                    placement="bottom"
                    rootClose
                    overlay={
                        <Popover 
                            id="popover-basic" 
                            style={customPopover}
                            className="beta-popover"
                        >
                            <Popover.Header 
                                as="h3"
                                className='bg-primary'
                            >
                                Exclusive Beta Access
                            </Popover.Header>
                            <Popover.Body className="p-3">
                                <p className="fs-6">
                                    Be among the first to shape the future of our Esports Dashboard! 
                                    As a beta tester, you'll:
                                </p>
                                <ul className="mb-3 fs-6">
                                    <li>Get early access to cutting-edge features</li>
                                    <li>Directly influence the dashboard's development</li>
                                    <li>Earn the Founders Role in the Support Discord</li>
                                    <li>Receive priority support and updates</li>
                                </ul>
                                <p className="mb-3 fs-6">
                                    Your feedback will be invaluable in creating the ultimate esports experience.
                                </p>
                                <Button
                                    href="https://tally.so/r/w5lMRN"
                                    target="_blank"
                                    rel="noreferrer"
                                    size='md'
                                    className="w-100"
                                >
                                    Signup for Beta Access
                                </Button>
                            </Popover.Body>
                        </Popover>
                    }
                >
                    <span>Get Early Access</span>
                </OverlayTrigger>
            </Button>
        </div>
    );
};

export default BetaOverlay;