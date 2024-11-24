import React, { forwardRef } from 'react';
import { Popover, Button } from 'react-bootstrap';
import { ThemeContext } from '../../context/ThemeContext';

const BetaOverlayPopOver = forwardRef((props, ref) => {
  const { isDarkMode } = React.useContext(ThemeContext);
  return (
    <Popover 
      id="popover-basic" 
      ref={ref} 
      {...props} 
      style={{
        maxWidth: '500px', 
        ...props.style,
      }}
    >
      {/* <Popover.Header as="h3" className="bg-primary"> */}
      <Popover.Header className={`${isDarkMode ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
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
          size="md"
          className="w-100"
        >
          Signup for Beta Access
        </Button>
      </Popover.Body>
    </Popover>
  );
});

export default BetaOverlayPopOver;
