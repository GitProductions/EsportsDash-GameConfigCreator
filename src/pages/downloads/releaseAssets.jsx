import React, { useState } from "react";
import { Button, OverlayTrigger, Popover, Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
// import BetaOverlayButton from '../../components/betaOverlay/BetaOverlayButton';
import BetaOverlayPopOver from "../../components/betaOverlay/BetaOverlayPopOver";

const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

const ReleaseAssets = ({ release }) => {
  const [activePopover, setActivePopover] = useState(null); // Track active popover

  const handlePopoverToggle = (assetId) => {
    setActivePopover((prev) => (prev === assetId ? null : assetId)); // Toggle specific popover
  };

  return (
    <div className="d-flex flex-wrap gap-2">
      {release.assets.map((asset) => (
        <OverlayTrigger
          key={asset.id}
          trigger="click"
          placement="auto"
          rootClose
          show={activePopover === asset.id} // Show only the active popover
          onToggle={() => handlePopoverToggle(asset.id)} // Toggle popover state
          overlay={<BetaOverlayPopOver />}
        >
          <Button
            disabled
            // href={asset.browser_download_url}
            variant="outline-primary"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
            className="d-flex align-items-center"
          >
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            <span className="me-2">{asset.name}</span>
            <Badge bg="light" text="dark">
              {formatFileSize(asset.size)}
            </Badge>
          </Button>
        </OverlayTrigger>
      ))}
    </div>
  );
};

export default ReleaseAssets;
