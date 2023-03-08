const TrashSvg = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={24}
      xmlSpace="preserve"
      {...props}
    >
      <g
        style={{
          stroke: "none",
          strokeWidth: 0,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "none",
          fillRule: "nonzero",
          opacity: 1,
        }}
      >
        <path
          d="M21.679 8.113H19.048v-.235a.976.976 0 0 0-.939-.976H9.213a.976.976 0 0 0-.976.976v.235H3.621a.976.976 0 0 0-.976.976v3.835a.976.976 0 0 0 .976.976h22.058a.976.976 0 0 0 .976-.976V9.089a.976.976 0 0 0-.976-.976zM20.68 15.178H3.32a.976.976 0 0 0-.976.976v10.063a.976.976 0 0 0 .976.976h16.36a.976.976 0 0 0 .976-.976V16.154a.976.976 0 0 0-.976-.976zM9.424 14.353a.976.976 0 0 1-.976.976H6.677a.976.976 0 0 1-.976-.976V10.482a.976.976 0 0 1 .976-.976h1.771a.976.976 0 0 1 .976.976v3.871zm4.998 0a.976.976 0 0 1-.976.976h-1.77a.976.976 0 0 1-.976-.976V10.482a.976.976 0 0 1 .976-.976h1.77a.976.976 0 0 1 .976.976v3.871zm5.001 0a.976.976 0 0 1-.976.976h-1.771a.976.976 0 0 1-.976-.976V10.482a.976.976 0 0 1 .976-.976h1.771a.976.976 0 0 1 .976.976v3.871z"
          style={{
            stroke: "none",
            strokeWidth: 1,
            strokeDasharray: "none",
            strokeLinecap: "butt",
            strokeLinejoin: "miter",
            strokeMiterlimit: 10,
            fill: "#000",
            fillRule: "nonzero",
            opacity: 1,
          }}
          transform="matrix(0.095 0 0 0.095 0.048 0.048)"
        />
      </g>
    </svg>
  );

export default TrashSvg;