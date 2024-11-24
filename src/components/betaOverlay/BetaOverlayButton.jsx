import React from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';
import BetaOverlayPopOver from './BetaOverlayPopOver';

const BetaOverlayButton = ({ overlayPlacement = "bottom" }) => {
  return (
    <Button className="beta-button" size="sm">
      <OverlayTrigger
        trigger="click"
        placement={overlayPlacement}
        rootClose
        overlay={<BetaOverlayPopOver />}
      >
        <span>Get Early Access</span>
      </OverlayTrigger>
    </Button>
  );
};

export default BetaOverlayButton;
