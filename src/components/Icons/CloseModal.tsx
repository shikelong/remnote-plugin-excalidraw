import React from 'react';

const CloseModal = ({ width = 24, height = 24, fill = 'currentColor' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path d="M111.16032 912.8704a25.44128 25.44128 0 0 0 18.03776 7.4496 25.5232 25.5232 0 0 0 18.06848-7.48032L512 547.68128l364.72832 365.1584a25.3696 25.3696 0 0 0 18.06848 7.48032 25.51808 25.51808 0 0 0 18.06848-43.54048L548.49024 512l364.34944-364.75392a25.5232 25.5232 0 0 0-0.0256-36.08576 25.46688 25.46688 0 0 0-36.08576 0.0256L511.9744 476.34944 147.24608 111.18592a25.51296 25.51296 0 1 0-36.11136 36.06016L475.45344 512l-364.31872 364.77952a25.51808 25.51808 0 0 0 0.0256 36.09088z" />
    </svg>
  );
};

export default CloseModal;