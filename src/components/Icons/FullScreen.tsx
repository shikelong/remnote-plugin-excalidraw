import React from 'react';

const FullScreen = ({ width = 24, height = 24, fill = 'currentColor' }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
    >
      <path d="M972.8 998.4h-256a25.6 25.6 0 1 1 0-51.2h230.4v-230.4a25.6 25.6 0 1 1 51.2 0v256a25.6 25.6 0 0 1-25.6 25.6zM307.2 998.4h-256a25.6 25.6 0 0 1-25.6-25.6v-256a25.6 25.6 0 1 1 51.2 0v230.4h230.4a25.6 25.6 0 1 1 0 51.2zM972.8 332.8a25.6 25.6 0 0 1-25.6-25.6V76.8h-230.4a25.6 25.6 0 1 1 0-51.2h256a25.6 25.6 0 0 1 25.6 25.6v256a25.6 25.6 0 0 1-25.6 25.6zM51.2 332.8a25.6 25.6 0 0 1-25.6-25.6v-256A25.6 25.6 0 0 1 51.2 25.6h256a25.6 25.6 0 1 1 0 51.2H76.8v230.4a25.6 25.6 0 0 1-25.6 25.6z" />
      <path d="M283.392 308.992a25.6 25.6 0 0 1-18.112-7.488L33.088 69.312a25.6 25.6 0 0 1 36.224-36.224l232.192 232.192a25.6 25.6 0 0 1-18.112 43.712zM740.608 308.992a25.6 25.6 0 0 1-18.112-43.712L954.688 33.088a25.6 25.6 0 0 1 36.224 36.224l-232.192 232.192a25.472 25.472 0 0 1-18.112 7.488zM972.8 998.4a25.6 25.6 0 0 1-18.112-7.488l-232.192-232.192a25.6 25.6 0 0 1 36.224-36.224l232.192 232.192a25.6 25.6 0 0 1-18.112 43.712zM51.2 998.4a25.6 25.6 0 0 1-18.112-43.712l232.192-232.192a25.6 25.6 0 0 1 36.224 36.224l-232.192 232.192A25.472 25.472 0 0 1 51.2 998.4z" />
    </svg>
  );
};

export default FullScreen;
